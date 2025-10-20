import PeopleProps from "@/types/Peoples";

/**
 * Collection complète de personnes mockées pour tester tous les cas de figure
 * - Tous les niveaux de toques (de -1 à 6)
 * - Différents rôles : chef, cheffe, pâtissier, sommelier, etc.
 * - Différents types d'établissements : restaurant, artisan, hotel, winery
 * - Avec/sans distinctions
 * - Personne avec données très longues pour tester le multiligne
 */
export const PeopleData: PeopleProps[] = [
  // Chef 6 toques (le maximum) - Légende
  {
    title: "Alain Ducasse",
    slug: "alain-ducasse",
    nbToques: 6,
    note: "19,5",
    noteDescription: "Table d'exception",
    thumbId: "374cbf78-ff32-407f-b933-59a2d7550c94",
    activity: ["Chef"],
    distinction: ["Cuisinier du Siècle", "21 étoiles Michelin cumulées"],
    establishmentType: "Restaurant",
    establishmentTitle: "Le Louis XV - Alain Ducasse à l'Hôtel de Paris"
  },

  // Chef 5 toques avec distinction
  {
    title: "Yannick Alléno",
    slug: "yannick-alleno",
    nbToques: 5,
    note: "18,5",
    noteDescription: "Table d'exception",
    thumbId: "82e5954e-cc61-4d53-aea7-1c7d532faeba",
    activity: ["Chef"],
    distinction: ["Cuisinier de l'Année 2023"],
    establishmentType: "Restaurant",
    establishmentTitle: "Pavillon Ledoyen"
  },

  // Chef 4 toques
  {
    title: "Mathieu Guibert",
    slug: "mathieu-guibert",
    nbToques: 4,
    note: "17,5",
    noteDescription: "Table de prestige",
    thumbId: "9c8047f8-df57-49f3-b178-e6780bcae448",
    activity: ["Chef"],
    establishmentType: "Restaurant",
    establishmentTitle: "Anne de Bretagne"
  },

  // Chef 4 toques avec distinction "Grand de Demain"
  {
    title: "Mathieu Dupius Baumal",
    slug: "mathieu-dupius-baumal",
    nbToques: 4,
    note: "17",
    noteDescription: "Table de prestige",
    thumbId: "a027df96-61fa-473a-b6e9-0430c7dd24de",
    activity: ["Chef"],
    distinction: ["Grand de Demain"],
    establishmentType: "Restaurant",
    establishmentTitle: "Le Art - Château de la Gaude"
  },

  // Chef 3 toques
  {
    title: "Thomas Boullault",
    slug: "thomas-boullault",
    nbToques: 3,
    note: "16",
    noteDescription: "Grande table",
    thumbId: "59fd20f3-5cfb-4587-b0ca-bfd9a7a2e686",
    activity: ["Chef"],
    establishmentType: "Restaurant",
    establishmentTitle: "La Table de la Bergerie"
  },

  // Chef 2 toques
  {
    title: "Laurent Petit",
    slug: "laurent-petit",
    nbToques: 2,
    note: "14,5",
    noteDescription: "Très bonne table",
    thumbId: "6c7906d9-3ab7-434d-90e1-4d1f7f3bd98b",
    activity: ["Chef"],
    establishmentType: "Restaurant",
    establishmentTitle: "Le Clos des Sens"
  },

  // Chef 1 toque
  {
    title: "Sophie Brasseur",
    slug: "sophie-brasseur",
    nbToques: 1,
    note: "13",
    noteDescription: "Une très bonne table",
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    activity: ["Cheffe"],
    distinction: ["Jeune Talent 2024"],
    establishmentType: "Restaurant",
    establishmentTitle: "L'Atelier Gourmand"
  },

  // Cheffe 0 toque (sélectionné)
  {
    title: "Kwen Liew",
    slug: "kwen-liew",
    nbToques: 0,
    note: "12,5",
    noteDescription: "Sélectionné",
    thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
    activity: ["Cheffe"],
    establishmentType: "Restaurant",
    establishmentTitle: "Pertinence"
  },

  // Personne sponsorisée (nbToques = -1)
  {
    title: "Marc Durand",
    slug: "marc-durand",
    nbToques: -1,
    noteDescription: "Sponsorisé",
    thumbId: "f54d02ac-15a5-46bc-9f1d-3f0a58ff5a41",
    activity: ["Chef"],
    establishmentType: "Restaurant",
    establishmentTitle: "Le Bistrot du Marché"
  },

  // Pâtissier avec toques
  {
    title: "Cédric Grolet",
    slug: "cedric-grolet",
    nbToques: 4,
    note: "17",
    noteDescription: "Table de prestige",
    thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
    activity: ["Pâtissier"],
    distinction: ["Meilleur Pâtissier du Monde 2018"],
    establishmentType: "Restaurant",
    establishmentTitle: "Le Meurice"
  },

  // Chef Pâtissier
  {
    title: "Jessica Préalpato",
    slug: "jessica-prealpato",
    nbToques: 5,
    note: "18",
    noteDescription: "Table d'exception",
    thumbId: "01d3cfef-738f-4fff-9684-4a7583af9f6b",
    activity: ["Cheffe Pâtissière"],
    distinction: ["Meilleure Pâtissière du Monde 2019"],
    establishmentType: "Restaurant",
    establishmentTitle: "Plaza Athénée"
  },

  // Sommelier
  {
    title: "Paolo Basso",
    slug: "paolo-basso",
    thumbId: "7d46b9c8-93c6-4035-963e-fdbba06bccd3",
    activity: ["Sommelier"],
    distinction: ["Meilleur Sommelier du Monde 2013"],
    establishmentType: "Restaurant",
    establishmentTitle: "Giancarlo Perbellini Restaurant"
  },

  // Directeur de salle et Sommelier
  {
    title: "Antoine Petrus",
    slug: "antoine-petrus",
    nbToques: 3,
    note: "16",
    noteDescription: "Grande table",
    thumbId: "4763a23b-2508-4a51-9cae-53b4da465f87",
    activity: ["Directeur de Salle", "Sommelier"],
    distinction: ["Maître d'Hôtel de l'Année"],
    establishmentType: "Restaurant",
    establishmentTitle: "Le Pré Catelan"
  },

  // Artisan Boulanger avec distinction
  {
    title: "Dominique Anract",
    slug: "dominique-anract",
    thumbId: "59fd20f3-5cfb-4587-b0ca-bfd9a7a2e686",
    activity: ["Boulanger"],
    distinction: ["Meilleur Ouvrier de France", "Champion du Monde de Boulangerie"],
    establishmentType: "Artisan",
    establishmentTitle: "Boulangerie Anract"
  },

  // Artisan Fromager
  {
    title: "Xavier Boisserie",
    slug: "xavier-boisserie",
    thumbId: "6c7906d9-3ab7-434d-90e1-4d1f7f3bd98b",
    activity: ["Fromager-Affineur"],
    distinction: ["Meilleur Ouvrier de France"],
    establishmentType: "Artisan",
    establishmentTitle: "Fromagerie Boisserie"
  },

  // Artisan Chocolatier
  {
    title: "Patrick Roger",
    slug: "patrick-roger",
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    activity: ["Chocolatier", "Sculpteur"],
    distinction: ["Meilleur Ouvrier de France"],
    establishmentType: "Artisan",
    establishmentTitle: "Patrick Roger Chocolatier"
  },

  // Vigneron
  {
    title: "Didier Gimonnet",
    slug: "didier-gimonnet",
    thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
    activity: ["Vigneron", "Chef de Cave"],
    distinction: ["Vigneron de l'Année"],
    establishmentType: "Winery",
    establishmentTitle: "Pierre Gimonnet et Fils"
  },

  // Chef d'Hôtel
  {
    title: "Marie-Charlotte Delmas",
    slug: "marie-charlotte-delmas",
    thumbId: "f54d02ac-15a5-46bc-9f1d-3f0a58ff5a41",
    activity: ["Directrice"],
    establishmentType: "Hotel",
    establishmentTitle: "Hôtel Georges Blanc"
  },

  // Chef sans établissement (consultant)
  {
    title: "Thierry Marx",
    slug: "thierry-marx",
    nbToques: 5,
    note: "18",
    noteDescription: "Table d'exception",
    thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
    activity: ["Chef", "Consultant"],
    distinction: ["Chef Étoilé", "Entrepreneur"]
  },

  // Personne avec DONNÉES TRÈS LONGUES pour tester le multiligne
  {
    title: "Jean-Pierre Alexandre Emmanuel de la Rochefoucauld",
    slug: "jean-pierre-alexandre-emmanuel-de-la-rochefoucauld",
    nbToques: 5,
    note: "18,5",
    noteDescription: "Table d'exception reconnue internationalement pour sa cuisine d'avant-garde et sa créativité sans limites",
    thumbId: "01d3cfef-738f-4fff-9684-4a7583af9f6b",
    activity: [
      "Chef Exécutif",
      "Directeur Culinaire",
      "Consultant International",
      "Formateur",
      "Auteur Gastronomique"
    ],
    distinction: [
      "Cuisinier de l'Année 2024",
      "Meilleur Ouvrier de France",
      "Grand Prix de l'Art Culinaire",
      "Chevalier de l'Ordre du Mérite Agricole",
      "Prix Innovation Gastronomique Internationale"
    ],
    establishmentType: "Restaurant",
    establishmentTitle: "L'Extraordinaire Maison Gastronomique de la Haute Cuisine Française et des Saveurs d'Exception"
  },

  // Jeune cheffe prometteuse
  {
    title: "Amandine Chaignot",
    slug: "amandine-chaignot",
    nbToques: 2,
    note: "15",
    noteDescription: "Très bonne table",
    thumbId: "7d46b9c8-93c6-4035-963e-fdbba06bccd3",
    activity: ["Cheffe"],
    distinction: ["Grand de Demain", "Jeune Talent 2022"],
    establishmentType: "Restaurant",
    establishmentTitle: "Pouliche"
  }
];


