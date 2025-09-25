# Analyse de la carte HotelCard

## Champs nécessaires pour HotelCard

| Champ                   | Type        | Optionnel | Origine / Description |
|-------------------------|-------------|-----------|-----------------------|
| title                   | string      | Non       | Nom hôtel |
| slug                    | string      | Non       | Slug hôtel |
| isGmSelected            | bool        | Non       | false = 'Sponsorisé' |
| nbStars                 | int         | Non       | nombre d'étoiles 0 = 'Sélectionné' |
| nbStarsDescription      | string      | Non       | 'hors classement, hôtel remarquable' |
| restaurantNbtoques      | int         | Oui       | nombre de toque du meilleur restaurant lié à l'hôtel |
| thumbId                 | string      | Oui       | Id image miniature (666x444 fit=cover)|
| openingPeriods          | array       | Oui       | horaires d'ouvertures voir ci-dessous |
| address                 | string      | Oui       | Adresse hôtel |
| services                | array       | Oui       | Services de l'hôtel voir ci-dessous |
| budget                  | string      | Oui       | Texte prix |
| supportfavorite         | bool        | Non       | permet l'affichage de l'icône coeur |
| distance                | string      | Oui       | affiche la distance en km si la donnée est fournie, fonctionne avec 'Autour de moi' activé |


## /components/cards/restaurantCard/index.tsx

### Structure du composant :  

Le composant RestaurantCard prend deux Props : `lang`: 'fr' | 'en' et `Hotel`: HotelProps.


## Le contenu de l'objet Hotel : 

```tsx
import { HotelProps } from "@/types/Hotels";


export const hotelData: HotelProps[] = [{
  title: "Hôtel Georges blanc",
  slug: "hotel-Georges-blanc",
  isGmSelected: true,
  nbStars: 5,
  nbStarsDescription: "Hôtel d'exception'",
  restaurantNbtoques: 6,
  thumbId: "6c7906d9-3ab7-434d-90e1-4d1f7f3bd98b",
  openingPeriods: {
    monday:    [{ begin: "00:00", end: "23:59" }],
    tuesday:   [{ begin: "00:00", end: "23:59" }],
    wednesday: [{ begin: "00:00", end: "23:59" }],
    thursday:  [{ begin: "00:00", end: "23:59" }],
    friday:    [{ begin: "00:00", end: "23:59" }],
    saturday:  [{ begin: "00:00", end: "23:59" }],
    sunday:    [{ begin: "00:00", end: "23:59" }]
  },
  address: "01540 Vonnas",
  services: ["Accès handicapés", "Animaux acceptés", "Restauration sur place"],
  budget: "180€",
  supportfavorite: true,
},
{
  ... etc
}
```

#### Exemple d'utilisation :

```tsx
<div className="infinite-hits-container mt-5">
    {hotelData.map((data, i) => (
        <HotelCard lang={lang}  Hotel={data} key={i}/>
      ))}
</div> 
```

## l'objet HotelData :

```tsx
import { HotelProps } from "@/types/Hotels";

export const hotelData: HotelProps[] = [{
  title: "Hôtel Georges blanc",
  slug: "hotel-Georges-blanc",
  isGmSelected: true,
  nbStars: 5,
  nbStarsDescription: "Hôtel d'exception'",
  restaurantNbtoques: 6,
  thumbId: "6c7906d9-3ab7-434d-90e1-4d1f7f3bd98b",
  openingPeriods: {
    monday:    [{ begin: "00:00", end: "23:59" }],
    tuesday:   [{ begin: "00:00", end: "23:59" }],
    wednesday: [{ begin: "00:00", end: "23:59" }],
    thursday:  [{ begin: "00:00", end: "23:59" }],
    friday:    [{ begin: "00:00", end: "23:59" }],
    saturday:  [{ begin: "00:00", end: "23:59" }],
    sunday:    [{ begin: "00:00", end: "23:59" }]
  },
  address: "01540 Vonnas",
  services: ["Accès handicapés", "Animaux acceptés", "Restauration sur place"],
  budget: "180€",
  supportfavorite: true,
},
{
  ... etc
}

```
### Les toques sont rendues via /common/toques/index.tsx selon restaurantNbtoques :

`6 :  toques gold`

`0 :  Sélectionné`

`1..5 :  toques simples`

`-1 : Sponsorisé`


## Le composant Toques et son Props withDescription : 

 --->  et pour utiliser le composant dans la carte Hotel il faut affecté la valeur false au props WithDescription : 

 ```tsx
 <Toques nbToques={Hotel.restaurantNbToques} withDescription={false} />
 ```

## Le composant Stars : 

 --->  le composant Stars peut etre utilisé dans plusieurs composant, il prend comme parametre : 

`1 -- 5 : stars`

`0 :  Sélectionné`

`-1 : Sponsorisé`


 ```tsx
 <Stars nbStars={4} description={"Hotel de Prestige"}/>
 ```


## Localisation des fichiers

* Composant : `@/components/cards/HotelCard`
* CSS module : `@/components/cards/HotelCard/HotelCard.module.css`
* Types : `@/types/Hotel.ts`
* composant Toques : `@/components/common/Toques`
* composant Stars : `@/components/common/Stars`
* Fonctions utilitaires : `@/utils/openingHour.ts`


