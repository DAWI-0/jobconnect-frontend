# JobConnect — Frontend

> Interface utilisateur de la plateforme **JobConnect**  
> Stack : **React 19 · Vite 8 · TailwindCSS 4 · React Router v7**

---

## 📋 Résumé

Le frontend est une **Single Page Application (SPA)** connectée à l'API REST Django via **Axios** et à la messagerie temps réel via **WebSocket**. Il gère trois profils d'utilisateurs avec des vues dédiées : **Candidat**, **Recruteur** et **Admin**.

---

## 🗂️ Structure du projet

```
jobconnect-frontend/
├── public/                     # Fichiers statiques publics
├── src/
│   ├── main.jsx                # Point d'entrée React
│   ├── App.jsx                 # Routage principal (React Router v7)
│   │
│   ├── context/
│   │   └── AuthContext.jsx     # Contexte global : utilisateur + tokens JWT
│   │
│   ├── services/
│   │   ├── api.js              # Instance Axios + intercepteurs JWT (refresh auto)
│   │   └── websocket.js        # Factory WebSocket pour le chat
│   │
│   ├── components/
│   │   ├── layout/             # Layout principal + Navbar
│   │   └── chat/               # Composants de messagerie
│   │
│   ├── pages/
│   │   ├── home/               # Page d'accueil
│   │   ├── auth/               # Login · Register
│   │   ├── jobs/               # Liste offres · Détail · Formulaire recruteur
│   │   ├── applications/       # Candidatures (candidat + recruteur)
│   │   ├── favorites/          # Offres favorites
│   │   ├── profile/            # Profil utilisateur
│   │   ├── messaging/          # Chat temps réel
│   │   ├── admin/              # Dashboard administrateur
│   │   └── NotFound.jsx        # Page 404
│   │
│   └── i18n/                   # Internationalisation (i18next)
│
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
└── .env
```

---

## 📄 Pages & Routes

### Public

| Route | Composant | Description |
|---|---|---|
| `/` | `Home` | Page d'accueil |
| `/jobs` | `Jobs` | Liste des offres publiées |
| `/jobs/:id` | `JobDetails` | Détail d'une offre |
| `/login` | `Login` | Connexion |
| `/register` | `Register` | Inscription |

### Candidat

| Route | Composant | Description |
|---|---|---|
| `/applications` | `Applications` | Mes candidatures et leur statut |
| `/favorites` | `Favorites` | Offres mises en favoris |

### Recruteur

| Route | Composant | Description |
|---|---|---|
| `/recruiter/jobs` | `Jobs` | Liste de ses offres |
| `/recruiter/jobs/new` | `JobForm` | Créer une offre |
| `/recruiter/jobs/:id/edit` | `JobForm` | Modifier une offre |
| `/recruiter/applications` | `RecruiterApplications` | Candidatures reçues |

### Partagé (connecté)

| Route | Composant | Description |
|---|---|---|
| `/profile` | `Profile` | Voir et modifier son profil |
| `/chat` | `Chat` | Messagerie temps réel |

### Admin

| Route | Composant | Description |
|---|---|---|
| `/admin` | `AdminDashboard` | Statistiques globales (Recharts) |

---

## ⚙️ Services

### `src/services/api.js` — Client HTTP

Instance **Axios** préconfigurée avec :

- `baseURL` → `http://127.0.0.1:8000/api`
- **Intercepteur requête** : injecte automatiquement le token JWT (`Authorization: Bearer`) depuis le `localStorage`
- **Intercepteur réponse** : en cas d'erreur `401`, tente un **refresh automatique** du token, puis relance la requête d'origine — redirige vers `/login` si le refresh échoue

```js
import api from "./services/api";

const response = await api.get("/jobs/");
```

### `src/services/websocket.js` — Client WebSocket

Factory qui crée une connexion WebSocket authentifiée :

```js
import { createChatSocket } from "./services/websocket";

const socket = createChatSocket(conversationId, accessToken);
// URL générée : ws://127.0.0.1:8000/ws/chat/<id>/?token=<jwt>
```

---

## 🔐 Authentification

Le contexte `AuthContext` (disponible globalement via `AuthProvider`) expose :

| Valeur | Type | Description |
|---|---|---|
| `user` | object | Données de l'utilisateur connecté |
| `accessToken` | string | JWT d'accès |
| `login(data)` | function | Stocke les tokens + met à jour l'état |
| `logout()` | function | Vide le `localStorage` + redirige |

Les tokens sont persistés dans le **localStorage** (`access_token`, `refresh_token`).

---

## 🛠️ Technologies

| Technologie | Version | Rôle |
|---|---|---|
| **React** | 19.x | Framework UI |
| **Vite** | 8.x | Bundler & dev server |
| **TailwindCSS** | 4.x | Styles utilitaires (via plugin Vite) |
| **React Router DOM** | 7.x | Routage SPA |
| **Axios** | 1.x | Client HTTP + intercepteurs JWT |
| **Recharts** | 3.x | Graphiques dashboard admin |
| **i18next** | 26.x | Gestion des traductions |
| **react-i18next** | 17.x | Intégration i18next dans React |
| **Lucide React** | 1.x | Bibliothèque d'icônes |
| **ESLint** | 10.x | Linting (react-hooks + react-refresh) |

---

## ⚙️ Configuration

Créer un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_WS_URL=ws://127.0.0.1:8000
```

> Les variables Vite doivent obligatoirement commencer par `VITE_` pour être accessibles dans le code.

---

## 🚀 Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en développement
npm run dev
# → http://localhost:5173

# 3. Linter
npm run lint

# 4. Build production
npm run build

# 5. Prévisualiser le build
npm run preview
```

> ⚠️ Le **backend Django** doit tourner sur `http://127.0.0.1:8000` avant de lancer le frontend.

---

## 📐 Conventions

| Paramètre | Valeur |
|---|---|
| Port dev | `5173` |
| Base URL API | `http://127.0.0.1:8000/api` |
| Base URL WebSocket | `ws://127.0.0.1:8000` |
| Langue i18n | Français (fr) |
| Format composants | `.jsx` fonctionnel |
| Gestion d'état | React Context (pas de Redux) |
