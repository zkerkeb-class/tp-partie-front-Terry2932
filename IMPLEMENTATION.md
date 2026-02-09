# Pokédex - Application Frontend React

Une application interactive de gestion de Pokémon construite avec React et Vite, intégrant l'API PokéAPI.

## 🎯 Fonctionnalités Implémentées

### ✅ Fonctionnalités Requises

1. **Liste des Pokémon avec Pagination**
   - Affiche 20 Pokémon par page
   - Navigation entre les pages (Précédent/Suivant)
   - Indicateur de page actuelle

2. **Page de Détails du Pokémon**
   - Cliquez sur une carte Pokémon pour voir ses détails complets
   - Affiche l'image, les statistiques, les types, les capacités
   - Support des sprites avant/arrière

3. **Modification des Pokémon Personnalisés**
   - Modifiez le nom, le type, la taille, le poids et la description
   - Validation des formulaires
   - Sauvegarde des modifications en temps réel

4. **Suppression avec Modale d'Avertissement**
   - Modale de confirmation avant suppression
   - Message d'avertissement clair
   - Suppression irréversible des Pokémon personnalisés

5. **Ajouter un Nouveau Pokémon**
   - Formulaire complet avec validation
   - Champs: nom, type, taille, poids, description, image
   - Aperçu de l'image lors de l'ajout
   - Les Pokémon créés apparaissent en section "Mes Pokémon Personnalisés"

### 🌟 Fonctionnalité Supplémentaire : Système de Recherche et Filtre

- **Barre de recherche dynamique** pour filtrer les Pokémon par nom
- Les résultats de recherche se mettent à jour en temps réel
- Fonctionne sur les Pokémon du Pokédex ET les Pokémon personnalisés
- Section dédiée pour afficher les Pokémon créés par l'utilisateur

## 🏗️ Architecture du Projet

```
src/
├── context/
│   └── PokemonContext.jsx          # Contexte global pour la gestion d'état
├── hooks/
│   └── usePokemon.js               # Hook personnalisé pour accéder au contexte
├── components/
│   ├── pokelist/
│   │   ├── index.jsx               # Composant liste avec pagination
│   │   └── pokelist.css            # Styles de la liste
│   ├── pokeCard/
│   │   ├── index.jsx               # Carte Pokémon clickable
│   │   └── pokecard.css            # Styles de la carte
│   ├── pokeDetails/
│   │   ├── index.jsx               # Page détails avec modification
│   │   └── pokedetails.css         # Styles détails
│   ├── addPokemon/
│   │   ├── index.jsx               # Formulaire d'ajout
│   │   └── addpokemon.css          # Styles formulaire
│   └── deleteModal/
│       ├── index.jsx               # Modale de confirmation
│       └── deletemodal.css         # Styles modale
├── App.jsx                         # Composant principal avec routing
├── App.css                         # Styles généraux
└── main.jsx                        # Point d'entrée
```

## 🎨 Design et UX

- **Interface moderne** avec gradient de couleur
- **Responsive design** optimisé pour mobile et desktop
- **Animations fluides** pour améliorer l'expérience utilisateur
- **Codes couleur cohérents** pour les types de Pokémon
- **Accessibilité** avec boutons clairs et messages d'erreur explicites

## 🔧 Technologies Utilisées

- **React 19.2.0** - Framework frontend
- **React DOM 19.2.0** - Rendu DOM
- **Vite 7.2.4** - Build tool
- **CSS 3** - Styling
- **PokéAPI** - Source de données Pokémon

## 📋 Utilisation

### Lancer l'application
```bash
npm run dev
```

### Build pour production
```bash
npm run build
```

### Linter
```bash
npm run lint
```

## 🌐 API Utilisée

- **PokéAPI** (https://pokeapi.co/api/v2/)
  - Récupère les données de 100 premiers Pokémon
  - Affiche les informations détaillées, sprites, types, capacités et statistiques

## 💾 Stockage des Données

- **Pokémon de l'API** : Affichés depuis PokéAPI
- **Pokémon Personnalisés** : Stockés en mémoire pendant la session (localStorage peut être ajouté)

## 🚀 Fonctionnalités Futures Possibles

- Sauvegarde en localStorage des Pokémon personnalisés
- Système de favoris/panier
- Filtre par type de Pokémon
- Édition des Pokémon de l'API (avec backend)
- Mode sombre/clair
- Intégration d'un backend pour persister les données

## 📱 Responsivité

L'application est entièrement responsive :
- **Desktop** : Mise en page optimale avec 4+ colonnes de Pokémon
- **Tablette** : Ajustement à 3-4 colonnes
- **Mobile** : Mise en page verticale avec colonnes adaptées

## ✨ Points Forts

- Gestion d'état centralisée avec Context API
- Réutilisabilité des composants
- Code modulaire et maintenable
- Validation des formulaires
- Gestion des erreurs appropriée
- Interface intuitive et accueillante
