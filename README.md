# FeedMe

Application web permettant de connecter les personnes ayant des repas en trop avec celles qui en ont besoin. 100% anonyme et gratuit.

## Technologies

- **Frontend**: Vite + React + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express
- **Cartographie**: Leaflet + React-Leaflet

## Installation

### Prérequis

- Node.js 18+ (recommandé: utiliser [nvm](https://github.com/nvm-sh/nvm))
- npm ou bun

### 1. Cloner le projet

```bash
git clone <URL_DU_REPO>
cd feed-connect-main
```

### 2. Configurer les variables d'environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Le fichier .env contient par défaut:
# VITE_API_URL=http://localhost:3000
```

### 3. Installer et lancer le backend

```bash
cd feedme-backend
npm install
npm start
```

Le backend sera accessible sur `http://localhost:3000`.

### 4. Installer et lancer le frontend

Dans un nouveau terminal :

```bash
# Depuis la racine du projet (feed-connect-main)
npm install
npm run dev
```

Le frontend sera accessible sur `http://localhost:8080`.

## API Backend

### Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/health` | Vérifie que le service est en ligne |
| POST | `/api/meals` | Créer un nouveau repas à partager |
| GET | `/api/meals/nearby` | Récupérer les repas à proximité |

### Créer un repas

```bash
curl -X POST http://localhost:3000/api/meals \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Pâtes carbonara",
    "temperature": "hot",
    "portions": 2,
    "latitude": 48.8566,
    "longitude": 2.3522
  }'
```

### Rechercher des repas à proximité

```bash
curl "http://localhost:3000/api/meals/nearby?latitude=48.8566&longitude=2.3522&radiusKm=2"
```

## Scripts disponibles

### Frontend

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Construire pour la production
- `npm run preview` - Prévisualiser le build de production
- `npm run lint` - Vérifier le code avec ESLint
- `npm run test` - Lancer les tests

### Backend

- `npm start` - Lancer le serveur

## Structure du projet

```
feed-connect-main/
├── feedme-backend/          # Backend Express
│   ├── index.js             # Point d'entrée du serveur
│   └── package.json
├── src/                     # Frontend React
│   ├── components/          # Composants React
│   ├── hooks/               # Hooks personnalisés
│   ├── pages/               # Pages de l'application
│   ├── services/            # Services API
│   └── types/               # Types TypeScript
├── .env.example             # Variables d'environnement (exemple)
└── package.json
```

## Déploiement

### Variables d'environnement requises

- `VITE_API_URL` : URL du backend (ex: `https://api.feedme.example.com`)

### Backend

Le backend peut être déployé sur n'importe quel service supportant Node.js (Railway, Render, Fly.io, etc.).

Variable d'environnement optionnelle :
- `PORT` : Port d'écoute (défaut: 3000)

### Frontend

Le frontend peut être déployé sur Vercel, Netlify, ou tout autre service de hosting statique.

## Auteur

Développé par [Léo Le Coguic](https://leolecoguic.fr)

## Licence

MIT
