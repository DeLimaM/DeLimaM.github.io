# Portfolio — DeLimaM.github.io

Site portfolio statique de Martin De Lima, publié par GitHub Pages depuis la
branche `main` (racine du dépôt). Pas de build, pas de dépendance npm.

## Fichiers

- `index.html` : page unique. Sections dans l'ordre : `#presentation`,
  `#about`, `#experience`, `#skills-passions`, `#projects-perso`,
  `#projects-edu`, `#contact` (le footer est dans `#contact`).
- `styles.css` : tout le style, organisé en `/* #region … */`.
- `scripts.js` : carrousels, thème, navigation, nuages de tags.
- `static/` : bibliothèques tierces vendorisées (Swiper 10.0.4, TagCloud
  2.5.0). Ne pas les modifier.
- `fonts/Iosevka.woff2` : sous-ensemble Latin de Iosevka (27 Ko). Pour le
  régénérer depuis la police complète (récupérable dans l'historique git,
  `git show 582dd3e:fonts/Iosevka.ttf > Iosevka.ttf`) :
  `pyftsubset Iosevka.ttf --unicodes="U+0020-007E,U+00A0-00FF,U+0100-017F,U+0192,U+02C6,U+02DC,U+2010-2027,U+2030-203A,U+20AC,U+2122,U+2190-2193" --flavor=woff2 --output-file=fonts/Iosevka.woff2`
  (paquets Python `fonttools` et `brotli`).
- Icônes de contact/GitHub : sprite SVG en tête de `<body>` (Font Awesome Free,
  CC BY 4.0), utilisé via `<svg class="icon"><use href="#icon-…"/></svg>`.

## Conventions

- Contenu du site en français ; code, commentaires et noms en anglais.
- Couleurs uniquement via les variables de thème (`.dark-theme` /
  `.light-theme` sur `<body>`, choix mémorisé dans `localStorage`).
- Tailles fluides (`clamp()`, `vh`/`svh`) : la police de base suit la taille
  de l'écran, le reste est en `em`.
- Liens de navigation : `href="#id-de-section"`, interceptés par
  `scrollToSection` dans `scripts.js`. Ne pas rajouter de gestionnaire par lien.
- Points de rupture : `1050px` (À propos sur 2 colonnes, image des projets
  au-dessus du texte), `767px` (menu hamburger, une colonne, tableaux en
  cartes, images des projets masquées), `orientation: portrait` (nuages de
  tags l'un sous l'autre).

## Pièges connus

- **Sections empilées** (`position: sticky`) : une section plus haute que
  l'écran serait recouverte par la suivante avant d'avoir été lue. Le JS
  publie `--section-h` (ResizeObserver) et le CSS colle alors la section par
  son bas. Ne jamais donner de hauteur fixe à une section dont le contenu
  peut dépasser (seules `#presentation` et `.projects` en ont une ; le texte
  des projets défile en interne).
- **Débordement rogné, pas défilé** : `body` (`overflow-x: hidden`) et les
  sections (`overflow: hidden`) coupent ce qui dépasse en largeur. Un
  débordement ne se voit donc pas comme une barre de défilement : chercher
  les éléments dont `getBoundingClientRect()` sort de `[0, innerWidth]`.
- **Ancres vers une section sticky** : le navigateur la croit déjà à
  l'écran. `scrollToSection` remonte en haut puis mesure (fait exprès).
- `hidden` ne s'applique pas aux éléments SVG : la règle `svg[hidden]` du CSS
  est nécessaire au sprite.
- TagCloud a un rayon fixe en px : `startTagClouds` le calcule selon la
  cellule et le recrée au redimensionnement.

## Vérifier le rendu

Pas d'outil dans le dépôt : l'outillage de capture vit hors du repo (scratchpad
de session). Méthode qui a servi :

- Servir la racine du dépôt (`python3 -m http.server`).
- Chrome est installé (`/usr/bin/google-chrome`) : le piloter en headless avec
  Playwright (venv jetable, `executable_path` vers ce Chrome, aucun navigateur
  à télécharger).
- Formats : 1920×1080, 2560×1440, 1920×1200, 1440×900, 1366×768, tablette
  820×1180, iPhone 390×844, Android 360×800.
- Pour chaque section, appeler `scrollToSection(id)` dans la page puis
  capturer ; si la section dépasse l'écran, capturer aussi sa fin.
- Contrôles : aucune erreur JS (`pageerror`), aucun élément hors écran en
  largeur (hors `.swiper-wrapper` et `.lines`).

Après toute modification de mise en page : regarder au moins 1080p, 1366×768
et iPhone.

## État (vérifié le 01/10)

- Tous les formats ci-dessus passent les contrôles (aucune erreur JS, rien
  hors écran) ; menus, thème clair persistant et navigation testés à 1080p et iPhone.
- Reste lourd, non traité : `images/WebSnake.gif` (7,3 Mo), `sortviz.gif`
  (2,4 Mo), `Pathfinder.gif` (1,3 Mo), `hackathon_2026.png` (1,2 Mo),
  `icons/page/Space.ico` (266 Ko). Les images des projets sont en
  `loading="lazy"`, donc chargées seulement à l'affichage de leur diapositive.
