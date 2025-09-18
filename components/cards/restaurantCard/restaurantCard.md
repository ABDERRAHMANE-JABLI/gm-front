# Analyse de la carte RestaurantCard

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
| distance            | string/float | Oui    | affiche la distance en km si la donnée est fournie, fonctionne avec 'Autour de moi' activé |

### openingPeriods structure
```json
{
  "sunday": [
    ["09:30:00", "11:30:00"],
    ["15:00:00", "18:00:00"]
  ],
  "monday": [
    ["08:30:00", "11:45:00"],
    ["14:00:00", "17:15:00"],
    ["19:30:00", "21:00:00"]
  ],
  "tuesday": [
    ["09:00:00", "12:00:00"],
    ["13:30:00", "16:00:00"]
  ],
  "wednesday": [],
  "thursday": [
    ["08:00:00", "11:00:00"],
    ["15:00:00", "18:30:00"],
    ["20:00:00", "22:00:00"]
  ],
  "friday": [
    ["09:15:00", "12:15:00"],
    ["14:45:00", "17:30:00"]
  ],
  "saturday": [
    ["10:00:00", "13:00:00"],
    ["19:00:00", "23:00:00"]
  ]
}
```

### cuisines structure
```json
{ "cuisines": ["Français", "Gastronomique", "Méditerranéen", "..."]}
```