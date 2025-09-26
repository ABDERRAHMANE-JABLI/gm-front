# RestaurantCard

## Champs nécessaires pour RestaurantCard
| Champ               | Type    | Optionnel   | Description |
|---------------------|---------|-------------|-------------|
| title               | string  | Non         | Nom du restaurant |
| slug                | string  | Non         | Slug du restaurant |
| nbToques            | int     | Non         | -1 = sponsorisé / 6 = toques d'or |
| note                | string  | Oui         | Note |
| noteDescription     | string  | Oui         | Table de prestige ... ou Sponsorisé |
| thumbId             | string  | Oui         | Id image miniature (666x444 fit=cover)|
| openingPeriods      | array   | Oui         | horaires d'ouvertures voir ci-dessous
| address             | string  | Oui         | Adresse du restaurant |
| chief               | string  | Oui         | Nom du chef |
| cuisines            | array   | Oui         | Types de cuisine voir ci-dessous |
| budget              | string  | Oui         | Texte prix |
| supportfavorite     | bool    | Non         | permet l'affichage de l'icône coeur |
| distance            | string  | Oui         | affiche la distance en km si la donnée est fournie, fonctionne avec 'Autour de moi' activé |


## /components/restaurantCard/index.tsx

### Le composant prend 2 props :  <RestaurantCard lang={lang}  restaurant={data}/>

lang: 'fr' | 'en' et restaurant: RestaurantProps.

```
{
  title: "La piscine",
  slug: "le-gourmet-parisien",
  nbToques: -1,
  noteDescription:"table de prestige",
  thumbId: "e9c5ea4c-ebe4-46c8-998f-49b37349cf96", 
  openingPeriods: {
    monday: [
      { begin: "12:00", end: "14:00" },
      { begin: "18:00", end: "22:00" }
    ],
    tuesday: [
      { begin: "12:00", end: "14:00" },
      { begin: "18:00", end: "22:00" }
    ],
    wednesday: [
      { begin: "12:00", end: "14:00" },
      { begin: "16:00", end: "22:00" }
    ],
    thursday: [
      { begin: "12:00", end: "14:00" },
      { begin: "19:00", end: "22:00" }
    ],
    friday: [
      { begin: "12:00", end: "14:00" },
      { begin: "19:00", end: "00:00" }
    ],
    saturday: [
      { begin: "12:00", end: "14:00" },
      { begin: "19:00", end: "00:00" }
    ],
    sunday: [] // Fermé
  },
  address: "75018 Paris",
  cuisines: ["Dessert", "Français"],
  distance:"10 km"
}
```

### Les toques sont rendues via /common/toques/index.tsx selon nbToques :

6 :  toques gold

0 :  Sélectionné

1..5 :  toques simples

-1 : Sponsorisé

### Le badge Ouverts s'appuie sur le parametre openingPeriods de l'objet restaurant 

### Pour définir les heures d'ouverture : /utils/openningHours (la fonction : isOpenNow)