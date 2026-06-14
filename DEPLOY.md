# 🚀 Déploiement Xaritsoccer sur Netlify

## Étapes rapides

### 1. Installer et tester
```powershell
npm install
npm run dev
```

### 2. Variables d'environnement (.env.local)
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=lions-arena-2026-c3e2d
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 3. Push sur GitHub
```powershell
git init
git add .
git commit -m "🦁 Xaritsoccer v1.0 - FIFA World Cup 2026"
git remote add origin https://github.com/TON_COMPTE/xaritsoccer.git
git push -u origin main
```

### 4. Netlify
1. netlify.com → New site from Git
2. Sélectionne le repo xaritsoccer
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add env variables (Firebase keys)
6. Deploy!

### 5. Domaine custom (optionnel)
Site settings → Domain management → Add custom domain
→ `xaritsoccer.com` ou `lionsarena.sn`

## API Live Scores (automatique)
L'app utilise automatiquement:
- `https://worldcup2026.onrender.com/api/matches` — scores en temps réel
- `https://worldcup2026.onrender.com/api/standings` — classements live
- Polling toutes les 30 secondes pendant les matchs

## localStorage (automatique)
- Pronostics sauvegardés: `xaritsoccer_pronos`
- Équipe favorite: `xaritsoccer_fav`
- Onboarding: `xaritsoccer_onboarded`
