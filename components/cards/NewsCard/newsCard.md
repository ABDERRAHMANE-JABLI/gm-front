#  NewsCard Component

---

## Structure du composant

Le composant `NewsCard` reçoit un objet de type `NewsCardProps` (voir `/types/News.ts`), qui contient toutes les données nécessaires (titre, slug, imageId, etc.).

### 1. **SmartImage**

On utilise le composant `SmartImage` pour afficher l'image, avec `id`, `alt`, `width`, `height` et `fit=cover`.

---

## Fonctions utilitaires

### `hrefButton(kind: string, slug: string): string`

Gère dynamiquement le lien à appliquer sur le bouton ou la carte en fonction du type de blog.

* `kind = "chef"` ➜ `/chefs/{slug}`
* `kind = "restaurant"` ➜ `/restaurants/{slug}`
* sinon ➜ `/blogs/{slug}`


### `captionButton(kind: string): string`

Retourne un texte adapté à afficher sur le bouton en fonction du type :

* `chef` ---> "Voir le chef"
* `restaurant` --> "Voir le restaurant"
* `blog` ---> "Lire l'article"

---

## Exemple d'utilisation

```tsx
{NewsCardData.map((data) => (
              <div key={data.id}>
                <NewsCard lang={data} news={card} />
              </div>
))}
```

## Props  : WithHeader
pour réutiliser cet composant dans la premier page, on doit affecté la valeur true au props withHeader : 

### Exemple d'utilisation

```tsx
<div className='infinite-hits-container'>
            
            {NewsCardHeaderData.map((data) => (
              <div key={card.id}>
                <NewsCard lang={lang} news={data} withHeader={true} />
              </div>
            ))}

</div>
```

### Exemple de L'objet NewsCardData

```tsx
export const NewsCardData: NewsCardProps[] = [
  {
    id: "id-cardheader3",
    title: "Découvrez notre sélection des meilleures adresses gastronomiques",
    resume: "Une plongée dans les tables les plus prestigieuses de la région, à travers un guide complet et savoureux.",
    slug: "meilleures-adresses-gastronomiques",
    theme: [],
    thumbId: "679d9d7a-b2e9-42d7-8709-9f4356066580",
    buttons: [],
  },
  {
    id: "c1",
    title: "Gault&Millau Tour Paris Île-de-France 2025",
    resume: "À l’occasion de la présentation du dernier guide consacré à la région… Olivier Nasti organise le tout premier Championnat du organise le tout premier Championnat du organiseOlivier Nasti organise le tout premier Championnat du organise le tout premier Championnat du organise",
    slug: "gm-tour-paris-idf-2025",
    theme: ["Les Cuisiniers de demain"],
    thumbId: "10238744-04ae-44e5-b377-98f267324da6",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef",
        text_line1: "Gérard Barbin",
        slug: "gerard-barbin",
      },
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef",
        text_line1: "Camille Saint-M'leux",
        slug: "camille-saint-mleux",
      },
    ],
  },
  {
    id: "c2",
    title: "Le Salon du BON avec Thierry Marx : l’événement food à saisir à prix réduit",
    resume: "Jusqu’au 30 septembre 2025, le Salon du BON propose des billets à -20%. Une bonne occasion de se faire plaisir à prix réduit.",
    slug: "le-salon-du-bon-avec-thierry-marx-l-evenement-food-a-saisir-a-prix-reduit",
    theme: ["Actus & Rendez-vous"],
    thumbId: "cecc7f56-8d8d-4a21-ad76-8cbc12a270d7",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.RESTAURANT,
        label: "Restaurant",
        text_line1: "LA TABLE D’OLIVIER NASTI",
        text_line2: "68240 KAYSERSBERG",
        slug: "la-table-d-olivier-nasti",
      },
    ],
  },
  {
    id: "c6",
    title: "Gault&Millau Tour Paris Île-de-France 2025",
    resume: "À l’occasion de la présentation du dernier guide consacré à la région… Olivier Nasti organise le tout premier Championnat du organise le tout premier Championnat du organiseOlivier Nasti organise le tout premier Championnat du organise le tout premier Championnat du organise",
    slug: "gm-tour-paris-idf-2025",
    theme: ["Les Cuisiniers de demain"],
    thumbId: "10238744-04ae-44e5-b377-98f267324da6",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef",
        text_line1: "Gérard Barbin",
        slug: "gerard-barbin",
      },
      {
        buttonKind: NewsCardButtonKind.RESTAURANT,
        label: "Restaurant",
        text_line1: "LA TABLE D’OLIVIER NASTI",
        text_line2: "68240 KAYSERSBERG",
        slug: "la-table-d-olivier-nasti",
      },
    ],
  },
];
```


---

## Localisation des fichiers

* Composant : `@/components/cards/NewsCard`
* CSS module : `@/components/cards/NewsCard/NewsCard.module.css`
* Types : `@/types/News.ts`
* Fonctions utilitaires : `@/lib/News.ts` 

---
