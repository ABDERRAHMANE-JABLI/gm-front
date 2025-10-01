# 📊 CARDS TESTING - Guide Complet

## 🎯 Résumé de l'implémentation

Une page de test complète a été créée pour visualiser et tester tous les composants de cartes de l'application Gault&Millau.

## 📦 Fichiers créés

### 1. Page de test principale
- **`app/[lang]/test-cards/page.tsx`** - Page de test avec tous les composants
- **`app/[lang]/test-cards/styles.module.css`** - Styles pour la page de test
- **`app/[lang]/test-cards/README.md`** - Documentation détaillée

### 2. Nouveaux fichiers mock
- **`mocks/WineriesData.ts`** - 4 vignerons/caves mockés (vin + champagne)
- **`mocks/RecipesData.ts`** - 4 recettes mockées
- **`mocks/PlacesData.ts`** - 3 lieux mockés (marchés)
- **`mocks/SpiritsData.ts`** - 12 spiritueux mockés (champagne, vin, whisky, cognac, armagnac, calvados, rhum)
- **`mocks/index.ts`** - Export centralisé de tous les mocks

### 3. Documentation mise à jour
- **`README.md`** - Ajout d'une section sur la page de test

## 🌐 Accès à la page de test

### En développement local
```bash
npm run local
```

Puis accédez à :
- Français : http://fr.gm.wip:3000/fr/test-cards
- Anglais : http://fr.gm.wip:3000/en/test-cards

## 📋 Composants testés

### ✅ Composants fonctionnels (8)
1. **RestaurantCard** - Cartes de restaurants (4 variantes affichées)
2. **HotelCard** - Cartes d'hôtels (4 variantes affichées)
3. **ArtisanCard** - Cartes d'artisans (4 variantes affichées)
4. **PeopleCard** - Cartes de personnes/chefs (4 variantes affichées)
5. **NewsCard** - Cartes d'actualités standard (4 variantes affichées)
6. **NewsSecondCard** - Cartes d'actualités variante 2 (2 variantes affichées)
7. **SingleNewsCard** - Carte d'actualité "Une" large (1 variante affichée)
8. **WineryCard** - Cartes de vignerons (4 variantes affichées)

### ⚠️ Composants à implémenter (9)
Ces composants affichent un placeholder en attendant leur implémentation :
- **RecipeCard** - Cartes de recettes
- **ThePlaceCard** - Cartes de lieux
- **ChampagneCard** - Cartes de champagnes
- **WineCard** - Cartes de vins
- **WhiskyCard** - Cartes de whiskies
- **CognacCard** - Cartes de cognacs
- **ArmagnacCard** - Cartes d'armagnacs
- **CalvadosCard** - Cartes de calvados
- **RumCard** - Cartes de rhums

## 📊 Statistiques des mocks

| Type | Nombre | Fichier source |
|------|--------|----------------|
| Restaurants | 6+ | `mocks/RestaurantData.ts` |
| Hôtels | 4 | `mocks/HotelsData.ts` |
| Artisans | 9+ | `mocks/ArtisanData.ts` |
| People | 4 | `mocks/Peoples.ts` |
| News | 7+ | `mocks/NewsData.ts` |
| Vignerons | 4 | `mocks/WineriesData.ts` ⭐ |
| Recettes | 4 | `mocks/RecipesData.ts` ⭐ |
| Lieux | 3 | `mocks/PlacesData.ts` ⭐ |
| Champagnes | 2 | `mocks/SpiritsData.ts` ⭐ |
| Vins | 2 | `mocks/SpiritsData.ts` ⭐ |
| Whiskies | 2 | `mocks/SpiritsData.ts` ⭐ |
| Cognacs | 2 | `mocks/SpiritsData.ts` ⭐ |
| Armagnacs | 1 | `mocks/SpiritsData.ts` ⭐ |
| Calvados | 1 | `mocks/SpiritsData.ts` ⭐ |
| Rhums | 2 | `mocks/SpiritsData.ts` ⭐ |

⭐ = Nouvellement créé

**Total : 44+ données mockées**

## 🎨 Caractéristiques de la page

### Design
- ✅ Interface moderne avec dégradé de fond
- ✅ En-tête informatif avec titre et description
- ✅ Sections organisées par type de carte
- ✅ Badges de comptage pour chaque section
- ✅ Boxes d'information pour les composants non implémentés
- ✅ Grille responsive (1, 2 ou 3 colonnes selon l'écran)
- ✅ Effet hover sur les cartes
- ✅ Footer informatif

### Responsive
- ✅ Desktop : 3 colonnes
- ✅ Tablette : 2 colonnes
- ✅ Mobile : 1 colonne
- ✅ Adaptation automatique des espacements

### Accessibilité
- ✅ Structure HTML sémantique
- ✅ Contraste des couleurs respecté
- ✅ Navigation au clavier possible
- ✅ Labels descriptifs

## 🔧 Utilisation pour les développeurs

### Tester une modification
1. Modifier un composant dans `components/cards/`
2. Sauvegarder (hot reload automatique)
3. Vérifier visuellement sur la page de test

### Ajouter de nouvelles données mock
```typescript
// Dans le fichier mock approprié
export const NewData = [{
  title: "Exemple",
  slug: "exemple",
  // ... autres propriétés
}];
```

### Ajouter une nouvelle section de test
```tsx
// Dans app/[lang]/test-cards/page.tsx
<section className={styles.section}>
  <h2 className={styles.sectionTitle}>
    🆕 Nouveau Type
    <span className={styles.badge}>{NewData.length}</span>
  </h2>
  <div className={styles.cardsGrid}>
    {NewData.map((item, index) => (
      <div key={`new-${index}`} className={styles.cardWrapper}>
        <NewCard {...item} />
      </div>
    ))}
  </div>
</section>
```

## 📝 Données mockées - Exemples

### RestaurantCard
- Restaurants avec 1 à 6 toques
- Restaurants sponsorisés (nbToques: -1)
- Avec/sans horaires d'ouverture
- Avec/sans distance
- Différents types de cuisine
- Différentes gammes de prix

### HotelCard
- Hôtels 1 à 5 étoiles
- Avec/sans restaurant associé
- Avec/sans services
- Ouverts 24h/24
- Avec/sans distance

### WineryCard
- Vignerons de vin (ProductKind.WINE)
- Producteurs de champagne (ProductKind.CHAMPAGNE)
- Sélectionnés GM ou sponsorisés
- Différentes productions
- Différents services

## 🚀 Prochaines étapes recommandées

### Court terme
1. ✅ **Implémenter RecipeCard**
   - Définir l'interface dans `components/cards/types.ts`
   - Créer le composant avec design cohérent
   - Utiliser les données de `RecipesData.ts`

2. ✅ **Implémenter ThePlaceCard**
   - Définir l'interface
   - Créer le composant
   - Utiliser les données de `PlacesData.ts`

### Moyen terme
3. ✅ **Implémenter les Product Cards**
   - Créer une interface commune `ProductProps`
   - Implémenter ChampagneCard, WineCard, etc.
   - Réutiliser les données de `SpiritsData.ts`
   - Créer un style cohérent pour tous les spiritueux

### Long terme
4. ✅ **Tests automatisés**
   - Ajouter des tests unitaires pour chaque carte
   - Tests de snapshot pour détecter les régressions visuelles
   - Tests d'accessibilité

5. ✅ **Storybook**
   - Migrer les mocks vers Storybook
   - Créer des stories pour chaque variante
   - Documenter les props de chaque composant

## 💡 Conseils d'utilisation

### Pour les développeurs
- Utilisez cette page lors du développement de nouveaux composants
- Testez les cas limites (données manquantes, textes longs, etc.)
- Vérifiez le responsive sur différents écrans
- Testez la navigation au clavier

### Pour les designers
- Utilisez cette page pour valider les designs
- Comparez avec les maquettes Figma
- Vérifiez la cohérence visuelle entre les différents types de cartes
- Testez les états hover et focus

### Pour les QA
- Utilisez cette page comme référence pour les tests visuels
- Vérifiez que toutes les cartes affichent correctement leurs données
- Testez les liens et la navigation
- Vérifiez l'accessibilité (contraste, labels, etc.)

## 🐛 Résolution de problèmes

### Une carte ne s'affiche pas
1. Vérifier la console du navigateur
2. Vérifier l'import du composant dans `page.tsx`
3. Vérifier que les données mock correspondent au type attendu
4. Vérifier les fichiers CSS du composant

### Les images ne s'affichent pas
- Les `thumbId` doivent pointer vers des images valides
- Le composant `SmartImage` doit être correctement configuré
- Vérifier la connexion au service d'images

### Erreurs TypeScript
- Vérifier que les interfaces sont bien définies dans `types.ts`
- Vérifier que les données mock correspondent aux interfaces
- Lancer `npm run build` pour voir toutes les erreurs

## 📞 Support

Pour toute question :
1. Consulter la documentation dans `app/[lang]/test-cards/README.md`
2. Consulter les types dans `components/cards/types.ts`
3. Vérifier les mocks dans `mocks/`
4. Contacter l'équipe de développement

---

**Date de création** : Octobre 2025  
**Version** : 1.0.0  
**Statut** : ✅ Production Ready pour les tests
