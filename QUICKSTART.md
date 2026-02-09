# 🚀 Guide Démarrage Rapide - Pokédex

## ⚡ Installation Rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir dans le navigateur
# http://localhost:5173/
```

---

## 📸 Ce Que Vous Verrez

### 🏠 Page d'Accueil (Liste)
```
┌─────────────────────────────────────────┐
│  🎮 Pokédex                             │
├─────────────────────────────────────────┤
│  ┌──────────────────┐  ➕ Ajouter      │
│  │ Recherche...     │                    │
│  └──────────────────┘                    │
│                                          │
│  Mes Pokémon Personnalisés (0)          │
│  [Aucun pour l'instant]                 │
│                                          │
│  Pokémon du Pokédex                     │
│  ┌────────┬────────┬────────┬────────┐  │
│  │Bulbi   │Salame  │Carapuce│Pipette │  │
│  │#1      │#4      │#7      │#10     │  │
│  └────────┴────────┴────────┴────────┘  │
│  ... (16 autres cartes)                  │
│                                          │
│  ◀ Précédent   Page 1 sur 5   Suivant ▶ │
└─────────────────────────────────────────┘
```

### 📖 Page Détails
```
┌─────────────────────────────────────────┐
│  ◀ Retour à la liste                   │
│                                          │
│  ┌─────────────┐  Bulbizarre           │
│  │   [IMAGE]   │  #1                    │
│  │   [IMAGE2]  │                        │
│  └─────────────┘  Taille:      0.7 m    │
│                   Poids:       6.9 kg   │
│                   Types:       [Grass] [Poison]
│                                          │
│                   Capacités:  Overgrow  │
│                               Chlorophyll
│                                          │
│                   Stats:      [Barres]  │
│                                          │
│                   ✏️ Modifier  🗑️ Supprimer
│                   (si custom)            │
└─────────────────────────────────────────┘
```

### ➕ Page Ajout Pokémon
```
┌─────────────────────────────────────────┐
│  ◀ Retour à la liste                   │
│                                          │
│  Créer un nouveau Pokémon                │
│                                          │
│  Nom *              [_________________]  │
│                                          │
│  Type *  [____]  Taille [___]  Poids [___]
│                                          │
│  URL Image                               │
│  [_____________________]                 │
│  ┌─────────────────┐                     │
│  │  [APERÇU IMAGE] │                     │
│  └─────────────────┘                     │
│                                          │
│  Description                             │
│  [_____________________________]          │
│                                          │
│  ✓ Créer le Pokémon    ✕ Annuler      │
└─────────────────────────────────────────┘
```

---

## 🎯 Workflow Typique

```
1. Affichage initial
   ↓
2. Voir 20 Pokémon + Pagination
   ↓
3. Chercher par nom (recherche)
   ↓
4. Cliquer sur une carte
   ↓
5. Consulter détails complets
   ↓
6. Retour à la liste
   ↓
7. Ajouter nouveau Pokémon
   ↓
8. Voir dans "Mes Pokémon Personnalisés"
   ↓
9. Modifier ou supprimer (custom)
```

---

## 🔑 Raccourcis Clavier

- `Ctrl + K` : Pas implémenté (amélioration future)
- Aucun raccourci pour l'instant

---

## 📚 Documentation Complète

📄 **[IMPLEMENTATION.md](IMPLEMENTATION.md)**
- Vue d'ensemble de toutes les fonctionnalités
- Architecture du projet
- Technologies utilisées

📄 **[GUIDE_UTILISATION.md](GUIDE_UTILISATION.md)**
- Guide détaillé pour l'utilisateur final
- Explication de chaque fonctionnalité
- Conseils d'utilisation

📄 **[TECHNICAL_DETAILS.md](TECHNICAL_DETAILS.md)**
- Diagrammes d'architecture
- Détails de la gestion d'état
- Flow de l'application
- APIs utilisées

📄 **[TEST_GUIDE.md](TEST_GUIDE.md)**
- Scénarios de test complets
- Étapes de vérification
- Données de test recommandées
- Checklist finale

📄 **[SUMMARY.md](SUMMARY.md)**
- Résumé de toutes les modifications
- Fichiers créés/modifiés
- Checklist d'implémentation

---

## 🎮 Essayer Rapidement

### 1. Tester la Pagination
```
1. Page d'accueil
2. Cliquer "Suivant" → Voir Pokémon 21-40
3. Cliquer "Suivant" → Voir Pokémon 41-60
```

### 2. Tester la Recherche
```
1. Page d'accueil
2. Taper "pikachu"
3. Seul Pikachu s'affiche
4. Effacer la recherche
5. Tous les 20 réapparaissent
```

### 3. Tester l'Ajout
```
1. Cliquer "➕ Ajouter"
2. Remplir : Nom: "MonDragon", Type: "Dragon"
3. Cliquer "Créer"
4. Voir en haut dans "Mes Pokémon Personnalisés"
```

### 4. Tester la Modification
```
1. Cliquer sur le Pokémon créé
2. Cliquer "Modifier"
3. Changer le nom
4. Cliquer "Enregistrer"
5. Voir le changement
```

### 5. Tester la Suppression
```
1. Sur un Pokémon custom
2. Cliquer "Supprimer"
3. Confirmer "Oui, supprimer"
4. Disparaît de la liste
```

---

## 🛠️ Développement

### Commandes Utiles

```bash
# Développement
npm run dev              # Lancer le serveur

# Production
npm run build            # Build pour production
npm run preview          # Prévisualiser le build

# Qualité du code
npm run lint             # Linter le code
```

### Structure des Dossiers

```
src/
├── components/         # Composants React
│   ├── pokelist/      # Affichage liste paginée
│   ├── pokeCard/      # Carte Pokémon clickable
│   ├── pokeDetails/   # Page détails complets
│   ├── addPokemon/    # Formulaire création
│   └── deleteModal/   # Modale suppression
├── context/           # Gestion d'état global
├── hooks/             # Hooks personnalisés
├── App.jsx           # Composant racine
└── main.jsx          # Point d'entrée
```

---

## 🎨 Personnalisation

### Changer les Couleurs

**Dans `src/App.css` :**
```css
.app-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Modifier les codes hex pour d'autres couleurs */
}
```

### Changer Pokémon Par Page

**Dans `src/context/PokemonContext.jsx` :**
```javascript
const POKEMON_PER_PAGE = 20;  // Changer en 10, 15, 25, etc.
```

### Ajouter Validations Supplémentaires

**Dans `src/components/addPokemon/index.jsx` :**
```javascript
// Ajouter des validations dans validateForm()
```

---

## 🐛 Debugging

### Ouvrir la Console
- `F12` → Onglet "Console"
- Aucun message d'erreur ne devrait apparaître

### Vérifier l'État
```javascript
// Si vous ajoutez un console.log dans le context:
// Vous verrez l'état mis à jour à chaque action
```

---

## 📱 Support Navigateurs

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile (iOS/Android)

---

## 🚀 Prochaines Améliorations Possibles

- [ ] Sauvegarde en localStorage
- [ ] Authentification utilisateur
- [ ] Backend API
- [ ] Mode sombre/clair
- [ ] Filtrage par type
- [ ] Système de favoris
- [ ] Exportation données
- [ ] Panier de Pokémon
- [ ] Évolutions enchaînées
- [ ] Recherche avancée

---

## ❓ FAQ

**Q: Où vont mes Pokémon créés?**
A: Ils sont stockés en mémoire. Ils disparaissent au rechargement. Amélioration future: localStorage.

**Q: Pourquoi je ne peux pas modifier les Pokémon de l'API?**
A: C'est intentionnel pour protéger les données. Seuls vos créations custom peuvent être modifiées.

**Q: Combien de Pokémon max je peux créer?**
A: Autant que vous voulez! La mémoire est la limite.

**Q: La recherche fonctionne-t-elle sur l'ID?**
A: Non, seulement sur le nom. Amélioration future possible.

**Q: Y a-t-il une limite de caractères pour le formulaire?**
A: Non, mais il est conseillé de rester raisonnable.

---

## 📞 Support

Pour toute question:
- Vérifiez la documentation complète
- Consultez le TEST_GUIDE.md pour les scénarios
- Vérifiez la console pour les erreurs

---

## 🎉 Vous êtes Prêt!

1. Lancez `npm run dev`
2. Ouvrez http://localhost:5173
3. Explorez le Pokédex!

**Bon jeu ! 🎮**
