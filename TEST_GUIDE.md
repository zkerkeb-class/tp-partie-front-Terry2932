# 📝 Guide de Test - Pokédex

## 🧪 Scénarios de Test Recommandés

### 1️⃣ Test: Pagination

**Étape 1: Vérifier l'affichage initial**
```
✓ La page affiche 20 Pokémon
✓ Le bouton "Précédent" est désactivé (grisé)
✓ Le bouton "Suivant" est actif (bleu)
✓ Affiche "Page 1 sur 5"
```

**Étape 2: Naviguer vers la page 2**
```
✓ Cliquer "Suivant"
✓ Les Pokémon changent (21-40)
✓ Les deux boutons sont actifs
✓ Affiche "Page 2 sur 5"
```

**Étape 3: Aller à la dernière page**
```
✓ Cliquer "Suivant" plusieurs fois (ou 3 fois depuis page 2)
✓ Arriver à page 5
✓ Le bouton "Suivant" est désactivé
✓ Le bouton "Précédent" est actif
✓ Affiche "Page 5 sur 5"
```

**Étape 4: Revenir à la première page**
```
✓ Cliquer "Précédent" plusieurs fois
✓ Vérifier que chaque page affiche le bon groupe de 20
```

---

### 2️⃣ Test: Recherche

**Scénario A: Recherche existant**
```
✓ Taper "pikachu" dans la barre
✓ Seul Pikachu s'affiche
✓ La pagination indique "Page 1 sur 1" (1 résultat)
✓ Effacer la recherche
✓ Les 20 premiers Pokémon réapparaissent
```

**Scénario B: Recherche partiellement**
```
✓ Taper "chu" 
✓ Affiche Pikachu et autres (Raichu, etc.)
✓ La recherche est insensible à la casse
✓ Taper "CHU" → même résultat
```

**Scénario C: Recherche sans résultat**
```
✓ Taper "azerty"
✓ Message "Aucun Pokémon trouvé."
✓ Pas de pagination visible
```

---

### 3️⃣ Test: Navigation vers Détails

**Étape 1: Cliquer sur un Pokémon**
```
✓ Cliquer sur une carte (ex: Bulbizarre)
✓ La vue change vers la page détails
✓ Affiche le nom complet (Bulbizarre)
✓ Affiche l'ID (#1)
✓ Affiche les images avant/arrière
```

**Étape 2: Vérifier tous les détails**
```
✓ Taille s'affiche en mètres (ex: 0.7 m)
✓ Poids s'affiche en kg (ex: 6.9 kg)
✓ Types affichés avec couleurs
✓ Capacités listées
✓ Statistiques avec barres visuelles
```

**Étape 3: Bouton Retour**
```
✓ Cliquer "◀ Retour à la liste"
✓ Revenir à la liste
✓ Vérifier page/recherche préservées
```

---

### 4️⃣ Test: Ajouter un Pokémon

**Étape 1: Accéder au formulaire**
```
✓ Sur la liste, cliquer "➕ Ajouter un Pokémon"
✓ Vue change vers formulaire
✓ Tous les champs sont vides
✓ Le bouton "✓ Créer" est présent
```

**Étape 2: Remplir le formulaire**
```
Données de test:
┌─────────────┬────────────────────────┐
│ Champ       │ Valeur                 │
├─────────────┼────────────────────────┤
│ Nom         │ Dracaufeu              │
│ Type        │ Fire                   │
│ Taille (cm) │ 170                    │
│ Poids (hg)  │ 905                    │
│ Description │ Un Pokémon de feu...   │
│ Image       │ https://... (URL)      │
└─────────────┴────────────────────────┘

✓ Chaque champ accepte l'entrée
✓ L'aperçu d'image s'affiche si URL valide
```

**Étape 3: Validation**
```
✓ Effacer le nom
✓ Cliquer "Créer"
✓ Message d'erreur rouge: "Le nom est requis"
✓ Effacer le type
✓ Message d'erreur rouge: "Le type est requis"
✓ Taper hauteur négative (-5)
✓ Message d'erreur: "La taille doit être positive"
```

**Étape 4: Créer le Pokémon**
```
✓ Remplir tous les champs correctement
✓ Cliquer "✓ Créer le Pokémon"
✓ Revenir automatiquement à la liste
✓ Voir "Mes Pokémon Personnalisés" en haut avec le nouveau
✓ Le Pokémon a un badge "Personnalisé"
```

---

### 5️⃣ Test: Modifier un Pokémon

**Étape 1: Accéder à la modification**
```
✓ Cliquer sur le Pokémon créé (ex: Dracaufeu custom)
✓ Voir la page détails
✓ Le bouton "✏️ Modifier" est visible
✓ Le bouton "🗑️ Supprimer" est visible
(Note: Ces boutons n'existént que pour custom)
```

**Étape 2: Entrer en mode édition**
```
✓ Cliquer "✏️ Modifier"
✓ Voir le formulaire d'édition
✓ Tous les champs sont pré-remplis avec les valeurs actuelles
✓ Un bouton "✓ Enregistrer" est présent
✓ Un bouton "✕ Annuler" est présent
```

**Étape 3: Modifier les données**
```
✓ Changer le nom: "Dracaufeu" → "Mega Dracaufeu"
✓ Changer le type: "Fire" → "Fire/Flying"
✓ Changer la taille: "170" → "180"
✓ Cliquer "✓ Enregistrer"
```

**Étape 4: Vérifier les modifications**
```
✓ La page détails se met à jour
✓ Affiche les nouvelles valeurs
✓ Cliquer "Retour" puis re-cliquer sur le Pokémon
✓ Les modifications sont persistées
```

**Étape 5: Tester Annuler**
```
✓ Cliquer "✏️ Modifier"
✓ Changer les données
✓ Cliquer "✕ Annuler"
✓ Les changements ne sont PAS enregistrés
✓ Les anciennes valeurs sont affichées
```

---

### 6️⃣ Test: Supprimer avec Modale

**Étape 1: Accéder au bouton supprimer**
```
✓ Sur la page détails d'un Pokémon custom
✓ Le bouton "🗑️ Supprimer" est visible
```

**Étape 2: Cliquer sur Supprimer**
```
✓ Une modale s'affiche avec fond semi-transparent
✓ Titre: "⚠️ Supprimer un Pokémon"
✓ Message: "Êtes-vous sûr de vouloir supprimer [nom] ?"
✓ Avertissement rouge: "Cette action est irréversible..."
✓ Deux boutons: "Oui, supprimer" (rouge) et "Non, conserver" (bleu)
```

**Étape 3: Tester "Non, conserver"**
```
✓ Cliquer "Non, conserver"
✓ La modale se ferme
✓ La page détails reste affichée
✓ Le Pokémon n'est PAS supprimé
```

**Étape 4: Tester "Oui, supprimer"**
```
✓ Cliquer "🗑️ Supprimer" à nouveau
✓ Cliquer "Oui, supprimer"
✓ La modale se ferme
✓ La vue revient à la liste automatiquement
✓ Le Pokémon n'apparaît plus en "Mes Pokémon Personnalisés"
✓ Le nombre de Pokémon personnalisés diminue
```

---

### 7️⃣ Test: Section Pokémon Personnalisés

**Étape 1: Créer 3 Pokémon**
```
✓ Ajouter "Dracaufeu" (Type: Fire)
✓ Ajouter "Blastoise" (Type: Water)
✓ Ajouter "Florizarre" (Type: Grass)
✓ Revenir à la liste
```

**Étape 2: Vérifier la section**
```
✓ Section "Mes Pokémon Personnalisés (3)" en haut
✓ Les 3 Pokémon créés sont affichés
✓ Badges "Personnalisé" visibles sur les cartes
✓ Affichage séparé de "Pokémon du Pokédex"
```

**Étape 3: Tester la recherche sur custom**
```
✓ Taper "draca" dans la barre
✓ Seul "Dracaufeu" s'affiche dans section custom
✓ Aucun Pokémon du Pokédex n'apparaît
✓ Vider la recherche
```

**Étape 4: Supprimer un Pokémon**
```
✓ Cliquer sur "Dracaufeu"
✓ Supprimer via modale
✓ Revenir à la liste
✓ Section indique "(2)" au lieu de "(3)"
✓ "Dracaufeu" n'apparaît plus
```

---

### 8️⃣ Test: Responsive Design

**Sur Mobile (< 480px)**
```
✓ Grid affiche 1-2 colonnes de cartes
✓ Barre de recherche remplit la largeur
✓ Boutons "Ajouter" remplit la largeur
✓ Boutons pagination empilés verticalement
✓ Formulaire sur une seule colonne
✓ Images redimensionnées
```

**Sur Tablette (480-768px)**
```
✓ Grid affiche 3 colonnes
✓ Layout reste lisible
✓ Boutons bien dimensionnés
✓ Formulaire reste utilisable
```

**Sur Desktop (> 768px)**
```
✓ Grid affiche 4+ colonnes
✓ Layout optimal
✓ Tout est confortable à lire
```

---

### 9️⃣ Test: Pokémon de l'API

**Étape 1: Vérifier les données de l'API**
```
✓ Cliquer sur un Pokémon de la liste (ex: Salameche)
✓ Page détails affiche:
  - ID: #4
  - Taille: 0.6 m
  - Poids: 8.5 kg
  - Types: Fire (couleur orange)
  - Capacités: Blaze, Flash Fire
  - Statistiques: HP, Attaque, Défense, etc.
```

**Étape 2: Vérifier les boutons**
```
✓ Les boutons "Modifier" et "Supprimer" ne sont PAS visibles
✓ (Ces boutons existent uniquement pour Pokémon custom)
✓ Le bouton "Retour" est présent et fonctionnel
```

---

## 🎬 Scénario Complet d'Utilisation

1. **Affichage initial** → Liste de 20 Pokémon, page 1/5
2. **Recherche** → Taper "ditto", affiche 1 résultat
3. **Clic détails** → Voir infos complètes de Ditto
4. **Retour** → Revenir à la liste avec la recherche active
5. **Effacer recherche** → Revenir aux 20 premiers
6. **Ajouter** → Créer "Mewtwo custom"
7. **Voir section custom** → "Mes Pokémon (1)" visible
8. **Détails custom** → Cliquer sur Mewtwo custom
9. **Modifier** → Changer description
10. **Enregistrer** → Modifications persistées
11. **Supprimer** → Confirmer la suppression
12. **Vérifier** → Mewtwo disparu de la section

---

## 🐛 Bugs à Vérifier (ou à ne pas trouver!)

- [ ] Les images cassées affichent un placeholder
- [ ] La pagination fonctionne correctement avec recherche
- [ ] Les messages d'erreur disparaissent à la modification
- [ ] La modale ne peut pas être validée en dehors du clic
- [ ] Le localStorage n'est pas utilisé (données perdues au rafraîchissement)
- [ ] Les Pokémon de l'API ne peuvent pas être modifiés/supprimés

---

## 📊 Données de Test Recommandées

### Pokémon Simples (API)
```javascript
Pikachu (#25)    - Type: Electric
Ditto (#132)     - Type: Normal (facile à trouver)
Charizard (#6)   - Type: Fire/Flying
```

### Pokémon Personnalisés à Créer
```javascript
{
  name: "Dracaufeu Custom",
  type: "Fire",
  height: 170,
  weight: 905,
  description: "Mon Pokémon personnalisé puissant",
  image: "https://..."
}

{
  name: "Blastoise Custom",
  type: "Water",
  height: 160,
  weight: 855,
  description: "Un Pokémon d'eau impressionnant",
  image: "https://..."
}
```

---

## ✅ Checklist de Vérification

- [ ] Pagination fonctionne (20 par 20)
- [ ] Recherche fonctionne en temps réel
- [ ] Clic sur carte affiche les détails
- [ ] Page détails affiche toutes les infos
- [ ] Bouton "Retour" fonctionne
- [ ] Formulaire d'ajout valide les entrées
- [ ] Pokémon créés apparaissent en section custom
- [ ] Modification des Pokémon custom fonctionne
- [ ] Modale de suppression s'affiche
- [ ] Suppression fonctionne
- [ ] Responsive design s'adapte
- [ ] Pas d'erreurs dans la console

---

**Bon test ! 🧪**
