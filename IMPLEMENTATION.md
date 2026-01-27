## 🎯 Objectif de cette implémentation

Formaliser un plan d’implémentation **concret et itératif** pour transformer le prototype `feed-connect` (frontend seul) en un **MVP fonctionnel** proche de la vision décrite dans :

- `analyse-feedme.md`
- `README-PRODUCTION.md`
- `DEPLOIEMENT.md`

Sans tout viser d’un coup, on se concentre sur un chemin réaliste en plusieurs phases.

---

## 🧠 Opinion rapide sur le plan de Claude

- **Très gros point fort** : la vision est **claire, cohérente et totalement alignée** avec ton concept (anonymat, instantanéité, impact social).  
- **Architecture proposée** (frontend Vite + backend Node/Express + PostgreSQL/PostGIS + Railway/Vercel) est **saine, moderne et déployable à faible coût**.  
- **Les docs "production"** décrivent un état **idéal déjà atteint** (backend, chat, géoloc réelle, rate limiting…). Dans ton repo actuel, **seul le frontend existe** : il faut donc **reconstruire progressivement** ce backend et les intégrations.  
- **Risque principal** : tout faire d’un coup (chat, notifications, modération, stats, etc.) serait trop lourd pour un premier jalon. Il vaut mieux **verrouiller un MVP simple** : créer un repas + trouver un repas à proximité.

Conclusion : on garde **80 % de la vision**, mais on l’exécute **en petites étapes**, en commençant par le **MVP repas + géoloc**.

---

## 📍 État actuel du repo `feed-connect`

- Frontend React/TypeScript avec Vite et shadcn/ui, déjà **très bien designé**.
- UX existante :
  - Landing page complète.
  - `RoleSelectionModal` (choix **"j’ai besoin"** / **"je donne"**).
  - `MapView` basée sur **simulation** (pas de vrai backend ni géoloc réelle).
- Pas de dossier `feedme-backend/` dans ce repo à ce stade.

---

## 🗺️ Plan d’implémentation par phases

### Phase 0 – Hygiène et préparation (dans ce repo)

- **0.1 Clarifier la config frontend**
  - Ajouter un petit client HTTP centralisé (`src/services/api.ts` ou `api.service.ts`).
  - Prévoir l’utilisation de `VITE_API_URL` (même si le backend n’existe pas encore).

- **0.2 Clarifier les types métier côté frontend**
  - Définir des types partagés simples :
    - `Meal` (id, description, temperature, portions, latitude, longitude, createdAt, distance optionnelle).
    - `CreateMealPayload`.
    - `NearbyMealsQuery`.

Résultat : le frontend est prêt à se brancher sur un backend réel **sans tout réécrire**.

---

### Phase 1 – Backend minimal MVP (repo séparé `feedme-backend`)

> Cette phase se fait dans un **nouveau repo** ou dossier `feedme-backend` (comme décrit par Claude), pas dans `feed-connect`.

- **1.1 Scaffolding backend**
  - Node.js + Express + TypeScript.
  - Structure minimale :
    - `src/index.ts` (serveur, routes de base, `/health`).
    - `src/db/config.ts` (connexion PostgreSQL).
    - `src/routes/meals.ts` (endpoints CRUD basiques).

- **1.2 Modèle de données minimal**
  - Table `meals` avec :
    - `id`, `description`, `temperature`, `portions`, `created_at`.
    - `latitude`, `longitude` (type PostGIS si PostGIS dispo, sinon simples floats au début).

- **1.3 Endpoints MVP**
  - `POST /api/meals` : créer un repas (valider les champs simples).
  - `GET /api/meals/nearby?latitude=&longitude=&radiusKm=` : retourner une liste de repas approximativement proches (même sans PostGIS avancé dans un premier temps).

Résultat : **une API simple** qui permet déjà :
- à un donneur de **créer** un repas,
- à un receveur de **voir** les repas à proximité.

---

### Phase 2 – Connexion frontend ↔ backend

> À partir d’ici, on commence à **modifier le code de ce repo** `feed-connect`.

- **2.1 Intégrer `VITE_API_URL`**
  - Ajouter `VITE_API_URL` dans `.env.local` pour le dev.
  - Utiliser ce base URL dans `api.ts`.

- **2.2 Hook de géolocalisation simple**
  - Créer `src/hooks/useGeolocation.ts` :
    - `getCurrentPosition` via `navigator.geolocation`.
    - Gestion d’états : `coords`, `loading`, `error`.

- **2.3 Adapter `MapView`**
  - Côté **donneur** (`role: "give"`):
    - Afficher formulaire **description + température + portions**.
    - À la soumission : appeler `POST /api/meals` avec la position actuelle.
    - Afficher un écran de succès si tout se passe bien.
  - Côté **besoin** (`role: "need"`):
    - Au chargement : appeler `GET /api/meals/nearby` avec la position.
    - Afficher la liste de repas réels (plus les marqueurs sur la “carte” si tu veux garder le look actuel).

Résultat : l’expérience existante reste la même visuellement, mais **les repas deviennent réels et persistants**.

---

### Phase 3 – Durcissement et sécurité minimale

- **3.1 Backend**
  - Ajouter validation avec Zod côté API.
  - Ajouter un **rate limiting simple** (ex : max X repas par IP / heure).
  - Optionnel : expiration basique des repas (par exemple job cron qui supprime > 4h).

- **3.2 Frontend**
  - Gérer proprement :
    - erreurs API (toasts).
    - cas “aucun repas disponible”.
    - cas “géolocalisation refusée”.

Résultat : MVP **utilisable par de vrais gens** en petit comité (beta fermée), sans encore aller jusqu’au chat temps réel ni modération avancée.

---

### Phase 4 – Chat basique et communication

- **4.1 Backend**
  - Ajouter table `chat_messages` et endpoints REST simples pour envoyer/lire les messages par `mealId`.
  - (WebSocket/SSE possible plus tard, pas obligatoire pour un premier chat).

- **4.2 Frontend**
  - Ajouter une UI de chat minimal attachée à un repas (modale ou section dans `MapView` ou une page séparée).

Résultat : les utilisateurs peuvent **échanger quelques messages** pour se coordonner sur le point de rencontre, sans identité réelle exposée.

---

### Phase 5 – Production & déploiement

- S’aligner avec `DEPLOIEMENT.md` et `README-PRODUCTION.md` :
  - Backend sur Railway/Render (+ Postgres).
  - Frontend sur Vercel.
  - Variables d’environnement correctement renseignées des deux côtés.
  - Vérifications de base : `/health`, création de repas, recherche de repas, géoloc en HTTPS.

---

## ✅ Ce que nous ferons ensuite dans ce repo

Dans `feed-connect`, les prochaines étapes concrètes (une fois que tu valides ce plan) seront :

1. **Créer un service API central (`src/services/api.ts`)** avec support de `VITE_API_URL`.  
2. **Créer un hook `useGeolocation` minimal**.  
3. **Préparer les types `Meal` et co.** dans un fichier dédié (ex. `src/types/meal.ts`).  
4. **Adapter progressivement `MapView`** pour parler avec l’API réelle quand le backend sera prêt.

On pourra ensuite itérer en suivant les phases décrites ci-dessus, sans perdre la cohérence avec les documents de Claude.

