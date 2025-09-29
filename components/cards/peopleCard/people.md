
## Champs nécessaires pour People
* file : @/types/peoples.ts

| Champ                        | Type         | Optionnel | Origine / Description |
|------------------------------|-------------|-----------|----------------------|
| title                        | string      | Non       | Nom du chef |
| slug                         | string      | Non       | Slug du chef |
| thumbId                      | string      | Oui       | Id image miniature (666x444 fit=cover) |
| activity                     | array       | Oui       | Rôle principal de la personne (CHEF, CHEFFE, PATISSIER ...) |
| nbToques                     | Number      | Oui       | Nombre de toques Gault&Millau (-1 à 6) |
| notes                        | string      | Oui       | Note sur 20 exemple : "18,5" |
| noteDescription              | string      | Oui       | Texte explicatif comme "Table de prestige", "Sponsorisé", etc. |
| distinction                  | array       | Oui       | Prix, titre ou distinction obtenue, Ex : Cuisinier(ère) de l'Année |
| establishmentTitle           | string      | Oui       | Nom de l'établissement principal où travaille la personne ex: "La Grenouillère"|
| establishmentType           | string      | Oui       | Type de l'établissement principal |



## Structure du composant

Le composant `PeopleCard` reçoit un objet de type `PeopleCardProps` (voir `/types/Peoples.ts`), qui contient toutes les données nécessaires (titre, slug, thumbId, etc.).


## Exemple d'utilisation

```tsx
<div className="infinite-hits-container mb-5">
              {PeopleData.map((card, i) => (
                  <PeopleCard lang={lang} People={card} key={i} />
              ))}
</div>

```

```tsx

export const PeopleData: PeopleCardProps[] = [{
  title: "Mathieu Guibert",
  slug: "Mathieu-Guibert",
  nbToques: 4,
  note:"17,5",
  noteDescription:"table de prestige",
  thumbId: "82e5954e-cc61-4d53-aea7-1c7d532faeba", 
  activity:["chef"],
  establishmentType:"Restaurant",
  establishmentTitle:"Anne de bretagne"
},
{
  title: "Mathieu Dupius baumal",
  slug: "mathieu-dupius-baumal",
  nbToques: 4,
  note:"17",
  noteDescription:"table de prestige",
  thumbId: "9c8047f8-df57-49f3-b178-e6780bcae448", 
  activity:["chef"],
  distinction:["grand de demain"],
  establishmentType:"Restaurant",
  establishmentTitle:"Le art - chateau de la gaude"
},{
  title: "Alain Ducasse",
  slug: "alain-ducasse",
  nbToques: 6,
  note:"17,5",
  noteDescription:"table de prestige",
  thumbId: "374cbf78-ff32-407f-b933-59a2d7550c94", 
  activity:["chef"],
  establishmentType:"Restaurant",
  establishmentTitle:"Le Louis XV - Alain Ducasse à l'Hôtel de Paris"
},
{
  title: "kwen liew",
  slug: "alain-ducasse",
  nbToques: 0,
  note:"17,5",
  noteDescription:"table de prestige",
  thumbId: "a027df96-61fa-473a-b6e9-0430c7dd24de", 
  activity:["cheffe"],
  establishmentType:"Restaurant",
  establishmentTitle:"Pertinence"
},
];

```

## Le composant Toques
Les toques sont rendues via `/common/toques/index.tsx` selon nbToques :

`6 :  toques gold`

`0 :  Sélectionné`

`1..5 :  toques simples`

`-1 : Sponsorisé`