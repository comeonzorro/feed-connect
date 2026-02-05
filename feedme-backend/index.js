import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*", // pour aller vite pour le MVP; à restreindre plus tard
  })
);

// Stockage en mémoire pour le MVP (disparaît à chaque redémarrage)
const meals = [];

function haversineDistanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371; // rayon de la Terre en km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatDistanceLabel(km) {
  if (km < 1) {
    const meters = Math.round(km * 1000);
    return `${meters}m`;
  }
  return `${km.toFixed(1)}km`;
}

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "feedme-backend-mvp",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/meals", (req, res) => {
  const { description, temperature, portions, latitude, longitude } = req.body || {};

  if (
    !description ||
    (temperature !== "hot" && temperature !== "cold") ||
    !Number.isFinite(portions) ||
    portions <= 0 ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return res.status(400).json({
      error:
        "Champs requis: description (string), temperature ('hot'|'cold'), portions (number > 0), latitude (number), longitude (number).",
    });
  }

  const meal = {
    id: crypto.randomUUID(),
    description: String(description).slice(0, 150),
    temperature,
    portions: Number(portions),
    latitude: Number(latitude),
    longitude: Number(longitude),
    createdAt: new Date().toISOString(),
  };

  meals.push(meal);

  res.status(201).json(meal);
});

// Marquer un repas comme récupéré (le supprime de la liste)
app.delete("/api/meals/:id", (req, res) => {
  const { id } = req.params;
  
  const index = meals.findIndex((meal) => meal.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      error: "Repas non trouvé ou déjà récupéré.",
    });
  }
  
  meals.splice(index, 1);
  
  res.json({
    success: true,
    message: "Repas marqué comme récupéré. Merci !",
  });
});

app.get("/api/meals/nearby", (req, res) => {
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);
  const radiusKm = req.query.radiusKm ? Number(req.query.radiusKm) : 2; // 2 km par défaut

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    !Number.isFinite(radiusKm) ||
    radiusKm <= 0
  ) {
    return res.status(400).json({
      error:
        "Paramètres requis: latitude (number), longitude (number), radiusKm (number > 0, optionnel).",
    });
  }

  const now = Date.now();

  const results = meals
    // optionnel: filtrer les repas trop anciens, ex: > 4h
    .filter((meal) => {
      const ageMs = now - new Date(meal.createdAt).getTime();
      const fourHoursMs = 4 * 60 * 60 * 1000;
      return ageMs <= fourHoursMs;
    })
    .map((meal) => {
      const km = haversineDistanceKm(
        latitude,
        longitude,
        meal.latitude,
        meal.longitude
      );
      return {
        ...meal,
        distanceKm: km,
        distanceLabel: formatDistanceLabel(km),
      };
    })
    .filter((meal) => meal.distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`FeedMe backend MVP listening on port ${PORT}`);
});

