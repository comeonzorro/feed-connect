# FeedMe - Infrastructure & Dépendances

## Services Tiers

| Service | Usage | Plan | URL |
|---------|-------|------|-----|
| **Vercel** | Hébergement frontend | Free | https://vercel.com |
| **Render** | Hébergement backend | Free | https://render.com |
| **Upstash** | Base de données Redis (stats) | Free (10k req/jour) | https://upstash.com |
| **GitHub** | Code source & CI/CD | Free | https://github.com |
| **CARTO** | Tuiles cartographiques | Free | https://carto.com |
| **OpenStreetMap** | Données cartographiques | Free | https://openstreetmap.org |
| **Google Fonts** | Polices (Outfit, DM Sans) | Free | https://fonts.google.com |

---

## URLs de Production

| Composant | URL |
|-----------|-----|
| Frontend | https://feed-connect-kappa.vercel.app |
| Backend API | *(ton URL Render)* |
| Redis Console | https://console.upstash.com |
| GitHub Repo | https://github.com/comeonzorro/feed-connect |

---

## Variables d'Environnement

### Frontend (Vercel)

```env
VITE_API_URL=https://ton-backend.onrender.com
```

### Backend (Render)

```env
PORT=3000
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

---

## Dépendances Frontend

### Framework & Core
- **React** 18.3 - Librairie UI
- **Vite** 5.4 - Bundler & dev server
- **TypeScript** 5.8 - Typage statique
- **React Router** 6.30 - Routing SPA

### UI & Styling
- **Tailwind CSS** 3.4 - Framework CSS utilitaire
- **shadcn/ui** - Composants UI (basés sur Radix)
- **Radix UI** - Primitives accessibles
- **Lucide React** - Icônes
- **Framer Motion** 12.27 - Animations (utilisé minimalement)

### Cartographie
- **Leaflet** 1.9 - Librairie de cartes
- **React-Leaflet** 4.2 - Binding React pour Leaflet

### Utilitaires
- **TanStack Query** 5.83 - Gestion état serveur
- **React Hook Form** 7.61 - Formulaires
- **Zod** 3.25 - Validation de schémas
- **date-fns** 3.6 - Manipulation de dates
- **clsx** / **tailwind-merge** - Gestion des classes CSS

### Dev Tools
- **ESLint** 9.32 - Linting
- **Vitest** 3.2 - Tests unitaires
- **PostCSS** / **Autoprefixer** - Processing CSS

---

## Dépendances Backend

- **Express** 4.21 - Framework HTTP
- **CORS** 2.8 - Gestion des origines croisées
- **@upstash/redis** 1.34 - Client Redis serverless

---

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│     Vercel      │────▶│     Render      │────▶│    Upstash      │
│   (Frontend)    │     │   (Backend)     │     │    (Redis)      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│   CARTO Tiles   │     │  OpenStreetMap  │
│  (Cartographie) │     │    (Données)    │
└─────────────────┘     └─────────────────┘
```

---

## Limites des Plans Gratuits

| Service | Limite |
|---------|--------|
| Vercel | 100GB bandwidth/mois, builds illimités |
| Render | Spin down après 15min inactivité, 750h/mois |
| Upstash | 10 000 requêtes/jour, 256MB storage |

---

## Données Stockées

### En mémoire (Render - temporaire)
- Repas actifs (expiration 4h, perdus au redémarrage)

### Redis (Upstash - persistant)
- Logs anonymes : `{ timestamp, temperature, portions, claimed }`
- **Aucune donnée personnelle** : pas de localisation, pas de description

---

## Contacts & Comptes

| Service | Compte associé |
|---------|----------------|
| GitHub | comeonzorro |
| Vercel | *(ton compte)* |
| Render | *(ton compte)* |
| Upstash | *(ton compte)* |

---

## Commandes Utiles

```bash
# Développement local
cd feed-connect-main
npm run dev              # Frontend sur :8080
cd feedme-backend && npm start  # Backend sur :3000

# Build & Test
npm run build            # Build production
npm run lint             # Vérification code
npm run test             # Tests unitaires

# Vérifier l'état des services
curl https://ton-backend.onrender.com/health
curl https://ton-backend.onrender.com/api/stats
```

---

*Dernière mise à jour : Février 2026*
