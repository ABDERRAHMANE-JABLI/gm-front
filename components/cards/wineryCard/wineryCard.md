# WineryCard (Domaine)


## Champs nécessaires pour WineryCard

| Champ                   | Type        | Optionnel | Origine / Description |
|-------------------------|-------------|-----------|----------------------|
| title                   | string      | Non       | Nom du domaine |
| slug                    | string      | Non       | Slug du domaine |
| isGmSelected            | bool        | Non       | false = 'Sponsorisé' |
| producerCategory        | string      | Non       | wine, champagne  (permet l'affichage de la petite icône à côté du title)|
| thumbId                 | string      | Oui       | Id image miniature (666x444 fit=cover)|
| openingPeriods          | array       | Oui       | horaires d'ouvertures voir ci-dessous |
| address                 | string      | Oui       | Adresse du domaine |
| productions             | array       | Oui       | types de production |
| services                | array       | Oui       | Service |
| distance                | string      | Oui       | affiche la distance en km si la donnée est fournie, fonctionne avec 'Autour de moi' activé |


Le composant WineryCard prend deux parametres : `lang`: 'fr' | 'en' et `Winery`: WineryProps

### Le contenu de l'objet Winery : 

```tsx

// voir le fichier @/types/Winery.ts :


import { OpeningPeriods } from "@/types/Time";

export enum ProductKind {
    WINE = 'wine',
    CHAMPAGNE = 'champagne',
}

export interface WineryProps {
  
    title: string;
    
    slug: string;
    
    isGmSelected: boolean;

    producerCategory?: ProductKind;
    
    thumbId?: string;  // par defaut : "07df5907-c383-48a9-910f-8b78ce49852d"
    
    openingPeriods?: OpeningPeriods;
    
    address?: string;

    productions?: string[];
 
    services?: string[];

    distance?: string;
}

```

### exemple d'utilisation du composant WineryCard : 

```tsx
{WineriesData.map((data, index) => (
            <WineryCard key={`winery-${index}`} Winery={data} lang={lang} />
))}

```



