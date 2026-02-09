# 🔧 Détails Techniques - Architecture et Implémentation

## 📊 Diagramme d'Arborescence

```
App.jsx
└─ PokemonProvider (Context)
   ├─ AppContent
   │  ├─ PokeList (View: 'list')
   │  │  ├─ SearchBar
   │  │  ├─ CustomPokemonsSection
   │  │  │  └─ PokeCard[] (pour chaque customPokemon)
   │  │  ├─ PokedexSection
   │  │  │  └─ PokeCard[] (affichage paginé)
   │  │  └─ Pagination
   │  │
   │  ├─ PokeDetails (View: 'details')
   │  │  ├─ BackButton
   │  │  ├─ ImageSection
   │  │  └─ InfoSection
   │  │     ├─ ViewMode
   │  │     │  ├─ BasicInfo (Nom, ID)
   │  │     │  ├─ DetailGrid
   │  │     │  │  ├─ Types
   │  │     │  │  ├─ Abilities
   │  │     │  │  ├─ Stats
   │  │     │  │  └─ CustomInfo
   │  │     │  ├─ ModifyButton
   │  │     │  └─ DeleteButton
   │  │     │
   │  │     └─ EditMode
   │  │        ├─ FormGroup[]
   │  │        ├─ SaveButton
   │  │        └─ CancelButton
   │  │
   │  │  └─ DeleteModal (si suppression)
   │  │
   │  └─ PokeAdd (View: 'add')
   │     ├─ BackButton
   │     └─ Form
   │        ├─ FormGroup (Nom)
   │        ├─ FormRow
   │        │  ├─ FormGroup (Type)
   │        │  ├─ FormGroup (Taille)
   │        │  └─ FormGroup (Poids)
   │        ├─ FormGroup (Image)
   │        │  └─ ImagePreview
   │        ├─ FormGroup (Description)
   │        └─ ButtonGroup
   │           ├─ SubmitButton
   │           └─ CancelButton
```

## 🌐 Flow de l'Application

### 1. Initialisation
```
1. App charge PokemonProvider
2. PokemonProvider initialise le context avec état vide
3. AppContent vérifie currentView = 'list'
4. PokeList se monte et appelle fetchPokemons()
5. Les 100 premiers Pokémon sont chargés de l'API
6. État updated: pokemons = [...]
7. Affichage des 20 premiers avec pagination
```

### 2. Navigation Liste → Détails
```
1. Utilisateur clique sur PokeCard
2. handleCardClick() → viewPokemonDetails(pokemon)
3. selectedPokemon = pokemon (url ou custom)
4. currentView = 'details'
5. PokeDetails se monte
6. useEffect fetch data complète si API, sinon utilise data custom
7. Affichage des détails avec boutons Edit/Delete
```

### 3. Modification d'un Pokémon
```
1. Click "Modifier" → setIsEditing(true)
2. Affichage du formulaire d'édition
3. Utilisateur remplit les champs
4. Click "Enregistrer"
5. updatePokemon(editedData)
6. Context met à jour customPokemons
7. Affichage des données modifiées
```

### 4. Suppression avec Modale
```
1. Click "Supprimer" → setShowDeleteModal(true)
2. DeleteModal se rend par-dessus le contenu
3. Utilisateur clique "Oui, supprimer"
4. handleDelete() → deletePokemon()
5. Context remove from customPokemons
6. currentView = 'list'
7. Retour à la liste automatiquement
```

### 5. Ajout d'un Pokémon
```
1. Click "Ajouter" → goToAddPokemon()
2. selectedPokemon = null
3. currentView = 'add'
4. AddPokemon se monte avec formulaire vide
5. Utilisateur remplit le formulaire (validation)
6. Click "Créer"
7. addPokemon(formData)
8. newPokemon créé avec id unique (Date.now())
9. customPokemons.push(newPokemon)
10. currentView = 'list'
11. Pokémon visible en section "Mes Pokémon"
```

### 6. Recherche
```
1. Utilisateur tape dans la barre
2. setSearchTerm(value)
3. getFilteredPokemons() filtre par nom
4. setCurrentPage(1) réinitialise pagination
5. Re-render avec résultats filtrés
```

## 🏗️ Gestion d'État - PokemonContext

### États Principaux
```javascript
{
  pokemons: [],                 // Pokémon de l'API (lecture seule)
  customPokemons: [],          // Pokémon créés par l'utilisateur
  currentPage: 1,              // Page actuelle pour pagination
  currentView: 'list',         // 'list' | 'details' | 'add'
  selectedPokemon: null,       // Pokémon actuellement consulté
  loading: true,               // État de chargement
  searchTerm: '',              // Terme de recherche
}
```

### Constantes
```javascript
POKEMON_PER_PAGE = 20  // Nombre de Pokémon par page
```

### Fonctions Principales
```javascript
fetchPokemons()            // Récupère 100 Pokémon de l'API
getFilteredPokemons()      // Filtre par recherche
getDisplayedPokemons()     // Retourne les Pokémon paginés
getTotalPages()            // Calcule nombre de pages
viewPokemonDetails()       // Navigue vers détails
goToAddPokemon()          // Navigue vers formulaire ajout
addPokemon()              // Crée un nouveau Pokémon
updatePokemon()           // Modifie un Pokémon custom
deletePokemon()           // Supprime un Pokémon custom
backToList()              // Revient à la liste
```

## 📡 API PokéAPI

### Endpoints Utilisés

**1. Liste initiale**
```
GET https://pokeapi.co/api/v2/pokemon?limit=100
Response: { results: [{name, url}, ...] }
```

**2. Détails d'un Pokémon**
```
GET {pokemon.url}
Example: https://pokeapi.co/api/v2/pokemon/1/
Response: {
  id,
  name,
  height,
  weight,
  sprites: { front_default, back_default },
  types: [{type: {name}}],
  abilities: [{ability: {name}}],
  stats: [{stat: {name}, base_stat}]
}
```

## 🎯 Validation des Formulaires

### Formulaire d'Ajout
```javascript
Validations:
- name: Non vide et obligatoire
- type: Non vide et obligatoire
- height: >= 0
- weight: >= 0
- image: URL valide (optionnel)
- description: Texte libre (optionnel)

Messages d'erreur:
- Affichés en rouge sous le champ
- Disparaissent lors de modification
- Soumission bloquée tant que erreurs existantes
```

### Formulaire de Modification
```javascript
Validations:
- Identiques à l'ajout
- Pré-remplissage avec données actuelles
```

## 🎨 Système de Styling

### Approche CSS
- **Fichiers individuels** : Chaque composant a son CSS
- **Importé localement** : Pas de conflits de noms
- **Variables de couleur** : Cohérence visuelle
- **Responsive** : Media queries pour mobile

### Palette de Couleurs
```css
Primaire:  #4CAF50 (Vert)
Secondaire: #2196F3 (Bleu)
Danger:    #f44336 (Rouge)
Success:   #4CAF50 (Vert)
Warning:   #ff9800 (Orange)
Disabled:  #cccccc (Gris)
Background: Gradient violet (#667eea → #764ba2)
```

### Types Pokémon - Couleurs
```css
normal   : #a8a878
fire     : #f08030
water    : #6890f0
electric : #f8d030 (avec texte noir)
grass    : #78c850
ice      : #98d8d8 (avec texte noir)
fighting : #c03028
poison   : #a040a0
ground   : #e0c068 (avec texte noir)
flying   : #a890f0
psychic  : #f85888
bug      : #a8b820
rock     : #b8a038
ghost    : #705898
dragon   : #7038f8
dark     : #705848
steel    : #b8b8d0
fairy    : #ee99ac
```

## 📱 Responsive Design

### Breakpoints
```css
Mobile: < 480px
Tablet: 480px - 768px
Desktop: > 768px
```

### Grilles de Layout
```javascript
Desktop: 4+ colonnes pour Pokémon cards
Tablet:  3 colonnes
Mobile:  1-2 colonnes
```

## 🔐 Sécurité et Données

### Stockage
- **Pokémon API** : Lecture seule, récupérés à chaque chargement
- **Pokémon Custom** : Stockés en mémoire (perdus au rechargement)
- **Amélioration future** : localStorage ou backend

### Protection
- Confirmation de suppression
- Validation des entrées utilisateur
- Gestion d'erreurs API

## 🚀 Optimisations Possibles

1. **Pagination Backend** : Charger à la demande au lieu de 100 d'un coup
2. **Lazy Loading** : Images chargées au défilement
3. **Caching** : Mémoriser les détails des Pokémon
4. **localStorage** : Persister les Pokémon custom
5. **Debounce** : Recherche optimisée
6. **Image Compression** : Format WebP
7. **Code Splitting** : Lazy load des pages
8. **Virtual Scrolling** : Pour très longues listes

## 🧪 Tests Suggérés

```javascript
// Test unitaires
- validateForm() avec cas valides/invalides
- getFilteredPokemons() avec différents termes
- getDisplayedPokemons() avec paginations

// Test d'intégration
- Navigation list → details → list
- CRUD complet sur Pokémon custom
- Recherche avec pagination

// Test E2E
- Workflow complet utilisateur
- Modal de suppression
- Responsive sur différents appareils
```

---

**Note** : Cette architecture utilise React Context API pour la gestion d'état. Pour une application plus complexe, Redux ou Zustand pourraient être considérés.
