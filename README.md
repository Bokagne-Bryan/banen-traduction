# 🌍 Banen ↔ Français - Plateforme d'Apprentissage Linguistique

Une application web simple et efficace pour apprendre et traduire entre le Banen et le Français.

## 🎯 Fonctionnalités

✨ **Traduction Bidirectionnelle**
- Traduction Français → Banen
- Traduction Banen → Français
- Recherche instantanée dans le dictionnaire

📚 **Page d'Apprentissage**
- Affichage de tout le vocabulaire en cartes interactives
- Navigation fluide et intuitive
- Clic sur une carte pour voir la traduction

🎓 **Quiz Interactif**
- Questions générées automatiquement
- 4 réponses possibles par question
- Score en temps réel
- Animations fluides entre chaque question
- Résultat final avec pourcentage

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Design moderne avec animations fluides
- **JavaScript Vanilla** - Logique sans frameworks
- **JSON** - Stockage du dictionnaire

## 📁 Structure du Projet

```
banen-traduction/
├── index.html          # Page de traduction
├── apprendre.html      # Page d'apprentissage
├── quiz.html           # Page du quiz
│
├── css/
│   └── style.css       # Tous les styles et animations
│
├── js/
│   ├── script.js       # Logique principale (traduction, apprentissage)
│   └── quiz.js         # Logique du quiz
│
├── data/
│   └── dictionnaire.json   # Dictionnaire Banen/Français
│
├── audio/              # (Futur) Fichiers audio de prononciation
├── images/             # (Futur) Logo et images
└── README.md           # Documentation
```

## 🚀 Installation et Utilisation

### Méthode simple (Sans serveur)

1. Clonez le repository
```bash
git clone https://github.com/[votre-username]/banen-traduction.git
cd banen-traduction
```

2. Ouvrez `index.html` directement dans votre navigateur
```bash
# Ou ouvrez simplement le fichier
```

### Avec un serveur local (Optionnel)

```bash
# Avec Python 3
python -m http.server 8000

# Ou avec Node.js (http-server)
npx http-server

# Puis ouvrez http://localhost:8000
```

## 📖 Utilisation

### 1. Traduction
- Entrez un mot en français ou en banen
- Cliquez sur "Traduire" ou appuyez sur Entrée
- Obtenez la traduction instantanément

### 2. Apprentissage
- Consultez toutes les expressions du dictionnaire
- Cliquez sur une carte pour voir sa traduction
- Naviguez facilement entre les pages

### 3. Quiz
- Répondez aux questions de traduction
- Le score s'actualise en temps réel
- Passez automatiquement à la question suivante
- Consultez votre résultat final avec pourcentage

## 📊 Ajouter des mots au dictionnaire

Éditez le fichier `data/dictionnaire.json` :

```json
[
  { "fr": "bonjour", "banen": "Neni" },
  { "fr": "merci", "banen": "tɔ̀ŋ" },
  { "fr": "je vous salut", "banen": "mi nà penou holli" },
  ...
]
```

Les nouvelles entrées apparaissent automatiquement dans la traduction, l'apprentissage et le quiz.

## ✨ Animations et Design

- ✅ Animations fluides entre les questions du quiz
- ✅ Design responsif (mobile, tablette, desktop)
- ✅ Couleurs harmonieuses et professionnelles
- ✅ Transitions smooth et boutons interactifs
- ✅ Feedback immédiat des réponses

## 🎨 Personnalisation

Modifiez les couleurs dans `css/style.css` :
- Couleur primaire : `#2c7a7b`
- Couleur secondaire : `#1a4d4e`
- Couleur succès : `#28a745`

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Mobile et Desktop
- ✅ Tous les navigateurs modernes

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à :
- Ajouter des mots au dictionnaire
- Améliorer le design
- Ajouter de nouvelles fonctionnalités

## 📝 License

Ce projet est open source sous la license MIT.

## 👤 Auteur

Créé avec ❤️ pour l'apprentissage du Banen

---

**Besoin d'aide ?** Consultez la documentation ou créez une issue sur GitHub.
