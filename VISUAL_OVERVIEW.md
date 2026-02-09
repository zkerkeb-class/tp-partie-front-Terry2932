# 🎨 Aperçu Visuel de l'Application

## 🏠 Page d'Accueil - Liste des Pokémon

```
╔════════════════════════════════════════════════════════════════════╗
║                      🎮 Pokédex                                   ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌─────────────────────────────────────────┐  ➕ Ajouter        ║
║  │ Rechercher un Pokémon...                │     un Pokémon    ║
║  └─────────────────────────────────────────┘                    ║
║                                                                    ║
║  Mes Pokémon Personnalisés (0)                                   ║
║  [Vide pour l'instant]                                           ║
║                                                                    ║
║  Pokémon du Pokédex                                              ║
║  ┌──────────────┬──────────────┬──────────────┬──────────────┐   ║
║  │              │              │              │              │   ║
║  │   [IMAGE]    │   [IMAGE]    │   [IMAGE]    │   [IMAGE]    │   ║
║  │              │              │              │              │   ║
║  │ Bulbizarre   │ Salamèche    │ Carapuce     │ Pipette      │   ║
║  │ #1           │ #4           │ #7           │ #10          │   ║
║  │ [G][P]       │ [F]          │ [E]          │ [F][Nor]     │   ║
║  │              │              │              │              │   ║
║  └──────────────┴──────────────┴──────────────┴──────────────┘   ║
║                                                                    ║
║  ┌──────────────┬──────────────┬──────────────┬──────────────┐   ║
║  │ Roucool      │ Roucarnage   │ Goupix       │ Rondoudou    │   ║
║  │ #16          │ #17          │ #37          │ #39          │   ║
║  └──────────────┴──────────────┴──────────────┴──────────────┘   ║
║                                                                    ║
║  ... (12 autres cartes affichées)                                ║
║                                                                    ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ ◀ Précédent      Page 1 sur 5 (100 Pokémon)   Suivant ▶   │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝

Couleurs:
[G] = Grass (Vert)
[F] = Fire (Orange)
[E] = Electric (Jaune)
[Eau] = Water (Bleu)
[P] = Poison (Violet)
[Nor] = Normal (Gris)
```

---

## 📖 Page Détails - Pokémon (Lecture seule)

```
╔════════════════════════════════════════════════════════════════════╗
║ ◀ Retour à la liste                                              ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌────────────────┐        Charizard                             ║
║  │                │        #6                                     ║
║  │    [IMAGE]     │        ────────────────────────────────      ║
║  │   Avant        │                                              ║
║  │                │        Taille:          1.7 m               ║
║  ├────────────────┤        Poids:           90.0 kg              ║
║  │                │                                              ║
║  │    [IMAGE]     │        Types:          [Fire] [Flying]      ║
║  │   Arrière      │                                              ║
║  │                │        Capacités:      Blaze                ║
║  └────────────────┘                        Solar Power          ║
║                                                                    ║
║  Statistiques:                                                    ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ HP         ████████░░░░░░░░░░ 78                            │ ║
║  │ ATK        ███████████░░░░░░░░ 84                            │ ║
║  │ DEF        ████████░░░░░░░░░░░ 78                            │ ║
║  │ SP.ATK     ███████████░░░░░░░░ 109                           │ ║
║  │ SP.DEF     ████████░░░░░░░░░░░ 85                            │ ║
║  │ SPD        ███████████░░░░░░░░ 100                           │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║  [Pas de boutons de modification - C'est un Pokémon de l'API]   ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## ✏️ Page Détails - Pokémon Custom (Modifiable)

```
╔════════════════════════════════════════════════════════════════════╗
║ ◀ Retour à la liste                                              ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌────────────────┐        Dracaufeu Custom                     ║
║  │                │        🔷 Personnalisé                      ║
║  │    [IMAGE]     │        ────────────────────────────────     ║
║  │  Custom        │                                              ║
║  │                │        Type:            Fire/Dragon         ║
║  └────────────────┘        Taille:          1.7 m               ║
║                            Poids:           90.5 kg              ║
║                                                                    ║
║                            Description:                          ║
║                            Un puissant Pokémon de feu et dragon  ║
║                                                                    ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ ✏️ Modifier              │  🗑️ Supprimer                    │ ║
║  │ (Boutons uniquement pour │  (Affiche modale de             │ ║
║  │  Pokémon custom)         │   confirmation)                  │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## ➕ Page Ajout - Formulaire de Création

```
╔════════════════════════════════════════════════════════════════════╗
║ ◀ Retour à la liste                                              ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  Créer un nouveau Pokémon                                        ║
║  ═══════════════════════════════════════════════════════════════  ║
║                                                                    ║
║  Nom *                                                             ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ [Dracaufeu                                              ] │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                    ║
║  Type *              Taille (cm)       Poids (hg)               ║
║  ┌───────────────┐   ┌───────────┐     ┌───────────┐           ║
║  │ [Fire       ] │   │ [170    ] │     │ [900    ] │           ║
║  └───────────────┘   └───────────┘     └───────────┘           ║
║                                                                    ║
║  URL de l'image                                                   ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ [https://upload.wikimedia.org/...                     ] │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                    ║
║  Aperçu de l'image:                                              ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │                                                            │  ║
║  │              [IMAGE DE PREVIEW]                          │  ║
║  │                                                            │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                    ║
║  Description                                                      ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ [Un puissant Pokémon de feu. Peut cracher des                 ║
║  │  flammes massives...                                 ] │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                    ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ ✓ Créer le Pokémon   │  ✕ Annuler                         │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║  * Champs obligatoires                                           ║
║  Les Pokémon créés ne sont conservés que dans cette session.   ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## ✏️ Mode Édition - Modification d'un Pokémon Custom

```
╔════════════════════════════════════════════════════════════════════╗
║ Modifier le Pokémon                                               ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  Nom                                                               ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ [Mega Dracaufeu                                        ] │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                    ║
║  Type                                                              ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ [Fire/Dragon                                           ] │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                    ║
║  Taille (cm)                                                       ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ [180                                                   ] │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                    ║
║  Poids (hg)                                                        ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ [920                                                   ] │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                    ║
║  Description                                                       ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ [Un Pokémon ultime et redoutable. Maître des flammes   ] │  ║
║  │ [ et du ciel.                                          ] │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                    ║
║  URL Image                                                         ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ [https://...                                           ] │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                    ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ ✓ Enregistrer              │  ✕ Annuler                   │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## ⚠️ Modale de Suppression

```
╔═══════════════════════════════════════════════╗
║                                               ║
║         ⚠️  Supprimer un Pokémon              ║
║                                               ║
╠═══════════════════════════════════════════════╣
║                                               ║
║  Êtes-vous sûr de vouloir supprimer           ║
║  Dracaufeu ?                                  ║
║                                               ║
║  ┌───────────────────────────────────────┐   ║
║  │ ⚠️  Cette action est irréversible       │   ║
║  │    et ne pourra pas être annulée.     │   ║
║  └───────────────────────────────────────┘   ║
║                                               ║
╠═══════════════════════════════════════════════╣
║  ┌──────────────────┐   ┌─────────────────┐  ║
║  │ Oui, supprimer   │   │ Non, conserver  │  ║
║  │   (Bouton        │   │   (Bouton       │  ║
║  │    rouge)        │   │    bleu)        │  ║
║  └──────────────────┘   └─────────────────┘  ║
║                                               ║
╚═══════════════════════════════════════════════╝

Couleurs:
- Bouton rouge (danger): Confirmer la suppression
- Bouton bleu (info): Annuler et conserver
- Fond semi-transparent noir
```

---

## 🔍 Exemple de Recherche

**Avant:**
```
Affichage: 20 Pokémon génériques
Pagination: Page 1 sur 5
Recherche: [Vide]
```

**Après avoir tapé "char" :**
```
┌─────────────────────────────────────────────────────────────┐
│ Recherche: [char____________]                               │
│                                                              │
│ Pokémon du Pokédex                                          │
│ ┌──────────────────┐   ┌──────────────────┐               │
│ │ [IMAGE]          │   │ [IMAGE]          │               │
│ │ Salamèche        │   │ Charizard        │               │
│ │ #4               │   │ #6               │               │
│ └──────────────────┘   └──────────────────┘               │
│                                                              │
│ ◀ Précédent   Page 1 sur 1 (2 résultats)   Suivant ▶     │
│ (Les boutons réagissent au nombre de pages)               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📱 Responsivité Mobile

```
Mobile (< 480px):
┌──────────────────┐
│ 🎮 Pokédex       │
│ Recherche...     │
│ ➕ Ajouter       │
│                  │
│ ┌──────────────┐ │
│ │ Bulbizarre   │ │
│ │ [1 colonne]  │ │
│ └──────────────┘ │
│                  │
│ ┌──────────────┐ │
│ │ Salamèche    │ │
│ └──────────────┘ │
│                  │
│ ◀ Prec  1/5 S▶ │
└──────────────────┘

Tablette (480-768px):
┌─────────────────────────┐
│ 🎮 Pokédex              │
│ ┌──────────┬──────────┐ │
│ │ Bulbi    │ Salame   │ │
│ │ [2-3     │ [col]    │ │
│ │  colonnes]           │ │
│ └──────────┴──────────┘ │
│                          │
│ ◀ Prec    1/5    Sui▶  │
└─────────────────────────┘

Desktop (> 768px):
┌────────────────────────────────────────┐
│ 🎮 Pokédex            ➕ Ajouter       │
│ Recherche...                            │
│ ┌──────┬──────┬──────┬──────┐          │
│ │ Bulbi│Salame│Carap │Pipet │          │
│ │ [4-6 colonnes - Affichage optimal]   │
│ └──────┴──────┴──────┴──────┘          │
│                                         │
│ ◀ Précédent   Page 1/5   Suivant ▶     │
└────────────────────────────────────────┘
```

---

## 🎨 Palette de Couleurs

### Boutons
```
Vert (#4CAF50):     Actions principales (Créer, Ajouter, Modifier)
Bleu (#2196F3):     Actions secondaires (Naviguer, Conserver)
Rouge (#f44336):    Actions dangereuses (Supprimer)
Gris (#999):        Actions désactivées ou neutrales
```

### Types Pokémon
```
Normal      #a8a878  (Gris-marron)
Fire        #f08030  (Orange)
Water       #6890f0  (Bleu)
Electric    #f8d030  (Jaune)
Grass       #78c850  (Vert)
Ice         #98d8d8  (Cyan)
Fighting    #c03028  (Rouge sombre)
Poison      #a040a0  (Violet)
Ground      #e0c068  (Beige)
Flying      #a890f0  (Violet-bleu)
Psychic     #f85888  (Rose)
Bug         #a8b820  (Vert-jaune)
Rock        #b8a038  (Marron)
Ghost       #705898  (Violet foncé)
Dragon      #7038f8  (Violet électrique)
Dark        #705848  (Marron-gris)
Steel       #b8b8d0  (Gris-bleu)
Fairy       #ee99ac  (Rose clair)
```

### Backgrounds
```
Primaire:       Gradient violet (#667eea → #764ba2)
Cartes:         Blanc avec border gris
Header:         Noir semi-transparent sur fond
Inputs:         Blanc avec border gris
Focus:          Border vert (#4CAF50)
```

---

## ✨ Animations

```
Cartes Pokémon:
  - Hover: Remontée (translateY -10px) + Ombre
  - Durée: 0.3s

Images dans cards:
  - Hover: Agrandissement (scale 1.1)
  - Durée: 0.3s

Modale:
  - Entrée: FadeIn (opacité 0→1) + SlideUp
  - Durée: 0.3s

Boutons:
  - Hover: Changement couleur + Légère remontée
  - Durée: 0.3s
```

---

## 🎯 Points de Conception

### Hiérarchie Visuelle
1. **Header**: Titre principal au-dessus
2. **Actions**: Bouton ajouter à droite
3. **Filtre**: Barre de recherche
4. **Contenu**: Cartes de Pokémon
5. **Navigation**: Pagination en bas

### Espacement
- Padding général: 20px
- Gap entre cartes: 20px
- Padding cartes: 15px
- Border-radius: 8-12px

### Typographie
- H1/H2: Font-weight bold
- Buttons: Font-weight bold
- Body: Font-weight 400
- Font: System-ui, Avenir, Helvetica

### Accessibilité
- Couleurs haute contraste
- Boutons clairement labellisés
- Messages d'erreur en rouge avec icône
- Confirmations pour actions destructrices
- Modes focus visibles sur clavier

---

**Cet aperçu visuel vous donne une idée complète de l'interface! 🎨**
