import express from "express";
import cors from "cors";
import crypto from "crypto";
import { Redis } from "@upstash/redis";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = process.env.PORT || 3000;

// --- Chiffrement asymétrique des IP (LCEN) ---
const IP_AUDIT_KEY = "feedme:ip_audit_log";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
let publicKey = null;

if (process.env.FEEDME_PUBLIC_KEY) {
  publicKey = process.env.FEEDME_PUBLIC_KEY.replace(/\\n/g, "\n");
  console.log("Clé publique chargée — journalisation LCEN active");
} else {
  console.log("FEEDME_PUBLIC_KEY non configurée — journalisation LCEN inactive");
}

function getClientIp(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
}

function encryptForAudit(plaintext) {
  if (!publicKey) return null;
  try {
    const buffer = Buffer.from(plaintext, "utf-8");
    const encrypted = crypto.publicEncrypt(
      { key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: "sha256" },
      buffer
    );
    return encrypted.toString("base64");
  } catch (error) {
    console.error("Erreur chiffrement IP:", error.message);
    return null;
  }
}

async function logIpForAudit(req, action, mealId) {
  if (!redis || !publicKey) return;
  try {
    const ip = getClientIp(req);
    const timestamp = new Date().toISOString();
    const payload = JSON.stringify({ ip, timestamp, action, mealId });
    const encrypted = encryptForAudit(payload);
    if (!encrypted) return;

    const logs = (await redis.get(IP_AUDIT_KEY)) || [];
    logs.push({ encrypted, timestamp, action });

    // Purger les entrées de plus d'un an (obligation LCEN = 1 an)
    const cutoff = Date.now() - ONE_YEAR_MS;
    const filtered = logs.filter((l) => new Date(l.timestamp).getTime() > cutoff);

    await redis.set(IP_AUDIT_KEY, filtered);
  } catch (error) {
    console.error("Erreur log IP audit:", error.message);
  }
}

// --- Redis ---
let redis = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  console.log("Redis connecté (Upstash)");
} else {
  console.log("Redis non configuré - les données ne seront pas persistées");
}

app.use(express.json());

// --- CORS restreint à la prod + localhost en dev ---
const ALLOWED_ORIGINS = [
  "https://feedme.theoffnote.pro",
  "https://feed-connect-kappa.vercel.app",
];
if (process.env.NODE_ENV !== "production") {
  ALLOWED_ORIGINS.push("http://localhost:8080", "http://localhost:5173", "http://localhost:3000");
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// --- Rate limiting ---
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de requêtes. Réessayez dans un instant." },
});

const createMealLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Vous créez trop de repas. Attendez un moment." },
});

app.use(generalLimiter);

// --- Stockage des repas (en mémoire + Redis pour la persistance) ---
let meals = [];

const MEALS_KEY = "feedme:active_meals";
const LOGS_KEY = "feedme:anonymous_logs";
const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;

// Charger les repas depuis Redis au démarrage
async function loadMealsFromRedis() {
  if (!redis) return;
  try {
    const stored = await redis.get(MEALS_KEY);
    if (Array.isArray(stored)) {
      const now = Date.now();
      meals = stored.filter(
        (m) => now - new Date(m.createdAt).getTime() <= FOUR_HOURS_MS
      );
      console.log(`${meals.length} repas chargés depuis Redis`);
    }
  } catch (error) {
    console.error("Erreur chargement repas Redis:", error);
  }
}

async function saveMealsToRedis() {
  if (!redis) return;
  try {
    await redis.set(MEALS_KEY, meals);
  } catch (error) {
    console.error("Erreur sauvegarde repas Redis:", error);
  }
}

// Nettoyage périodique des repas expirés (toutes les 10 min)
function cleanupExpiredMeals() {
  const now = Date.now();
  const before = meals.length;
  meals = meals.filter(
    (m) => now - new Date(m.createdAt).getTime() <= FOUR_HOURS_MS
  );
  const removed = before - meals.length;
  if (removed > 0) {
    console.log(`Nettoyage: ${removed} repas expirés supprimés`);
    saveMealsToRedis();
  }
}

setInterval(cleanupExpiredMeals, 10 * 60 * 1000);

// --- Fonctions utilitaires pour les logs anonymes ---
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

// --- Routes ---

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "feedme-backend",
    redis: redis ? "connected" : "not configured",
    activeMeals: meals.length,
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/meals", createMealLimiter, async (req, res) => {
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
    portions: Math.min(Math.max(Math.round(Number(portions)), 1), 20),
    latitude: Number(latitude),
    longitude: Number(longitude),
    createdAt: new Date().toISOString(),
  };

  meals.push(meal);
  await saveMealsToRedis();

  await addAnonymousLog({
    timestamp: meal.createdAt,
    temperature: meal.temperature,
    portions: meal.portions,
    claimed: false,
  });

  await logIpForAudit(req, "create_meal", meal.id);

  res.status(201).json(meal);
});

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
  await saveMealsToRedis();

  await markLogAsClaimed(meal.createdAt);
  await logIpForAudit(req, "claim_meal", meal.id);

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
      return ageMs <= FOUR_HOURS_MS;
    })
    .map((meal) => {
      const km = haversineDistanceKm(latitude, longitude, meal.latitude, meal.longitude);
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

// --- Graceful shutdown ---
function shutdown(signal) {
  console.log(`${signal} reçu. Sauvegarde des repas...`);
  saveMealsToRedis().then(() => {
    console.log("Repas sauvegardés. Arrêt du serveur.");
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// --- Démarrage ---
loadMealsFromRedis().then(() => {
  app.listen(PORT, () => {
    console.log(`FeedMe backend listening on port ${PORT}`);
  });
});
