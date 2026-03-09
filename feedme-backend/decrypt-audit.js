#!/usr/bin/env node
/**
 * Script de déchiffrement du journal d'audit IP — USAGE RESTREINT
 *
 * Ce script ne doit être utilisé QUE dans le cadre d'une réquisition judiciaire.
 * Il nécessite la clé privée RSA (feedme_private.pem) qui doit être stockée
 * hors ligne (coffre-fort, clé USB sécurisée).
 *
 * Usage :
 *   node decrypt-audit.js <chemin_cle_privee> <fichier_audit_json>
 *
 * Exemple :
 *   # 1. Exporter le log depuis Redis (via Upstash console ou CLI)
 *   # 2. Sauvegarder dans un fichier JSON
 *   # 3. Déchiffrer :
 *   node decrypt-audit.js /chemin/vers/feedme_private.pem audit_export.json
 */

import { readFileSync } from "fs";
import crypto from "crypto";

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("Usage: node decrypt-audit.js <cle_privee.pem> <audit.json>");
  console.error("");
  console.error("  cle_privee.pem  — Clé privée RSA (stockée hors ligne)");
  console.error("  audit.json      — Export du log d'audit depuis Redis (clé feedme:ip_audit_log)");
  process.exit(1);
}

const [keyPath, auditPath] = args;

let privateKey;
try {
  privateKey = readFileSync(keyPath, "utf-8");
} catch (e) {
  console.error(`Impossible de lire la clé privée : ${keyPath}`);
  process.exit(1);
}

let auditData;
try {
  auditData = JSON.parse(readFileSync(auditPath, "utf-8"));
} catch (e) {
  console.error(`Impossible de lire le fichier d'audit : ${auditPath}`);
  process.exit(1);
}

if (!Array.isArray(auditData)) {
  console.error("Le fichier d'audit doit contenir un tableau JSON.");
  process.exit(1);
}

console.log(`\n=== DÉCHIFFREMENT AUDIT FEEDME ===`);
console.log(`Entrées : ${auditData.length}`);
console.log(`Date : ${new Date().toISOString()}`);
console.log(`${"=".repeat(50)}\n`);

let decrypted = 0;
let errors = 0;

for (const entry of auditData) {
  try {
    const buffer = Buffer.from(entry.encrypted, "base64");
    const plain = crypto.privateDecrypt(
      { key: privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: "sha256" },
      buffer
    );
    const data = JSON.parse(plain.toString("utf-8"));
    console.log(`[${data.timestamp}] ${data.action} | IP: ${data.ip} | Meal: ${data.mealId}`);
    decrypted++;
  } catch (e) {
    console.error(`[${entry.timestamp}] ERREUR de déchiffrement — ${e.message}`);
    errors++;
  }
}

console.log(`\n${"=".repeat(50)}`);
console.log(`Déchiffrés : ${decrypted} | Erreurs : ${errors}`);
console.log(`\nCe document est confidentiel. Ne le diffusez pas.`);
