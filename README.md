# 🏆 World Cup 2026 App

Application football complète pour la Coupe du Monde 2026, avec pronostics, classements, commentaires en temps réel et focus Sénégal 🦁

## Stack
- **React + Vite**
- **Firebase** (Firestore + Auth anonyme)
- **React Router v6**
- **Netlify** (déploiement)

## Features
- ⏱ Countdown en temps réel jusqu'au coup d'envoi
- ⚽ Tous les matchs avec filtres (Sénégal, Groupes...)
- 🎯 Pronostics avec score exact + résultat → points
- 🏆 Leaderboard temps réel
- 💬 Commentaires + réactions par match (Firebase live)
- 👤 Profil utilisateur persistant (auth anonyme)
- 📊 Tous les 8 groupes

## Setup

### 1. Cloner et installer
```bash
npm install
```

### 2. Firebase
1. Va sur [console.firebase.google.com](https://console.firebase.google.com)
2. Crée un projet (ou utilise `xaritsoccer-c3e2d`)
3. Active **Firestore** et **Authentication > Anonymous**
4. Copie tes clés dans `.env.local` :

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 3. Firestore Rules
Dans la console Firebase, colle ces règles :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
    match /pronostics/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /matches/{matchId}/comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
    }
  }
}
```

### 4. Dev local
```bash
npm run dev
```

### 5. Déploiement Netlify
```bash
git init
git add .
git commit -m "init worldcup2026"
git remote add origin https://github.com/TON_COMPTE/worldcup2026.git
git push -u origin main
```
Ensuite sur Netlify : **New site from Git** → sélectionne le repo → build command: `npm run build` → publish dir: `dist`

Ajoute les variables d'environnement dans **Site settings > Environment variables**.

## Structure
```
src/
├── pages/
│   ├── Home.jsx        # Accueil + countdown + spotlight Sénégal
│   ├── Matches.jsx     # Matchs + commentaires
│   ├── Pronostics.jsx  # Pronos + leaderboard
│   ├── Groups.jsx      # Groupes A-H
│   └── Profile.jsx     # Profil utilisateur
├── components/
│   ├── BottomNav.jsx
│   ├── MatchCard.jsx
│   ├── CommentSection.jsx
│   └── Leaderboard.jsx
├── context/
│   └── AuthContext.jsx
├── firebase/
│   └── config.js
└── data/
    └── data.js
```

Allez les Lions 🦁🇸🇳
