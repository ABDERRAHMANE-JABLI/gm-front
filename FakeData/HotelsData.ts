import { HotelProps } from "@/types/Hotels";

/**
 * Collection complète d'hôtels mockés pour tester tous les cas de figure
 * - Tous les niveaux d'étoiles (de -1 sponsorisé à 5 étoiles)
 * - Différents niveaux de restaurants (toques variées de 1 à 6)
 * - Hôtel avec données très longues pour tester le multiligne
 * - Différents états : avec/sans restaurant, avec/sans distance, variété de services
 */
export const hotelData: HotelProps[] = [
  // Hôtel sponsorisé (nbStars = -1)
  {
    title: "Le Mas Provençal",
    slug: "le-mas-provencal",
    isGmSelected: false,
    nbStars: -1,
    nbStarsDescription: "Sponsorisé",
    thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
    openingPeriods: {
      monday:    [{ begin: "00:00", end: "23:59" }],
      tuesday:   [{ begin: "00:00", end: "23:59" }],
      wednesday: [{ begin: "00:00", end: "23:59" }],
      thursday:  [{ begin: "00:00", end: "23:59" }],
      friday:    [{ begin: "00:00", end: "23:59" }],
      saturday:  [{ begin: "00:00", end: "23:59" }],
      sunday:    [{ begin: "00:00", end: "23:59" }]
    },
    address: "84160 Cadenet, Provence",
    services: ["Wifi gratuit", "Parking", "Jardin"],
    budget: "85€",
    distance: "8.5 km"
  },

  // Hôtel sélectionné sans étoiles (nbStars = 0)
  {
    title: "La Petite Auberge",
    slug: "la-petite-auberge",
    isGmSelected: true,
    nbStars: 0,
    nbStarsDescription: "Sélectionné",
    thumbId: "4763a23b-2508-4a51-9cae-53b4da465f87",
    openingPeriods: {
      monday:    [{ begin: "08:00", end: "22:00" }],
      tuesday:   [{ begin: "08:00", end: "22:00" }],
      wednesday: [{ begin: "08:00", end: "22:00" }],
      thursday:  [{ begin: "08:00", end: "22:00" }],
      friday:    [{ begin: "08:00", end: "23:00" }],
      saturday:  [{ begin: "08:00", end: "23:00" }],
      sunday:    [{ begin: "09:00", end: "21:00" }]
    },
    address: "38 Rue du Village, 73000 Chambéry",
    services: ["Petit-déjeuner inclus", "Wifi gratuit"],
    budget: "65€",
    restaurantNbtoques: 1
  },

  // Hôtel 1 étoile
  {
    title: "Hôtel du Centre",
    slug: "hotel-du-centre",
    isGmSelected: true,
    nbStars: 1,
    nbStarsDescription: "Hôtel confortable",
    thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
    openingPeriods: {
      monday:    [{ begin: "07:00", end: "23:00" }],
      tuesday:   [{ begin: "07:00", end: "23:00" }],
      wednesday: [{ begin: "07:00", end: "23:00" }],
      thursday:  [{ begin: "07:00", end: "23:00" }],
      friday:    [{ begin: "07:00", end: "23:00" }],
      saturday:  [{ begin: "07:00", end: "23:00" }],
      sunday:    [{ begin: "08:00", end: "22:00" }]
    },
    address: "12 Place de la Mairie, 69002 Lyon",
    services: ["Wifi gratuit", "Réception 24h/24"],
    budget: "75€",
    distance: "450 m",
    supportfavorite: true
  },

  // Hôtel 2 étoiles avec restaurant 2 toques
  {
    title: "Le Logis des Saveurs",
    slug: "le-logis-des-saveurs",
    isGmSelected: true,
    nbStars: 2,
    nbStarsDescription: "Hôtel de qualité",
    restaurantNbtoques: 2,
    thumbId: "01d3cfef-738f-4fff-9684-4a7583af9f6b",
    openingPeriods: {
      monday:    [{ begin: "00:00", end: "23:59" }],
      tuesday:   [{ begin: "00:00", end: "23:59" }],
      wednesday: [{ begin: "00:00", end: "23:59" }],
      thursday:  [{ begin: "00:00", end: "23:59" }],
      friday:    [{ begin: "00:00", end: "23:59" }],
      saturday:  [{ begin: "00:00", end: "23:59" }],
      sunday:    [{ begin: "00:00", end: "23:59" }]
    },
    address: "67 Route des Vignobles, 21200 Beaune",
    services: ["Restauration sur place", "Cave à vin", "Wifi gratuit", "Parking gratuit"],
    budget: "120€",
    supportfavorite: true
  },

  // Hôtel 3 étoiles avec restaurant 3 toques
  {
    title: "Château de Bellevue",
    slug: "chateau-de-bellevue",
    isGmSelected: true,
    nbStars: 3,
    nbStarsDescription: "Hôtel supérieur",
    restaurantNbtoques: 3,
    thumbId: "f54d02ac-15a5-46bc-9f1d-3f0a58ff5a41",
    openingPeriods: {
      monday:    [{ begin: "00:00", end: "23:59" }],
      tuesday:   [{ begin: "00:00", end: "23:59" }],
      wednesday: [{ begin: "00:00", end: "23:59" }],
      thursday:  [{ begin: "00:00", end: "23:59" }],
      friday:    [{ begin: "00:00", end: "23:59" }],
      saturday:  [{ begin: "00:00", end: "23:59" }],
      sunday:    [{ begin: "00:00", end: "23:59" }]
    },
    address: "Route de Bordeaux, 33250 Pauillac",
    services: ["Spa", "Piscine extérieure", "Restauration gastronomique", "Service en chambre", "Wifi gratuit"],
    budget: "195€",
    distance: "3.7 km",
    supportfavorite: true
  },

  // Hôtel 4 étoiles avec restaurant 4 toques
  {
    title: "Grand Hôtel des Alpes",
    slug: "grand-hotel-des-alpes",
    isGmSelected: true,
    nbStars: 4,
    nbStarsDescription: "Hôtel de Prestige",
    restaurantNbtoques: 4,
    thumbId: "59fd20f3-5cfb-4587-b0ca-bfd9a7a2e686",
    openingPeriods: {
      monday:    [{ begin: "00:00", end: "23:59" }],
      tuesday:   [{ begin: "00:00", end: "23:59" }],
      wednesday: [{ begin: "00:00", end: "23:59" }],
      thursday:  [{ begin: "00:00", end: "23:59" }],
      friday:    [{ begin: "00:00", end: "23:59" }],
      saturday:  [{ begin: "00:00", end: "23:59" }],
      sunday:    [{ begin: "00:00", end: "23:59" }]
    },
    address: "15 Route de Chamonix, 74400 Chamonix-Mont-Blanc",
    services: [
      "Spa & Wellness",
      "Piscine intérieure chauffée",
      "Restauration gastronomique",
      "Bar lounge",
      "Service en chambre 24h/24",
      "Conciergerie",
      "Accès handicapés"
    ],
    budget: "320€",
    supportfavorite: true
  },

  // Hôtel 4 étoiles sans restaurant
  {
    title: "Hôtel Moderne & Design",
    slug: "hotel-moderne-design",
    isGmSelected: true,
    nbStars: 4,
    nbStarsDescription: "Hôtel de Prestige",
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    openingPeriods: {
      monday:    [{ begin: "00:00", end: "23:59" }],
      tuesday:   [{ begin: "00:00", end: "23:59" }],
      wednesday: [{ begin: "00:00", end: "23:59" }],
      thursday:  [{ begin: "00:00", end: "23:59" }],
      friday:    [{ begin: "00:00", end: "23:59" }],
      saturday:  [{ begin: "00:00", end: "23:59" }],
      sunday:    [{ begin: "00:00", end: "23:59" }]
    },
    address: "89 Boulevard Haussmann, 75008 Paris",
    services: [
      "Salle de fitness",
      "Bar à cocktails",
      "Wifi haut débit",
      "Business center",
      "Service de voiturier"
    ],
    budget: "280€",
    distance: "1.8 km"
  },

  // Hôtel 5 étoiles avec restaurant 5 toques
  {
    title: "Palace Royal",
    slug: "palace-royal",
    isGmSelected: true,
    nbStars: 5,
    nbStarsDescription: "Hôtel d'exception",
    restaurantNbtoques: 5,
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
    address: "228 Rue de Rivoli, 75001 Paris",
    services: [
      "Spa luxe",
      "Piscine sur le toit",
      "Restaurants gastronomiques",
      "Bar panoramique",
      "Conciergerie 24h/24",
      "Limousine avec chauffeur",
      "Service en chambre 24h/24",
      "Salles de réception"
    ],
    budget: "850€",
    supportfavorite: true
  },

  // Hôtel 5 étoiles avec restaurant 6 toques (le top du top)
  {
    title: "Hôtel Georges Blanc",
    slug: "hotel-georges-blanc",
    isGmSelected: true,
    nbStars: 5,
    nbStarsDescription: "Hôtel d'exception",
    restaurantNbtoques: 6,
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    openingPeriods: {
      monday:    [{ begin: "00:00", end: "23:59" }],
      tuesday:   [{ begin: "00:00", end: "23:59" }],
      wednesday: [{ begin: "00:00", end: "23:59" }],
      thursday:  [{ begin: "00:00", end: "23:59" }],
      friday:    [{ begin: "00:00", end: "23:59" }],
      saturday:  [{ begin: "00:00", end: "23:59" }],
      sunday:    [{ begin: "00:00", end: "23:59" }]
    },
    address: "Place du Marché, 01540 Vonnas",
    services: [
      "Restaurant 3 étoiles Michelin",
      "Spa Georges Blanc",
      "Piscine",
      "Héliport",
      "Cave exceptionnelle",
      "Conciergerie",
      "Boutique gastronomique",
      "Accès handicapés",
      "Animaux acceptés"
    ],
    budget: "450€",
    supportfavorite: true,
    distance: "95 km"
  },

  // Hôtel avec TITRE ET DONNÉES TRÈS LONGUES pour tester le multiligne
  {
    title: "Le Grand Hôtel International Palace & Resort avec Vue Panoramique sur la Méditerranée et Complexe Spa de Luxe",
    slug: "grand-hotel-international-palace-resort-mediterranee",
    isGmSelected: true,
    nbStars: 5,
    nbStarsDescription: "Hôtel d'exception avec prestations de standing international et service personnalisé remarquable",
    restaurantNbtoques: 4,
    thumbId: "7d46b9c8-93c6-4035-963e-fdbba06bccd3",
    openingPeriods: {
      monday:    [{ begin: "00:00", end: "23:59" }],
      tuesday:   [{ begin: "00:00", end: "23:59" }],
      wednesday: [{ begin: "00:00", end: "23:59" }],
      thursday:  [{ begin: "00:00", end: "23:59" }],
      friday:    [{ begin: "00:00", end: "23:59" }],
      saturday:  [{ begin: "00:00", end: "23:59" }],
      sunday:    [{ begin: "00:00", end: "23:59" }]
    },
    address: "37 Boulevard de la Croisette, Quartier de la Californie, Face à la Plage du Midi, 06400 Cannes, Côte d'Azur, France",
    services: [
      "Spa & Centre de bien-être de 2000m²",
      "Trois piscines dont une à débordement sur le toit",
      "Plage privée avec service de transats et parasols",
      "Restaurant gastronomique étoilé",
      "Restaurant méditerranéen en bord de mer",
      "Bar à champagne panoramique",
      "Service de conciergerie personnalisé 24h/24",
      "Héliport privé",
      "Marina avec places d'amarrage",
      "Salle de fitness ultramoderne",
      "Courts de tennis",
      "Club enfants avec activités encadrées",
      "Service de voiturier et parking sécurisé",
      "Boutiques de luxe",
      "Salons de réception et salles de conférence"
    ],
    budget: "1250€ - 3500€ selon saison et type de suite",
    distance: "450 m",
    supportfavorite: true
  },

  // Hôtel 3 étoiles avec restaurant 1 toque
  {
    title: "Auberge du Terroir",
    slug: "auberge-du-terroir",
    isGmSelected: true,
    nbStars: 3,
    nbStarsDescription: "Hôtel supérieur",
    restaurantNbtoques: 1,
    thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
    openingPeriods: {
      monday:    [{ begin: "07:00", end: "23:00" }],
      tuesday:   [{ begin: "07:00", end: "23:00" }],
      wednesday: [],
      thursday:  [{ begin: "07:00", end: "23:00" }],
      friday:    [{ begin: "07:00", end: "23:00" }],
      saturday:  [{ begin: "07:00", end: "23:00" }],
      sunday:    [{ begin: "08:00", end: "22:00" }]
    },
    address: "23 Rue du Pont Vieux, 46000 Cahors",
    services: ["Restaurant régional", "Terrasse ombragée", "Wifi gratuit", "Parking"],
    budget: "110€",
    distance: "2.1 km"
  }
];

/**
 * Hôtel unique pour tester la carte horizontale
 */
export const HorizontalHotelData: HotelProps = {
  title: "Château de Bellevue Château de Bellevue Château de Bellevue Château de Bellevue",
  slug: "chateau-de-bellevue",
  isGmSelected: true,
  nbStars: 5,
  restaurantNbtoques : 5,
  nbStarsDescription: "Hotel supérieurs",
  thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
  openingPeriods: {
    monday:    [{ begin: "00:00", end: "23:59" }],
    tuesday:   [{ begin: "00:00", end: "23:59" }],
    wednesday: [{ begin: "00:00", end: "23:59" }],
    thursday:  [{ begin: "00:00", end: "23:59" }],
    friday:    [{ begin: "00:00", end: "23:59" }],
    saturday:  [{ begin: "00:00", end: "23:59" }],
    sunday:    [{ begin: "00:00", end: "23:59" }]
  },
  address: "Route des Vignobles, 33460 Margaux",
  services: ["Spa", "Piscine chauffée", "Restaurant gastronomique", "Wifi gratuit", "Parking privé", "Concierge"],
  budget: "450€",
  distance: "5.2 km"
};
