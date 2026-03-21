import { RestaurantCardProps, RestaurantProps } from "@/types/Restaurant";

export const HorizontalRestauData: RestaurantCardProps = {
  title: "Airelles Château de Versaille Airelles Château de Versaille de",
  slug: "flocon-de-sel",
  nbToques: 6,
  noteDescription: "table d'exception",
  thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
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
      { begin: "09:00", end: "14:00" },
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
  cuisines: ["Cuisine d'auteur", "Français"],
  budget: "310€ - 370€",
  chief: "Alain Ducasse",
  note: "19,5"
};


/**
 * Collection complète de restaurants mockés pour tester tous les cas de figure
 * - Tous les niveaux de toques (de -1 à 6)
 * - Restaurant avec données très longues pour tester le multiligne
 * - Différents états : ouvert/fermé, avec/sans distance, avec/sans données optionnelles
 */
export const RestaurantCardDatas: RestaurantCardProps[] = [
  // Restaurant sponsorisé (nbToques = -1)
  {
    title: "La Brasserie du Quartier",
    slug: "la-brasserie-du-quartier",
    nbToques: -1,
    noteDescription: "Sponsorisé",
    thumbId: "e9c5ea4c-ebe4-46c8-998f-49b37349cf96",
    openingPeriods: {
      monday: [{ begin: "12:00", end: "14:30" }, { begin: "19:00", end: "01:30" }],
      tuesday: [{ begin: "12:00", end: "14:30" }, { begin: "19:00", end: "23:30" }],
      wednesday: [{ begin: "08:00", end: "14:30" }, { begin: "19:00", end: "22:30" }],
      thursday: [{ begin: "08:00", end: "14:30" }, { begin: "19:00", end: "22:30" }],
      friday: [{ begin: "08:00", end: "14:30" }, { begin: "19:00", end: "23:30" }],
      saturday: [{ begin: "08:00", end: "15:00" }, { begin: "19:00", end: "23:30" }],
      sunday: [{ begin: "08:00", end: "15:00" }]
    },
    address: "15 Rue de la Paix, 75002 Paris",
    cuisines: ["Brasserie", "Français"],
    budget: "25€ - 45€",
    chief: "Pierre Martin",
    distance: "2.3 km"
  },

  // Restaurant sans toques (nbToques = 0)
  {
    title: "Chez Léon",
    slug: "chez-leon",
    nbToques: 1,
    note: "12",
    noteDescription: "Sélectionné",
    thumbId: "4763a23b-2508-4a51-9cae-53b4da465f87",
    openingPeriods: {
      monday: [{ begin: "04:00", end: "22:00" }, { begin: "18:30", end: "22:00" }],
      tuesday: [{ begin: "11:30", end: "14:00" }, { begin: "18:30", end: "22:00" }],
      wednesday: [{ begin: "11:30", end: "14:00" }, { begin: "18:30", end: "22:00" }],
      thursday: [{ begin: "11:30", end: "14:00" }, { begin: "18:30", end: "22:00" }],
      friday: [{ begin: "11:30", end: "14:00" }, { begin: "18:30", end: "23:00" }],
      saturday: [{ begin: "11:30", end: "14:30" }, { begin: "18:30", end: "23:00" }],
      sunday: []
    },
    address: "8 Avenue de l'Opéra, 75001 Paris",
    cuisines: ["Bistrot", "Traditionnel"],
    budget: "30€ - 50€",
    chief: "Léon Dupont",
    distance: "1.2 km"},
  // Restaurant 1 toque
  {
    title: "L'Atelier Gourmand",
    slug: "atelier-gourmand",
    nbToques: 1,
    note: "13",
    noteDescription: "Une très bonne table",
    thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
    openingPeriods: {
      monday: [],
      tuesday: [{ begin: "12:00", end: "14:00" }, { begin: "19:30", end: "21:30" }],
      wednesday: [{ begin: "12:00", end: "14:00" }, { begin: "19:30", end: "21:30" }],
      thursday: [{ begin: "12:00", end: "14:00" }, { begin: "19:30", end: "21:30" }],
      friday: [{ begin: "12:00", end: "14:00" }, { begin: "19:30", end: "22:00" }],
      saturday: [{ begin: "12:00", end: "14:30" }, { begin: "19:30", end: "22:00" }],
      sunday: [{ begin: "12:00", end: "14:30" }]
    },
    address: "23 Rue du Faubourg Saint-Antoine, 75011 Paris",
    cuisines: ["Français", "Créatif"],
    budget: "45€ - 65€",
    chief: "Marie Leblanc",
    distance: "5.7 km",
    supportfavorite: true
  },

  // Restaurant 2 toques
  {
    title: "Le Petit Gourmet",
    slug: "le-petit-gourmet",
    nbToques: 2,
    note: "14",
    noteDescription: "Une très bonne table dans sa catégorie",
    thumbId: "01d3cfef-738f-4fff-9684-4a7583af9f6b",
    openingPeriods: {
      monday: [],
      tuesday: [{ begin: "12:15", end: "13:45" }, { begin: "19:30", end: "21:30" }],
      wednesday: [{ begin: "12:15", end: "13:45" }, { begin: "19:30", end: "21:30" }],
      thursday: [{ begin: "12:15", end: "13:45" }, { begin: "19:30", end: "21:30" }],
      friday: [{ begin: "12:15", end: "13:45" }, { begin: "19:30", end: "22:00" }],
      saturday: [{ begin: "12:15", end: "14:00" }, { begin: "19:30", end: "22:00" }],
      sunday: []
    },
    address: "45 Boulevard Saint-Germain, 75005 Paris",
    cuisines: ["Français", "Moderne"],
    budget: "55€ - 80€",
    chief: "Antoine Rousseau"
  },

  // Restaurant 3 toques
  {
    title: "La Table d'Antan",
    slug: "la-table-antan",
    nbToques: 3,
    note: "15,5",
    noteDescription: "Une grande table",
    thumbId: "f54d02ac-15a5-46bc-9f1d-3f0a58ff5a41",
    openingPeriods: {
      monday: [],
      tuesday: [],
      wednesday: [{ begin: "12:00", end: "13:30" }, { begin: "19:30", end: "21:30" }],
      thursday: [{ begin: "12:00", end: "13:30" }, { begin: "19:30", end: "21:30" }],
      friday: [{ begin: "12:00", end: "13:30" }, { begin: "19:30", end: "21:30" }],
      saturday: [{ begin: "12:00", end: "13:30" }, { begin: "19:30", end: "21:30" }],
      sunday: [{ begin: "12:00", end: "13:30" }]
    },
    address: "12 Rue de Varenne, 75007 Paris",
    cuisines: ["Français", "Gastronomique"],
    budget: "95€ - 135€",
    chief: "Claude Bergeron",
    supportfavorite: true
  },

  // Restaurant 4 toques
  {
    title: "Le Jardin des Saveurs",
    slug: "le-jardin-des-saveurs",
    nbToques: 4,
    note: "17",
    noteDescription: "Table de prestige",
    thumbId: "59fd20f3-5cfb-4587-b0ca-bfd9a7a2e686",
    openingPeriods: {
      monday: [],
      tuesday: [],
      wednesday: [{ begin: "12:00", end: "13:15" }, { begin: "20:00", end: "21:30" }],
      thursday: [{ begin: "12:00", end: "13:15" }, { begin: "20:00", end: "21:30" }],
      friday: [{ begin: "12:00", end: "13:15" }, { begin: "20:00", end: "21:30" }],
      saturday: [{ begin: "12:00", end: "13:15" }, { begin: "20:00", end: "21:30" }],
      sunday: []
    },
    address: "28 Avenue Montaigne, 75008 Paris",
    cuisines: ["Français", "Haute cuisine"],
    budget: "150€ - 220€",
    chief: "Jean-François Piège",
    distance: "3.2 km"
  },

  // Restaurant 5 toques
  {
    title: "L'Excellence Parisienne",
    slug: "excellence-parisienne",
    nbToques: 5,
    note: "18,5",
    noteDescription: "Table d'exception",
    thumbId: "6c7906d9-3ab7-434d-90e1-4d1f7f3bd98b",
    openingPeriods: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [{ begin: "12:00", end: "13:00" }, { begin: "20:00", end: "21:00" }],
      friday: [{ begin: "12:00", end: "13:00" }, { begin: "20:00", end: "21:00" }],
      saturday: [{ begin: "12:00", end: "13:00" }, { begin: "20:00", end: "21:00" }],
      sunday: []
    },
    address: "31 Rue du Faubourg Saint-Honoré, 75008 Paris",
    cuisines: ["Français", "Haute gastronomie", "Cuisine d'auteur"],
    budget: "280€ - 380€",
    chief: "Yannick Alléno",
    supportfavorite: true
  },

  // Restaurant 6 toques (le maximum)
  {
    title: "Le Prestige",
    slug: "le-prestige",
    nbToques: 6,
    note: "19,5",
    noteDescription: "Table d'exception",
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    openingPeriods: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [{ begin: "12:30", end: "13:00" }, { begin: "20:00", end: "21:00" }],
      friday: [{ begin: "12:30", end: "13:00" }, { begin: "20:00", end: "21:00" }],
      saturday: [{ begin: "12:30", end: "13:00" }, { begin: "20:00", end: "21:00" }],
      sunday: []
    },
    address: "Place de la Concorde, 75008 Paris",
    cuisines: ["Français", "Cuisine d'exception"],
    budget: "350€ - 500€",
    chief: "Alain Ducasse",
    supportfavorite: true
  },

  // Restaurant avec TITRE ET DONNÉES TRÈS LONGUES pour tester le multiligne
  {
    title: "L'Extraordinaire Restaurant Gastronomique de la Place du Trocadéro avec Vue Panoramique sur la Tour Eiffel",
    slug: "extraordinaire-restaurant-gastronomique-trocadero",
    nbToques: 4,
    note: "16,5",
    noteDescription: "Table de prestige avec une vue exceptionnelle et un service remarquable qui mérite amplement ses quatre toques",
    thumbId: "7d46b9c8-93c6-4035-963e-fdbba06bccd3",
    openingPeriods: {
      monday: [{ begin: "12:00", end: "14:30" }, { begin: "19:00", end: "22:30" }],
      tuesday: [{ begin: "12:00", end: "14:30" }, { begin: "19:00", end: "22:30" }],
      wednesday: [{ begin: "12:00", end: "14:30" }, { begin: "19:00", end: "22:30" }],
      thursday: [{ begin: "12:00", end: "14:30" }, { begin: "19:00", end: "22:30" }],
      friday: [{ begin: "12:00", end: "14:30" }, { begin: "19:00", end: "23:00" }],
      saturday: [{ begin: "12:00", end: "15:00" }, { begin: "19:00", end: "23:00" }],
      sunday: [{ begin: "12:00", end: "15:00" }, { begin: "19:00", end: "22:00" }]
    },
    address: "1 Place du Trocadéro et du 11 Novembre, Esplanade des Droits de l'Homme, 75016 Paris, France",
    cuisines: [
      "Français",
      "Gastronomique",
      "Cuisine contemporaine",
      "Cuisine créative",
      "Cuisine d'auteur",
      "Cuisine du terroir",
      "Cuisine méditerranéenne"
    ],
    budget: "180€ - 285€ (menu dégustation inclus avec accord mets et vins)",
    chief: "Jean-Pierre Alexandre Emmanuel de la Rochefoucauld-Montmorency",
    distance: "12.8 km",
    supportfavorite: true
  },

  // Restaurant fermé actuellement (dimanche soir)
  {
    title: "La Petite Table",
    slug: "la-petite-table",
    nbToques: 2,
    note: "14,5",
    noteDescription: "Une très bonne table",
    thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
    openingPeriods: {
      monday: [],
      tuesday: [{ begin: "12:00", end: "14:00" }, { begin: "19:00", end: "22:00" }],
      wednesday: [{ begin: "12:00", end: "14:00" }, { begin: "19:00", end: "22:00" }],
      thursday: [{ begin: "12:00", end: "14:00" }, { begin: "19:00", end: "22:00" }],
      friday: [{ begin: "12:00", end: "14:00" }, { begin: "19:00", end: "22:30" }],
      saturday: [{ begin: "12:00", end: "14:30" }, { begin: "19:00", end: "22:30" }],
      sunday: []
    },
    address: "67 Rue de Charonne, 75011 Paris",
    cuisines: ["Français", "Bistrot moderne"],
    budget: "48€ - 72€",
    chief: "Sophie Marchand"
  }
];

export const RestaurantData: RestaurantProps[] = [
  // Restaurant sans toques (nbToques = 0)
  {
    title: "Chez Léon",
    slug: "chez-leon",
    nbToques: 1,
    note: "12",
    noteDescription: "Sélectionné",
    thumbId: "c33f8b8f-13cc-43f0-a72d-2f19037c6975",
    carousel: [{ id: "c33f8b8f-13cc-43f0-a72d-2f19037c6975", copyRight: "© Chez Léon" },
      { id: "c33f8b8f-13cc-43f0-a72d-2f19037c6975", copyRight: "© Chez Franck" },
      { id: "27b827be-6a0f-44e4-b396-d394bbd308b6", copyRight: "© Chez Léon" },
      { id: "18789d32-bd15-44b1-ad36-8e200aa8211b", copyRight: "© Chez Lisa" },
      { id: "16a1d19b-76ee-4f4f-81bc-74216c43159c", copyRight: "© Chez Léon" }
    ],
    openingPeriods: {
      monday: [{ begin: "04:00", end: "22:00" }, { begin: "18:30", end: "22:00" }],
      tuesday: [{ begin: "11:30", end: "14:00" }, { begin: "18:30", end: "22:00" }],
      wednesday: [{ begin: "11:30", end: "14:00" }, { begin: "18:30", end: "22:00" }],
      thursday: [{ begin: "11:30", end: "14:00" }, { begin: "18:30", end: "22:00" }],
      friday: [{ begin: "11:30", end: "14:00" }, { begin: "18:30", end: "23:00" }],
      saturday: [{ begin: "11:30", end: "14:30" }, { begin: "18:30", end: "23:00" }],
      sunday: []
    },
    address: "8 Avenue de l'Opéra, 75001 Paris",
    cuisines: ["Bistrot", "Traditionnel", "Bistrot", "Traditionnel", "Bistrot", "Traditionnel"],
    budget: "30€ - 50€",
    chief: "Léon Dupont",
    peoples: [{
      title: "Léon Dupont",
      slug: "leon-dupont",
      activity: "Chef"
    },
    {
      title: "Joe Sommelier",
      activity: "Sommelier",
      slug: ""
    }],
    menu: [
      {
        kind: "Entrée",
        dishes: [
          {
            title: "Crumble de Saint Marcellin, Muesli au Miel",
            price: "11 €",
            isSignature: false
          },
          {
            title: "Carpaccio de Poulpe, Espuma au Piment d'Espelette",
            price: "15 €",
            isSignature: false
          }
        ]
      },
      {
        kind: "Plat principal",
        dishes: [
          {
            title: "Filet de Canette Française Rôti à la Pâte de Coing",
            price: "20 €",
            isSignature: false
          },
          {
            title: "Pavé de Saumon D'Ecosse à L'unilaterale, Crème à l'Aneth",
            price: "25 €",
            isSignature: false
          }
        ]
      },
      {
        kind: "Dessert",
        dishes: [
          {
            title: "L’Inimitable « Tarte au Citron » de Léon",
            price: "11 €",
            isSignature: true
          },
          {
            title: "Entremet Fondant à la Mangue",
            price: "11 €",
            isSignature: false
          }
        ]
      }
    ],
    menuFormulas:[
      {
        title: "Formule Déjeuner",
        price: "32€",
        isDrinkIncluded: false
      },
      {
        title: "Formule Dîner",
        price: "45€",
        isDrinkIncluded: true
      }
    ],
    geo:{lat:48.858370, lng:2.294481},
    reviewYear: 2026,
    review: "Typiquement le bistrot de potes et d'habitués qui vous colore une soirée avec une carte de vins affriolante et des assiettes qui réchauffent le cœur. On pourrait craindre un peu le surjoué et l'artifice, mais l'accueil s'avère sincèrement chaleureux et dévoué et les plats ne mentent pas. Une bonne terrine de campagne, un peu grasse, mais de bon goût, une joue de bœuf bien confite sauce vin rouge avec une purée grand-mère un poil sèche, une profiterole géante et simple à la fois, mais honnêtement faite avec une pâte à chou maison, à travers une carte un peu fourre-tout, mais qui reflète aussi les envies d'aujourd'hui, entre plats de ménage, tataki, carpaccio de poulpe, risotto truffe parmesan et burger. La cave donne du choix et du bon sur la plupart des régions, avec des pichets et des verres bienvenus."
  }
];

