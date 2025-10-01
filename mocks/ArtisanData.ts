import { ArtisanProps } from "@/types/Artisans";

/**
 * Collection complète d'artisans mockés pour tester tous les cas de figure
 * - Différentes activités : boulanger, pâtissier, fromager, chocolatier, boucher, poissonnier, traiteur
 * - Artisans sélectionnés GM et sponsorisés
 * - Artisan avec données très longues pour tester le multiligne
 * - Variations d'horaires, services, activités secondaires
 */
export const ArtisanData: ArtisanProps[] = [
  // Boulanger sélectionné GM avec activités secondaires
  {
    title: "Au Four et au Moulin",
    slug: "au-four-et-au-moulin",
    isGmSelected: true,
    primaryActivity: "Boulanger",
    otherActivities: ["Pâtissier", "Viennoiserie"],
    thumbId: "f54d02ac-15a5-46bc-9f1d-3f0a58ff5a41",
    openingPeriods: {
      monday: [
        { begin: "06:30", end: "13:30" },
        { begin: "15:30", end: "19:30" }
      ],
      tuesday: [
        { begin: "06:30", end: "13:30" },
        { begin: "15:30", end: "19:30" }
      ],
      wednesday: [
        { begin: "06:30", end: "13:30" },
        { begin: "15:30", end: "19:30" }
      ],
      thursday: [
        { begin: "06:30", end: "13:30" },
        { begin: "15:30", end: "19:30" }
      ],
      friday: [
        { begin: "06:30", end: "13:30" },
        { begin: "15:30", end: "20:00" }
      ],
      saturday: [
        { begin: "06:30", end: "13:30" },
        { begin: "15:00", end: "19:00" }
      ],
      sunday: [
        { begin: "07:00", end: "13:00" }
      ]
    },
    address: "15 Rue de la Boulangerie, 35500 Vitré",
    services: ["Pain au levain naturel", "Viennoiseries maison", "Sur commande"],
    distance: "850 m"
  },

  // Pâtissier avec nombreuses spécialités
  {
    title: "La Pâtisserie Gourmande",
    slug: "la-patisserie-gourmande",
    isGmSelected: true,
    primaryActivity: "Pâtissier",
    otherActivities: ["Chocolatier", "Glacier", "Confiseur"],
    thumbId: "01d3cfef-738f-4fff-9684-4a7583af9f6b",
    openingPeriods: {
      monday: [],
      tuesday: [
        { begin: "09:00", end: "13:00" },
        { begin: "14:30", end: "19:00" }
      ],
      wednesday: [
        { begin: "09:00", end: "13:00" },
        { begin: "14:30", end: "19:00" }
      ],
      thursday: [
        { begin: "09:00", end: "13:00" },
        { begin: "14:30", end: "19:00" }
      ],
      friday: [
        { begin: "09:00", end: "13:00" },
        { begin: "14:30", end: "19:30" }
      ],
      saturday: [
        { begin: "09:00", end: "13:00" },
        { begin: "14:30", end: "19:30" }
      ],
      sunday: [
        { begin: "09:00", end: "13:00" }
      ]
    },
    address: "23 Avenue Victor Hugo, 69003 Lyon",
    services: ["Pièces montées", "Sur commande", "Gâteaux personnalisés", "Salon de thé"],
    distance: "1.2 km"
  },

  // Fromager affineur
  {
    title: "La Cave à Fromages",
    slug: "la-cave-a-fromages",
    isGmSelected: true,
    primaryActivity: "Fromager-Affineur",
    otherActivities: ["Crèmerie"],
    thumbId: "59fd20f3-5cfb-4587-b0ca-bfd9a7a2e686",
    openingPeriods: {
      monday: [
        { begin: "09:00", end: "13:00" },
        { begin: "16:00", end: "19:30" }
      ],
      tuesday: [
        { begin: "09:00", end: "13:00" },
        { begin: "16:00", end: "19:30" }
      ],
      wednesday: [
        { begin: "09:00", end: "13:00" },
        { begin: "16:00", end: "19:30" }
      ],
      thursday: [
        { begin: "09:00", end: "13:00" },
        { begin: "16:00", end: "19:30" }
      ],
      friday: [
        { begin: "09:00", end: "13:00" },
        { begin: "16:00", end: "20:00" }
      ],
      saturday: [
        { begin: "09:00", end: "13:00" },
        { begin: "16:00", end: "20:00" }
      ],
      sunday: [
        { begin: "09:30", end: "13:00" }
      ]
    },
    address: "47 Rue Nationale, 37000 Tours",
    services: ["Affinage maison", "Plateaux sur mesure", "Conseil personnalisé", "Dégustation"],
    distance: "3.5 km"
  },

  // Chocolatier artisan
  {
    title: "Le Cacao d'Or",
    slug: "le-cacao-dor",
    isGmSelected: true,
    primaryActivity: "Chocolatier",
    otherActivities: ["Confiseur"],
    thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
    openingPeriods: {
      monday: [],
      tuesday: [
        { begin: "10:00", end: "13:00" },
        { begin: "14:00", end: "19:00" }
      ],
      wednesday: [
        { begin: "10:00", end: "13:00" },
        { begin: "14:00", end: "19:00" }
      ],
      thursday: [
        { begin: "10:00", end: "13:00" },
        { begin: "14:00", end: "19:00" }
      ],
      friday: [
        { begin: "10:00", end: "13:00" },
        { begin: "14:00", end: "19:30" }
      ],
      saturday: [
        { begin: "10:00", end: "19:30" }
      ],
      sunday: [
        { begin: "10:00", end: "13:00" }
      ]
    },
    address: "8 Place Bellecour, 69002 Lyon",
    services: ["Chocolats maison", "Ballotins personnalisés", "Ateliers découverte"],
    distance: "500 m"
  },

  // Boucher-charcutier
  {
    title: "Boucherie de la Place",
    slug: "boucherie-de-la-place",
    isGmSelected: true,
    primaryActivity: "Boucher",
    otherActivities: ["Charcutier", "Traiteur"],
    thumbId: "6c7906d9-3ab7-434d-90e1-4d1f7f3bd98b",
    openingPeriods: {
      monday: [
        { begin: "08:00", end: "13:00" },
        { begin: "15:30", end: "19:30" }
      ],
      tuesday: [
        { begin: "08:00", end: "13:00" },
        { begin: "15:30", end: "19:30" }
      ],
      wednesday: [
        { begin: "08:00", end: "13:00" },
        { begin: "15:30", end: "19:30" }
      ],
      thursday: [
        { begin: "08:00", end: "13:00" },
        { begin: "15:30", end: "19:30" }
      ],
      friday: [
        { begin: "08:00", end: "13:00" },
        { begin: "15:30", end: "19:30" }
      ],
      saturday: [
        { begin: "07:30", end: "13:00" },
        { begin: "15:00", end: "19:30" }
      ],
      sunday: [
        { begin: "08:00", end: "13:00" }
      ]
    },
    address: "12 Place du Marché, 33000 Bordeaux",
    services: ["Viandes maturées", "Préparations maison", "Sur commande", "Livraison"],
    distance: "2.8 km"
  },

  // Poissonnier
  {
    title: "La Criée Marine",
    slug: "la-criee-marine",
    isGmSelected: true,
    primaryActivity: "Poissonnier",
    otherActivities: ["Écailler"],
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    openingPeriods: {
      monday: [],
      tuesday: [
        { begin: "08:30", end: "13:00" },
        { begin: "16:00", end: "19:30" }
      ],
      wednesday: [
        { begin: "08:30", end: "13:00" },
        { begin: "16:00", end: "19:30" }
      ],
      thursday: [
        { begin: "08:30", end: "13:00" },
        { begin: "16:00", end: "19:30" }
      ],
      friday: [
        { begin: "08:30", end: "13:00" },
        { begin: "16:00", end: "19:30" }
      ],
      saturday: [
        { begin: "08:00", end: "13:00" },
        { begin: "16:00", end: "19:30" }
      ],
      sunday: [
        { begin: "08:30", end: "13:00" }
      ]
    },
    address: "56 Rue du Port, 44000 Nantes",
    services: ["Arrivage quotidien", "Préparation sur place", "Plateaux de fruits de mer"],
    distance: "1.8 km"
  },

  // Traiteur gastronomique
  {
    title: "Au Fin Gourmet",
    slug: "au-fin-gourmet",
    isGmSelected: true,
    primaryActivity: "Traiteur",
    otherActivities: ["Charcutier", "Fromager", "Caviste"],
    thumbId: "7d46b9c8-93c6-4035-963e-fdbba06bccd3",
    openingPeriods: {
      monday: [
        { begin: "09:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      tuesday: [
        { begin: "09:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      wednesday: [
        { begin: "09:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      thursday: [
        { begin: "09:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      friday: [
        { begin: "09:00", end: "13:00" },
        { begin: "15:00", end: "19:30" }
      ],
      saturday: [
        { begin: "09:00", end: "13:00" },
        { begin: "15:00", end: "19:30" }
      ],
      sunday: [
        { begin: "09:00", end: "13:00" }
      ]
    },
    address: "89 Avenue de la République, 75011 Paris",
    services: ["Cocktails", "Réceptions", "Mariages", "Sur commande", "Livraison", "Commande en ligne"],
    distance: "4.2 km"
  },

  // Boulanger bio sans activités secondaires
  {
    title: "Le Fournil Bio",
    slug: "le-fournil-bio",
    isGmSelected: true,
    primaryActivity: "Boulanger",
    thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
    openingPeriods: {
      monday: [],
      tuesday: [
        { begin: "07:00", end: "14:00" }
      ],
      wednesday: [
        { begin: "07:00", end: "14:00" }
      ],
      thursday: [
        { begin: "07:00", end: "14:00" }
      ],
      friday: [
        { begin: "07:00", end: "14:00" }
      ],
      saturday: [
        { begin: "07:00", end: "14:00" }
      ],
      sunday: [
        { begin: "07:00", end: "13:00" }
      ]
    },
    address: "5 Chemin des Meuniers, 13100 Aix-en-Provence",
    services: ["100% bio", "Farines biologiques", "Pain au levain naturel"]
  },

  // Artisan SPONSORISÉ
  {
    title: "Pâtisserie du Commerce",
    slug: "patisserie-du-commerce",
    isGmSelected: false,
    primaryActivity: "Pâtissier",
    otherActivities: ["Boulanger"],
    thumbId: "4763a23b-2508-4a51-9cae-53b4da465f87",
    openingPeriods: {
      monday: [
        { begin: "07:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      tuesday: [
        { begin: "07:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      wednesday: [
        { begin: "07:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      thursday: [
        { begin: "07:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      friday: [
        { begin: "07:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      saturday: [
        { begin: "07:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      sunday: []
    },
    address: "78 Rue Principale, 59000 Lille",
    services: ["Sur commande", "Gâteaux d'anniversaire"],
    distance: "6.5 km"
  },

  // Glacier artisan
  {
    title: "La Gelateria Italiana",
    slug: "la-gelateria-italiana",
    isGmSelected: true,
    primaryActivity: "Glacier",
    otherActivities: ["Pâtissier"],
    thumbId: "59fd20f3-5cfb-4587-b0ca-bfd9a7a2e686",
    openingPeriods: {
      monday: [
        { begin: "11:00", end: "22:00" }
      ],
      tuesday: [
        { begin: "11:00", end: "22:00" }
      ],
      wednesday: [
        { begin: "11:00", end: "22:00" }
      ],
      thursday: [
        { begin: "11:00", end: "22:00" }
      ],
      friday: [
        { begin: "11:00", end: "23:00" }
      ],
      saturday: [
        { begin: "11:00", end: "23:00" }
      ],
      sunday: [
        { begin: "11:00", end: "22:00" }
      ]
    },
    address: "34 Promenade des Anglais, 06000 Nice",
    services: ["Glaces artisanales", "Sorbets naturels", "Parfums du jour"],
    distance: "900 m"
  },

  // Artisan avec TITRE ET DONNÉES TRÈS LONGUES pour tester le multiligne
  {
    title: "La Très Grande et Excellente Maison Artisanale des Délices Gourmands et des Spécialités Culinaires d'Exception",
    slug: "la-tres-grande-maison-artisanale-delices-gourmands",
    isGmSelected: true,
    primaryActivity: "Traiteur-Charcutier-Rôtisseur",
    otherActivities: [
      "Boucher",
      "Charcutier",
      "Traiteur événementiel",
      "Pâtissier salé",
      "Fromager-affineur",
      "Caviste et sommelier conseil",
      "Service de livraison premium"
    ],
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    openingPeriods: {
      monday: [
        { begin: "08:00", end: "13:00" },
        { begin: "15:00", end: "20:00" }
      ],
      tuesday: [
        { begin: "08:00", end: "13:00" },
        { begin: "15:00", end: "20:00" }
      ],
      wednesday: [
        { begin: "08:00", end: "13:00" },
        { begin: "15:00", end: "20:00" }
      ],
      thursday: [
        { begin: "08:00", end: "13:00" },
        { begin: "15:00", end: "20:00" }
      ],
      friday: [
        { begin: "08:00", end: "13:00" },
        { begin: "15:00", end: "21:00" }
      ],
      saturday: [
        { begin: "07:30", end: "13:30" },
        { begin: "15:00", end: "21:00" }
      ],
      sunday: [
        { begin: "08:00", end: "13:30" }
      ]
    },
    address: "123 Boulevard de la Gastronomie Française et des Traditions Culinaires du Terroir, Quartier Historique des Halles Centrales, 67000 Strasbourg, Alsace, France",
    services: [
      "Traiteur pour événements professionnels et privés",
      "Organisation de cocktails et buffets gastronomiques",
      "Service de livraison dans toute la région",
      "Préparations artisanales selon recettes traditionnelles",
      "Commande en ligne avec paiement sécurisé",
      "Conseil personnalisé pour vos réceptions",
      "Plateaux de charcuterie et fromages affinés",
      "Sélection de vins et champagnes d'exception",
      "Cours de cuisine et ateliers gastronomiques"
    ],
    distance: "12.7 km"
  },

  // Confiseur artisan
  {
    title: "Les Douceurs de Provence",
    slug: "les-douceurs-de-provence",
    isGmSelected: true,
    primaryActivity: "Confiseur",
    otherActivities: ["Chocolatier"],
    thumbId: "f54d02ac-15a5-46bc-9f1d-3f0a58ff5a41",
    openingPeriods: {
      monday: [],
      tuesday: [
        { begin: "10:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      wednesday: [
        { begin: "10:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      thursday: [
        { begin: "10:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      friday: [
        { begin: "10:00", end: "13:00" },
        { begin: "15:00", end: "19:00" }
      ],
      saturday: [
        { begin: "10:00", end: "19:00" }
      ],
      sunday: [
        { begin: "10:00", end: "13:00" }
      ]
    },
    address: "18 Rue des Cardeurs, 84000 Avignon",
    services: ["Calissons d'Aix", "Nougats artisanaux", "Fruits confits", "Cadeaux gourmands"],
    distance: "7.3 km"
  }
];
