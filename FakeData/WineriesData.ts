import { WineryProps, ProductKind } from "@/components/cards/types";

export const WineriesData: WineryProps[] = [
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
    services: ["dégustation", "visite des caves", "boutique", "restaurant"],
  },
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
];
