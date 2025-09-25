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

### Le Composant prend 2 props :  

lang: 'fr' | 'en' et restaurant: RestaurantProps.


## Le contenu de l'objet Restaurant : 

```tsx
import { RestaurantProps } from "@/types/Restaurant";

export const RestaurantData: RestaurantProps[] = [{
  title: "Le Gourmet Parisien",
  slug: "le-gourmet-parisien",
  nbToques: 6,
  note:"19,5",
  noteDescription:"table de prestige",
  thumbId: "4763a23b-2508-4a51-9cae-53b4da465f87", 
  openingPeriods: {
    monday: [
      { begin: "12:00", end: "14:00" },
      { begin: "20:00", end: "22:00" }
    ],
    tuesday: [
      { begin: "12:00", end: "14:00" },
      { begin: "20:00", end: "22:00" }
    ],
    wednesday: [
      { begin: "12:00", end: "14:00" },
      { begin: "20:00", end: "22:00" }
    ],
    thursday: [
      { begin: "12:00", end: "14:00" },
      { begin: "20:00", end: "22:00" }
    ],
    friday: [
      { begin: "12:00", end: "14:00" },
      { begin: "20:00", end: "00:00" }
    ],
    saturday: [
      { begin: "12:00", end: "14:00" },
      { begin: "20:00", end: "00:00" }
    ],
    sunday: [] // Fermé
  },
  budget: "80€ - 100€",
  chief : "Alexandre Dumas",
  address: "10 Rue de Rivoli, 75001 Paris",
  cuisines: ["Français", "Moderne", "Fusion"],
},
{
  ... etc
}
```

#### Exemple d'utilisation :

```tsx
<div className="infinite-hits-container">
            {RestaurantData.map((data, i) => (
                <RestaurantCard lang={lang}  restaurant={data} key={i}/>
            ))}
</div>
```

### Les toques sont rendues via /common/toques/index.tsx selon nbToques :

6 :  toques gold

0 :  Sélectionné

1..5 :  toques simples

-1 : Sponsorisé

### Le badge Ouverts s'appuie sur le parametre openingPeriods de l'objet restaurant 

### Pour définir les heures d'ouverture : dans le dossier /utils/openningHours on a la fonction :  isOpenNow(openingPeriods)

```tsx
const isOpen = isOpenNow(restaurant.openingPeriods);

```