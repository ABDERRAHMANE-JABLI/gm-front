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


## /components/cards/restaurantCard/index.tsx

### Structure du composant :  

Le composant RestaurantCard prend deux Props : `lang`: 'fr' | 'en' et `restaurant`: RestaurantProps.


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

`6 :  toques gold`

`0 :  Sélectionné`

`1..5 :  toques simples`

`-1 : Sponsorisé`

### Le badge Ouverts s'appuie sur le parametre openingPeriods de l'objet restaurant 

### Pour définir les heures d'ouverture : dans le dossier /utils/openningHours on a la fonction :  isOpenNow(openingPeriods)

```tsx
const isOpen = isOpenNow(restaurant.openingPeriods);

```

## Le composant Toques et son Props withDescription : 

le composant `<Toques/>` est utilisé dans plusieurs pages et composant : (Hotel, Restaurant ....)

```tsx
export default function Toques({ nbToques, note, description, withDescription=true}: ToquesProps) {
  if (nbToques === 0)
    return (
        <div className="notation">
          <div className="toques">
            <div className="toque-wrapper">
              <span>Sélectionné</span>
            </div>
          </div>
        </div>
    );

  if (nbToques === -1)
    return (
      <div className="notation">
        <div className="toques sponsored"><div className="toque-wrapper"><span>Sponsorisé</span></div></div>
      </div>
    );

  if (nbToques === 6)
    return (
      <div className="notation">
        <div className="toques gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="toque-wrapper" key={i}><GoldToque /></div>
            ))}
            </div>
          {withDescription && (<span className="descriptionGold">Membre de l&apos;Académie<br />Gault&amp;Millau</span>)}
      </div>
    );

  if (nbToques > 0 && nbToques <= 5)
    return (
      <div className="notation">
        <div className="toques">
          {Array.from({ length: nbToques }).map((_, i) => (
            <div className="toque-wrapper" key={i}><NormalToque /></div>
          ))}
        </div>
        <div className="note-and-description">
          {note !== undefined && (
            <div className="note"><div className="text-wrapper">{note}</div><div className="element">/ 20</div></div>
          )}
          {description && <span className="description">{description}</span>}
        </div>
      </div>
    );

  return null;
}
```
dans la carte hotel si on a un restaurant avec 6 toques
 on doit afficher seulement les 5 toques Gold, sans la description (Membre de l'académie gaultMillau)
 --->  Utilisation dans La carte Restaurant : 
 
```tsx
<Toques nbToques={restaurant.nbToques} note={restaurant.note} description={restaurant.noteDescription}/>
```

 --->  et pour utiliser le composant dans carte Hotel il faut affecté la valeur false au props WithDescription : 

 ```tsx
 <Toques nbToques={Hotel.restaurantNbToques} withDescription={false} />
 ```

## Localisation des fichiers

* Composant : `@/components/cards/RestaurantCard`
* CSS module : `@/components/cards/RestaurantCard/RestaurantCard.module.css`
* Types : `@/types/Restaurant.ts`
* composant Toques : `@/components/common/Toques`
* Fonctions utilitaires : `@/utils/openingHour.ts`