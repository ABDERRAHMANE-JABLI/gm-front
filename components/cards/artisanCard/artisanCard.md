# Analyse de la carte ArtisanCard

## Champs nécessaires pour ArtisanCard

| Champ                        | Type         | Optionnel | Origine / Description |
|------------------------------|-------------|-----------|----------------------|
| title                        | string      | Non       | Nom du domaine |
| slug                         | string      | Non       | Slug du domaine |
| isGmSelected                 | bool        | Non       | false = 'Sponsorisé' |
| activities                   | array       | Oui       | index 0 = Activité principale, puis toutes les activités secondaires |
| thumbId                      | string      | Oui       | Id image miniature (666x444 fit=cover) |
| openingPeriods               | array       | Oui       | horaires d'ouvertures voir ci-dessous |
| address                      | string      | Oui       | Adresse Artisan |
| services                     | array       | Oui       | Services de l'artisan voir ci-dessous |
| distance                     | string      | Oui       | affiche la distance en km si la donnée est fournie, fonctionne avec 'Autour de moi' activé |

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

### activities structure
```json
{ "activities": ["Charcutier", "Boucher", "Traiteur", "..."]}
```

### services structure
```json
{ "services": ["Boutique en ligne", "Click & Collect", "..."]}
```