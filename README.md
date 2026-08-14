# Fire Up The Grill — Menu digital installable (PWA)

## Fichiers
- `index.html` — le menu (contenu, panier, langues FR/EN/AR).
- `manifest.json` — décrit l'app (nom, couleurs, icônes) pour le bouton "Installer".
- `sw.js` — service worker : rend le menu installable et fonctionnel hors-ligne.
- `icon-192.png`, `icon-512.png` — icônes de l'app (placeholders "FG" à remplacer).
- `logo.webp` — **à ajouter vous-même** : le logo du restaurant utilisé dans l'en-tête.

## Déploiement (obligatoire pour que l'installation marche)
1. Remplacez `icon-192.png` et `icon-512.png` par votre vrai logo, mêmes noms de fichiers, formats carrés (192×192 et 512×512 px, fond plein — évitez la transparence pour l'icône "maskable").
2. Ajoutez votre fichier `logo.webp` dans ce même dossier (utilisé dans l'en-tête et l'apple-touch-icon si vous changez aussi cette référence).
3. Uploadez les 6 fichiers **dans le même dossier** sur un hébergement **HTTPS** (obligatoire — GitHub Pages, Netlify, Vercel, Cloudflare Pages fonctionnent tous gratuitement).
4. Ouvrez l'URL publiée sur un téléphone : le bandeau "Installer l'application" apparaît après quelques secondes.
   - **Android/Chrome** : bouton "Installer" → ajoute l'icône sur l'écran d'accueil et dans le tiroir d'applications.
   - **iPhone/Safari** : instructions manuelles ("Partager" → "Sur l'écran d'accueil"), car Safari ne propose pas d'installation automatique.

## Mise à jour du contenu
Après toute modification de `index.html` (prix, plats, textes…), changez la valeur de
`CACHE_NAME` dans `sw.js` (ex. `fire-up-the-grill-v2`) pour forcer les téléphones
qui ont déjà installé l'app à recharger la nouvelle version.
