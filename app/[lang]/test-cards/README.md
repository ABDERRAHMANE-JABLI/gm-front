# 🎨 Page de Test des Composants Cards

## Description

Cette page de test a été créée pour visualiser et tester tous les composants de cartes (cards) utilisés dans l'application Gault&Millau. Elle permet aux développeurs de voir rapidement l'apparence et le comportement de chaque type de carte avec des données mockées.

## 🌐 Accès à la page

### En local
- Français : `http://fr.gm.wip:3000/fr/test-cards`
- Anglais : `http://fr.gm.wip:3000/en/test-cards`

### En production
- `https://fr.gaultmillau.com/fr/test-cards`
- `https://us.gaultmillau.com/en/test-cards`

## 📋 Composants testés

### ✅ Composants complètement implémentés
1. **RestaurantCard** - Cartes de restaurants
2. **HotelCard** - Cartes d'hôtels
3. **ArtisanCard** - Cartes d'artisans
4. **PeopleCard** - Cartes de personnes (chefs, etc.)
5. **NewsCard** - Cartes d'actualités (standard)
6. **NewsSecondCard** - Cartes d'actualités (variante 2)
7. **SingleNewsCard** - Cartes d'actualités "Une" (large)
8. **WineryCard** - Cartes de vignerons/caves

### ⚠️ Composants en attente d'implémentation
Les composants suivants affichent un placeholder par défaut :
- **RecipeCard** - Cartes de recettes
- **ThePlaceCard** - Cartes de lieux
- **ChampagneCard** - Cartes de champagnes
- **WineCard** - Cartes de vins
- **WhiskyCard** - Cartes de whiskies
- **CognacCard** - Cartes de cognacs
- **ArmagnacCard** - Cartes d'armagnacs
- **CalvadosCard** - Cartes de calvados
- **RumCard** - Cartes de rhums

## 📁 Structure des fichiers

```
app/[lang]/test-cards/
├── page.tsx              # Page principale de test
├── styles.module.css     # Styles spécifiques à la page
└── README.md            # Cette documentation

mocks/
├── RestaurantData.ts    # ✅ Déjà existant
├── HotelsData.ts        # ✅ Déjà existant
├── ArtisanData.ts       # ✅ Déjà existant
├── Peoples.ts           # ✅ Déjà existant
├── NewsData.ts          # ✅ Déjà existant
├── WineriesData.ts      # 🆕 Nouvellement créé
├── RecipesData.ts       # 🆕 Nouvellement créé
├── PlacesData.ts        # 🆕 Nouvellement créé
└── SpiritsData.ts       # 🆕 Nouvellement créé
```

## 🔧 Utilisation pour les développeurs

### Tester une carte spécifique
1. Accédez à la page `/test-cards`
2. Faites défiler jusqu'à la section de la carte souhaitée
3. Visualisez les différentes variantes avec des données mockées

### Ajouter un nouveau mock
1. Créez ou modifiez le fichier dans `/mocks/`
2. Importez les données dans `app/[lang]/test-cards/page.tsx`
3. Ajoutez une nouvelle section dans la page

### Modifier une carte existante
1. Modifiez le composant dans `/components/cards/`
2. Rechargez la page de test pour voir les changements
3. Vérifiez que toutes les variantes s'affichent correctement

## 📝 Données mockées

### Structure des mocks

Chaque fichier mock contient des données représentatives pour tester différents cas :
- **Cas nominal** : données complètes et valides
- **Cas minimaux** : données avec champs optionnels absents
- **Cas particuliers** : sponsors, fermetures, distances, etc.

### Exemples de données

#### RestaurantData
- Restaurants avec différents nombres de toques (1-6)
- Restaurants sponsorisés (nbToques: -1)
- Avec/sans horaires d'ouverture
- Avec/sans distance

#### HotelsData
- Hôtels avec différents nombres d'étoiles (1-5)
- Avec/sans restaurant associé
- Avec/sans services spécifiques

#### WineriesData
- Vignerons de vin (ProductKind.WINE)
- Producteurs de champagne (ProductKind.CHAMPAGNE)
- Avec différents types de productions

## 🎨 Personnalisation des styles

Les styles de la page de test sont définis dans `styles.module.css` et incluent :
- Grille responsive pour les cartes
- Sections thématiques colorées
- Badges de comptage
- Boxes d'information pour les composants non implémentés
- Design adaptatif mobile

## 🚀 Prochaines étapes

### Pour compléter les composants manquants :

1. **RecipeCard**
   - Définir l'interface dans `components/cards/types.ts`
   - Implémenter le composant
   - Enrichir les mocks avec plus de données

2. **ThePlaceCard**
   - Définir l'interface
   - Implémenter le composant
   - Ajouter des images et descriptions

3. **Product Cards** (Champagne, Wine, etc.)
   - Définir les interfaces communes
   - Implémenter les composants avec style cohérent
   - Créer des variantes par type de produit

## 💡 Conseils

- **Performance** : La page charge beaucoup de composants. Utilisez-la en développement uniquement.
- **Images** : Les `thumbId` pointent vers des images réelles via SmartImage.
- **Responsive** : Testez sur différentes tailles d'écran (mobile, tablette, desktop).
- **Accessibilité** : Vérifiez les aria-labels et la navigation au clavier.

## 🐛 Déboguer

Si un composant ne s'affiche pas correctement :
1. Vérifiez la console du navigateur pour les erreurs
2. Vérifiez que les données mock correspondent à l'interface attendue
3. Vérifiez les imports dans `page.tsx`
4. Vérifiez que les styles CSS des composants sont bien chargés

## 📞 Support

Pour toute question ou problème concernant cette page de test :
- Consultez la documentation des composants individuels dans `/components/cards/`
- Vérifiez les types dans `/components/cards/types.ts`
- Contactez l'équipe de développement

---

**Dernière mise à jour** : Octobre 2025  
**Version** : 1.0.0
