# Pack d'arrières-plans — Pokémon Kanto (001–151)

Ce pack contient **151 arrière-plans originaux** (abstraits) pour cartes Pokémon, générés à partir des **types officiels (nomenclature moderne)**.  
Aucun artwork officiel n'est inclus : ce sont uniquement des **fonds premium** destinés à recevoir votre mise en page (visuel Pokémon, nom, PV, attaques, etc.).

## Contenu
- `pokemon_kanto_card_backgrounds/` : 151 images **PNG 1024×1536**
- `pokemon_kanto_backgrounds_manifest.json` : manifest complet (noms FR/EN, types, palettes, fichier)
- `pokemon_kanto_backgrounds_manifest.csv` : version tableur
- `pokemon_kanto_backgrounds_catalog.pdf` : catalogue visuel (vignettes)
- `pokemon_kanto_preview_contact_sheet.jpg` : aperçu global (planche contact)

## Conventions de nommage
`###_<NomFR>_<type1-type2>.png`  
Ex: `025_Pikachu_electric.png` / `006_Dracaufeu_fire-flying.png`

## Safe area recommandée (pour l'illustration du Pokémon)
- x = **80**
- y = **160**
- w = **864**
- h = **980**

En pratique : place le visuel principal du Pokémon dans cette zone pour conserver une bonne lisibilité
(des bords + du haut pour les textes, et du bas pour les attaques).

## Couleur de texte suggérée
Chaque entrée du manifest contient `suggested_text` :
- `#F9FAFB` (clair) pour fonds sombres
- `#0B0B0B` (foncé) pour fonds très clairs (Ice/Flying/Fairy/Steel/Normal, etc.)

## Astuces (design)
- Ajoute une **ombre portée douce** sous le Pokémon (blur ~ 18–30 px, opacité 20–35%)
- Utilise un **gloss** léger sur le cadre (dégradé blanc -> transparent en haut)
- Pour un rendu “holo” : applique une **texture irisée** (overlay / soft light 15–35%)

## Attribution des données Pokédex
Les noms (FR/EN) et les types proviennent d'un dataset public (gist) inspiré de la structure Pokédex JSON.
