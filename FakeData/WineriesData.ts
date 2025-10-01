/**
 * Collection complète de wineries mockées pour tester tous les cas de figure
 * - Avec/sans producerCategory (WINE, CHAMPAGNE, etc.)
 * - isGmSelected true/false (sélectionné GM ou sponsorisé)
 * - Avec/sans thumbId
 * - Avec/sans openingPeriods (horaires variés, fermé certains jours)
 * - Avec/sans address
 * - Avec/sans productions (1 à plusieurs types)
 * - Avec/sans services (0 à plusieurs services)
 * - Avec/sans distance
 * - Données très longues pour tester le multiligne
 */

import { WineryProps, ProductKind } from "@/components/cards/types";

export const WineriesData: WineryProps[] = [
  // Domaine complet - Vin Bourgogne - GM Selected - Avec distance
  {
    title: "Domaine de la Romanée-Conti",
    slug: "domaine-romanee-conti-bourgogne",
    isGmSelected: true,
    producerCategory: ProductKind.WINE,
    thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
    openingPeriods: {
      monday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "18:00" }],
      tuesday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "18:00" }],
      wednesday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "18:00" }],
      thursday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "18:00" }],
      friday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "18:00" }],
      saturday: [{ begin: "09:00", end: "12:00" }],
      sunday: []
    },
    address: "21220 Vosne-Romanée",
    productions: ["rouge", "blanc"],
    services: ["dégustation", "visite guidée sur rendez-vous", "vente directe"],
    distance: "2.3 km"
  },

  // Champagne - GM Selected - Ouvert 7j/7 - Nombreux services
  {
    title: "Champagne Ruinart",
    slug: "champagne-ruinart-reims",
    isGmSelected: true,
    producerCategory: ProductKind.CHAMPAGNE,
    thumbId: "4763a23b-2508-4a51-9cae-53b4da465f87",
    openingPeriods: {
      monday: [{ begin: "10:00", end: "18:00" }],
      tuesday: [{ begin: "10:00", end: "18:00" }],
      wednesday: [{ begin: "10:00", end: "18:00" }],
      thursday: [{ begin: "10:00", end: "18:00" }],
      friday: [{ begin: "10:00", end: "18:00" }],
      saturday: [{ begin: "10:00", end: "18:00" }],
      sunday: [{ begin: "10:00", end: "18:00" }]
    },
    address: "4 Rue des Crayères, 51100 Reims",
    productions: ["champagne blanc de blancs", "champagne rosé", "champagne millésimé"],
    services: ["dégustation", "visite des caves", "boutique", "restaurant", "musée", "espace événementiel"],
  },

  // Domaine blanc uniquement - Fermé week-end - Services limités
  {
    title: "Domaine Leflaive",
    slug: "domaine-leflaive-puligny-montrachet",
    isGmSelected: true,
    producerCategory: ProductKind.WINE,
    thumbId: "01d3cfef-738f-4fff-9684-4a7583af9f6b",
    openingPeriods: {
      monday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "17:30" }],
      tuesday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "17:30" }],
      wednesday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "17:30" }],
      thursday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "17:30" }],
      friday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "17:30" }],
      saturday: [],
      sunday: []
    },
    address: "21190 Puligny-Montrachet",
    productions: ["blanc"],
    services: ["vente directe", "visite sur rendez-vous uniquement"],
    distance: "5.1 km"
  },

  // Château Bordeaux - Sponsorisé (non GM) - Sans distance
  {
    title: "Château Margaux",
    slug: "chateau-margaux-bordeaux",
    isGmSelected: false,
    producerCategory: ProductKind.WINE,
    thumbId: "f54d02ac-15a5-46bc-9f1d-3f0a58ff5a41",
    openingPeriods: {
      monday: [{ begin: "10:00", end: "12:00" }, { begin: "14:00", end: "16:00" }],
      tuesday: [{ begin: "10:00", end: "12:00" }, { begin: "14:00", end: "16:00" }],
      wednesday: [{ begin: "10:00", end: "12:00" }, { begin: "14:00", end: "16:00" }],
      thursday: [{ begin: "10:00", end: "12:00" }, { begin: "14:00", end: "16:00" }],
      friday: [{ begin: "10:00", end: "12:00" }, { begin: "14:00", end: "16:00" }],
      saturday: [],
      sunday: []
    },
    address: "33460 Margaux",
    productions: ["rouge", "blanc"],
    services: ["visite guidée", "dégustation premium"],
  },

  // Domaine Alsace - GM Selected - Production variée - Distance longue
  {
    title: "Domaine Zind-Humbrecht",
    slug: "domaine-zind-humbrecht-alsace",
    isGmSelected: true,
    producerCategory: ProductKind.WINE,
    thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
    openingPeriods: {
      monday: [{ begin: "08:00", end: "12:00" }, { begin: "13:30", end: "17:00" }],
      tuesday: [{ begin: "08:00", end: "12:00" }, { begin: "13:30", end: "17:00" }],
      wednesday: [{ begin: "08:00", end: "12:00" }, { begin: "13:30", end: "17:00" }],
      thursday: [{ begin: "08:00", end: "12:00" }, { begin: "13:30", end: "17:00" }],
      friday: [{ begin: "08:00", end: "12:00" }, { begin: "13:30", end: "17:00" }],
      saturday: [{ begin: "09:00", end: "12:00" }],
      sunday: []
    },
    address: "68230 Turckheim",
    productions: ["riesling", "gewurztraminer", "pinot gris", "muscat", "vendanges tardives"],
    services: ["dégustation gratuite", "vente directe", "expédition France et étranger"],
    distance: "12.7 km"
  },

  // Champagne - Sans producerCategory - Sponsorisé
  {
    title: "Champagne Bollinger",
    slug: "champagne-bollinger",
    isGmSelected: false,
    thumbId: "679d9d7a-b2e9-42d7-8709-9f4356066580",
    openingPeriods: {
      monday: [],
      tuesday: [{ begin: "10:00", end: "17:00" }],
      wednesday: [{ begin: "10:00", end: "17:00" }],
      thursday: [{ begin: "10:00", end: "17:00" }],
      friday: [{ begin: "10:00", end: "17:00" }],
      saturday: [{ begin: "10:00", end: "17:00" }],
      sunday: []
    },
    address: "16 Rue Jules Lobet, 51160 Aÿ-Champagne",
    productions: ["champagne brut", "champagne rosé", "champagne grande année"],
    services: ["visite guidée", "dégustation payante", "boutique"],
    distance: "0.8 km"
  },

  // Domaine Val de Loire - Sans image - GM Selected
  {
    title: "Domaine Huet",
    slug: "domaine-huet-vouvray",
    isGmSelected: true,
    producerCategory: ProductKind.WINE,
    openingPeriods: {
      monday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "18:00" }],
      tuesday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "18:00" }],
      wednesday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "18:00" }],
      thursday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "18:00" }],
      friday: [{ begin: "09:00", end: "12:00" }, { begin: "14:00", end: "18:00" }],
      saturday: [{ begin: "10:00", end: "12:00" }],
      sunday: []
    },
    address: "37210 Vouvray",
    productions: ["vouvray sec", "vouvray demi-sec", "vouvray moelleux", "pétillant"],
    services: ["dégustation", "vente directe", "visite des caves troglodytiques"],
    distance: "18.5 km"
  },

  // Rhône - Sans horaires - GM Selected
  {
    title: "Domaine Jean-Louis Chave",
    slug: "domaine-chave-hermitage",
    isGmSelected: true,
    producerCategory: ProductKind.WINE,
    thumbId: "59fd20f3-5cfb-4587-b0ca-bfd9a7a2e686",
    address: "37 Avenue du Docteur Paul Durand, 07300 Mauves",
    productions: ["hermitage rouge", "hermitage blanc", "saint-joseph"],
    services: ["vente directe sur rendez-vous uniquement"],
  },

  // Domaine Provence - Sans services - Sponsorisé
  {
    title: "Château d'Esclans",
    slug: "chateau-esclans-provence",
    isGmSelected: false,
    producerCategory: ProductKind.WINE,
    thumbId: "82e5954e-cc61-4d53-aea7-1c7d532faeba",
    openingPeriods: {
      monday: [{ begin: "10:00", end: "18:00" }],
      tuesday: [{ begin: "10:00", end: "18:00" }],
      wednesday: [{ begin: "10:00", end: "18:00" }],
      thursday: [{ begin: "10:00", end: "18:00" }],
      friday: [{ begin: "10:00", end: "18:00" }],
      saturday: [{ begin: "10:00", end: "18:00" }],
      sunday: [{ begin: "10:00", end: "18:00" }]
    },
    address: "2066 Route de la Motte, 83920 La Motte",
    productions: ["rosé", "blanc"],
    distance: "3.2 km"
  },

  // Minimal - Juste titre et slug - GM Selected
  {
    title: "Domaine de la Vougeraie",
    slug: "domaine-vougeraie",
    isGmSelected: true,
  },

  // Sans productions - GM Selected - Avec distance
  {
    title: "Château Pichon Baron",
    slug: "chateau-pichon-baron-pauillac",
    isGmSelected: true,
    producerCategory: ProductKind.WINE,
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    openingPeriods: {
      monday: [{ begin: "09:30", end: "12:30" }, { begin: "14:00", end: "17:30" }],
      tuesday: [{ begin: "09:30", end: "12:30" }, { begin: "14:00", end: "17:30" }],
      wednesday: [{ begin: "09:30", end: "12:30" }, { begin: "14:00", end: "17:30" }],
      thursday: [{ begin: "09:30", end: "12:30" }, { begin: "14:00", end: "17:30" }],
      friday: [{ begin: "09:30", end: "12:30" }, { begin: "14:00", end: "17:30" }],
      saturday: [],
      sunday: []
    },
    address: "33250 Pauillac",
    services: ["visite guidée du château", "dégustation commentée", "boutique"],
    distance: "45.2 km"
  },

  // Champagne Grower - Ouverture limitée - GM Selected
  {
    title: "Pierre Gimonnet et Fils",
    slug: "pierre-gimonnet-et-fils-cuis",
    isGmSelected: true,
    producerCategory: ProductKind.CHAMPAGNE,
    thumbId: "6c7906d9-3ab7-434d-90e1-4d1f7f3bd98b",
    openingPeriods: {
      monday: [],
      tuesday: [],
      wednesday: [{ begin: "10:00", end: "12:00" }, { begin: "14:00", end: "17:00" }],
      thursday: [{ begin: "10:00", end: "12:00" }, { begin: "14:00", end: "17:00" }],
      friday: [{ begin: "10:00", end: "12:00" }, { begin: "14:00", end: "17:00" }],
      saturday: [{ begin: "10:00", end: "12:00" }],
      sunday: []
    },
    address: "51530 Cuis",
    productions: ["champagne blanc de blancs", "champagne premier cru"],
    services: ["dégustation", "vente directe"],
    distance: "1.2 km"
  },

  // STRESS TEST - Nom très long - Adresse longue - Nombreuses productions et services
  {
    title: "Domaine de l'Excellence Viticole et Œnologique du Terroir Bourguignon Exceptionnel",
    slug: "domaine-excellence-viticole-oenologique-terroir-bourguignon",
    isGmSelected: true,
    producerCategory: ProductKind.WINE,
    thumbId: "10238744-04ae-44e5-b377-98f267324da6",
    openingPeriods: {
      monday: [{ begin: "08:30", end: "12:30" }, { begin: "13:30", end: "18:30" }],
      tuesday: [{ begin: "08:30", end: "12:30" }, { begin: "13:30", end: "18:30" }],
      wednesday: [{ begin: "08:30", end: "12:30" }, { begin: "13:30", end: "18:30" }],
      thursday: [{ begin: "08:30", end: "12:30" }, { begin: "13:30", end: "18:30" }],
      friday: [{ begin: "08:30", end: "12:30" }, { begin: "13:30", end: "18:30" }],
      saturday: [{ begin: "09:00", end: "13:00" }, { begin: "14:00", end: "19:00" }],
      sunday: [{ begin: "10:00", end: "13:00" }, { begin: "15:00", end: "18:00" }]
    },
    address: "123 Route des Grands Crus Classés et des Appellations d'Origine Contrôlée, Hameau de la Vigne Dorée, 21220 Gevrey-Chambertin",
    productions: ["rouge grand cru", "rouge premier cru", "rouge village", "blanc grand cru", "blanc premier cru", "crémant de bourgogne", "marc de bourgogne", "ratafia"],
    services: ["dégustation commentée", "visite guidée des caves", "visite des vignes en tracteur", "atelier d'assemblage", "cours d'œnologie", "boutique", "restaurant gastronomique", "hébergement", "séminaires", "mariages", "expédition internationale"],
    distance: "127.8 km"
  },

  // Domaine bio - GM Selected - Services écologiques
  {
    title: "Domaine Leroy",
    slug: "domaine-leroy-bourgogne",
    isGmSelected: true,
    producerCategory: ProductKind.WINE,
    thumbId: "f54d02ac-15a5-46bc-9f1d-3f0a58ff5a41",
    openingPeriods: {
      monday: [],
      tuesday: [{ begin: "09:00", end: "12:00" }],
      wednesday: [{ begin: "09:00", end: "12:00" }],
      thursday: [{ begin: "09:00", end: "12:00" }],
      friday: [{ begin: "09:00", end: "12:00" }],
      saturday: [],
      sunday: []
    },
    address: "21700 Vosne-Romanée",
    productions: ["rouge biodynamique", "blanc biodynamique"],
    services: ["vente directe sur rendez-vous", "certification biodynamie Demeter"],
    distance: "2.1 km"
  },

  // Domaine Languedoc - Sans producerCategory - GM Selected
  {
    title: "Domaine de la Grange des Pères",
    slug: "grange-des-peres-languedoc",
    isGmSelected: true,
    thumbId: "7d46b9c8-93c6-4035-963e-fdbba06bccd3",
    openingPeriods: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [{ begin: "14:00", end: "17:00" }],
      saturday: [],
      sunday: []
    },
    address: "34150 Aniane",
    productions: ["rouge", "blanc"],
    services: ["vente directe sur rendez-vous uniquement"],
    distance: "156.3 km"
  },
];
