import express from "express";
import cors from "cors";
import { Redis } from "@upstash/redis";

const app = express();
const PORT = process.env.PORT || 3000;

// Initialiser Redis si les variables d'environnement sont présentes
let redis = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  console.log("Redis connecté (Upstash)");
} else {
  console.log("Redis non configuré - les stats ne seront pas persistées");
}

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Stockage en mémoire pour les repas actifs (temporaire, max 4h)
const meals = [];

// Clé Redis pour les logs anonymes
const LOGS_KEY = "feedme:anonymous_logs";

// Fonctions utilitaires pour Redis
async function getAnonymousLogs() {
  if (!redis) return [];
  try {
    const logs = await redis.get(LOGS_KEY);
    return logs || [];
  } catch (error) {
    console.error("Erreur Redis (get):", error);
    return [];
  }
}

async function saveAnonymousLogs(logs) {
  if (!redis) return;
  try {
    await redis.set(LOGS_KEY, logs);
  } catch (error) {
    console.error("Erreur Redis (set):", error);
  }
}

async function addAnonymousLog(log) {
  if (!redis) return;
  try {
    const logs = await getAnonymousLogs();
    logs.push(log);
    await saveAnonymousLogs(logs);
  } catch (error) {
    console.error("Erreur Redis (add):", error);
  }
}

async function markLogAsClaimed(timestamp) {
  if (!redis) return;
  try {
    const logs = await getAnonymousLogs();
    const logEntry = logs.find((log) => log.timestamp === timestamp && !log.claimed);
    if (logEntry) {
      logEntry.claimed = true;
      logEntry.claimedAt = new Date().toISOString();
      await saveAnonymousLogs(logs);
    }
  } catch (error) {
    console.error("Erreur Redis (claim):", error);
  }
}

function haversineDistanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;

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
    redis: redis ? "connected" : "not configured",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/meals", async (req, res) => {
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

  // Log anonyme persisté dans Redis (sans localisation ni description)
  await addAnonymousLog({
    timestamp: meal.createdAt,
    temperature: meal.temperature,
    portions: meal.portions,
    claimed: false,
  });

  res.status(201).json(meal);
});

// Marquer un repas comme récupéré
app.delete("/api/meals/:id", async (req, res) => {
  const { id } = req.params;

  const index = meals.findIndex((meal) => meal.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Repas non trouvé ou déjà récupéré.",
    });
  }

  const meal = meals[index];
  meals.splice(index, 1);

  // Marquer comme récupéré dans Redis
  await markLogAsClaimed(meal.createdAt);

  res.json({
    success: true,
    message: "Repas marqué comme récupéré. Merci !",
  });
});

app.get("/api/meals/nearby", (req, res) => {
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);
  const radiusKm = req.query.radiusKm ? Number(req.query.radiusKm) : 2;

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

// Statistiques anonymes (persistées)
app.get("/api/stats", async (req, res) => {
  const logs = await getAnonymousLogs();
  
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay() + 1);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const filterByDate = (startDate) => {
    return logs.filter((log) => new Date(log.timestamp) >= startDate);
  };

  const computeStats = (filteredLogs) => {
    const shared = filteredLogs.length;
    const claimed = filteredLogs.filter((l) => l.claimed).length;
    const portions = filteredLogs.reduce((sum, l) => sum + l.portions, 0);
    const hot = filteredLogs.filter((l) => l.temperature === "hot").length;
    const cold = filteredLogs.filter((l) => l.temperature === "cold").length;
    return { shared, claimed, portions, hot, cold };
  };

  res.json({
    today: computeStats(filterByDate(startOfDay)),
    week: computeStats(filterByDate(startOfWeek)),
    month: computeStats(filterByDate(startOfMonth)),
    year: computeStats(filterByDate(startOfYear)),
    total: computeStats(logs),
  });
});

app.listen(PORT, () => {
  console.log(`FeedMe backend MVP listening on port ${PORT}`);
});
