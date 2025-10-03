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

import { WineryProps, ProductKind } from "@/types/Winery";

export const WineriesData: WineryProps[] = [
  {
    title: "Bourdaire Gallois",
    slug: "bourdaire-gallois",
    isGmSelected: true,
    producerCategory: ProductKind.CHAMPAGNE,
    thumbId: "d12d23ed-7500-44e6-8a6e-d6965b6d37d2",
    address: "51220 POUILLON",
    productions: ["Biologique"],
    services: ["Vente sur place", "Visites organisées"],
    openingPeriods: {
      monday: [],
      tuesday: [{ begin: "09:00", end: "12:00" }],
      wednesday: [{ begin: "09:00", end: "12:00" }],
      thursday: [{ begin: "09:00", end: "12:00" }],
      friday: [{ begin: "09:00", end: "12:00" }],
      saturday: [],
      sunday: [],
    },
  },
  {
    title: "Bourgeois Test Diaz-daniel Test Diaz-daniel Test Diaz-daniel",
    slug: "bourgeois-diaz",
    isGmSelected: true,
    producerCategory: ProductKind.CHAMPAGNE,
    thumbId: "77539208-9050-4eda-a471-380b72ca93bf",
    address: "02310 CROUTTES-SUR-MARNE",
    productions: ["Biodynamie"],
    services: ["Hébergement", "Vente sur place"],
    openingPeriods: {
      monday: [],
      tuesday: [{ begin: "09:00", end: "12:00" }],
      wednesday: [{ begin: "09:00", end: "12:00" }],
      thursday: [{ begin: "09:00", end: "12:00" }],
      friday: [{ begin: "09:00", end: "12:00" }],
      saturday: [],
      sunday: [],
    },
  },
  {
    title: "Boutillez Marchand",
    slug: "boutillez-marchand",
    isGmSelected: true,
    producerCategory: ProductKind.CHAMPAGNE,
    thumbId: "77b396b6-3255-4a62-a711-0bd00f16e236",
    address: "51380 VILLERS-MARMERY",
    productions: ["Conventionnel", "Raisonné"],
    services: ["Vente sur place", "Visites organisées"],
    openingPeriods: {
      monday: [],
      tuesday: [{ begin: "09:00", end: "12:00" }],
      wednesday: [{ begin: "09:00", end: "12:00" }],
      thursday: [{ begin: "09:00", end: "12:00" }],
      friday: [{ begin: "09:00", end: "12:00" }],
      saturday: [],
      sunday: [],
    },
  },
  {
    title: "Briaux Lenique",
    slug: "briaux-lenique",
    isGmSelected: true,
    producerCategory: ProductKind.CHAMPAGNE,
    thumbId: "d47bab5d-32eb-424c-904e-97fa1fe1b8e2",
    address: "51530 MARDEUIL",
    productions: ["Champagne VDC", "HVE3"],
    services: ["Vente sur place"],
    openingPeriods: {
      monday: [],
      tuesday: [{ begin: "09:00", end: "12:00" }],
      wednesday: [{ begin: "09:00", end: "12:00" }],
      thursday: [{ begin: "09:00", end: "12:00" }],
      friday: [{ begin: "09:00", end: "12:00" }],
      saturday: [],
      sunday: [],
    },
  },
  {
    title: "Brice",
    slug: "brice",
    isGmSelected: true,
    producerCategory: ProductKind.CHAMPAGNE,
    address: "51150 BOUZY",
    productions: ["Biologique", "HVE3"],
    services: ["Vente sur place", "Visites organisées"],
    openingPeriods: {
      monday: [],
      tuesday: [{ begin: "09:00", end: "12:00" }],
      wednesday: [{ begin: "09:00", end: "12:00" }],
      thursday: [{ begin: "09:00", end: "12:00" }],
      friday: [{ begin: "09:00", end: "12:00" }],
      saturday: [],
      sunday: [],
    },
  },
  {
    title: "Brigitte Beaufort",
    slug: "brigitte-beaufort",
    isGmSelected: true,
    producerCategory: ProductKind.CHAMPAGNE,
    address: "51150 BOUZY",
    productions: ["Champagne VDC", "HVE3"],
    services: ["Vente sur place", "Visites organisées"],
    openingPeriods: {
      monday: [],
      tuesday: [{ begin: "09:00", end: "12:00" }],
      wednesday: [{ begin: "09:00", end: "12:00" }],
      thursday: [{ begin: "09:00", end: "12:00" }],
      friday: [{ begin: "09:00", end: "12:00" }],
      saturday: [],
      sunday: [],
    },
  },
];
