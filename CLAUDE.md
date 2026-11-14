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

- Contenu du site en français et en anglais ; code, commentaires et noms en anglais.
- Bilingue : chaque texte existe en double, `<span lang="fr">…</span><span lang="en">…</span>`
  (ou `<p lang="…">`), et le CSS masque la langue absente de `<html lang>`. Les
  attributs (`alt`, `title`, `aria-label`, `content`, `data-label`, texte du
  `<title>` via `data-en-text`) gardent le français et portent l'anglais dans
  `data-en-*` ; `setLanguage` les échange. Les nuages de tags sont dans
  `TAG_CLOUDS` (`fr`/`en`). Langue : choix mémorisé (`localStorage.lang`),
  sinon celle du navigateur ; fixée par un script en `<head>` avant l'affichage.
  Piège : tout élément portant `lang` est masqué dans l'autre langue — ne pas
  en mettre sur un texte à afficher dans les deux.
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
de session).

Après toute modification de mise en page : regarder au moins 1080p, 2560x1440, 1366×768
et iPhone.
