/**
 * Collection complète de spiritueux et vins mockés
 */

import type ChampagneCardProps from "@/types/product/champagne";
import type WineCardProps from "@/types/product/wine";
import type { ColorCode } from "@/types/product/wine";
import type WhiskyCardProps from "@/types/product/whisky";
import type CognacCardProps from "@/types/product/cognac";
import type ArmagnacCardProps from "@/types/product/armagnac";
import type CalvadosCardProps from "@/types/product/calvados";
import type RumCardProps from "@/types/product/rum";

// CHAMPAGNES - 8 champagnes
export const ChampagnesData: ChampagneCardProps[] = [
  {
    slug: "dom-perignon-2013",
    domainSlug: "moet-chandon",
    brand: "Moët & Chandon",
    title: "Dom Pérignon",
    note: "96",
    thumbId: "879d6573-c91e-4f57-af74-e34bc9a79e0c",
    featured: true,
    vintage: "2013",
    type: "Brut",
    classification: "Grand Cru",
    varieties: { "Chardonnay": 50, "Pinot Noir": 50 },
    priceRange:"20-30€"
  },
  {
    slug: "bollinger-special-cuvee",
    domainSlug: "bollinger",
    brand: "Bollinger",
    title: "Spécial Cuvée",
    note: "93",
    thumbId: "ed0fecaa-1265-4136-9f25-87dcc17e3cb1",
    featured: true,
    vintage: "NM",
    type: "Extra Brut",
    priceRange:"20-30€"
  },
  {
    slug: "salon-2015",
    domainSlug: "salon",
    brand: "Salon",
    title: "Blanc de Blancs Le Mesnil",
    note: "98",
    thumbId: "78fef956-cd4a-4fe1-ad2b-12cecd371a8d",
    featured: true,
    vintage: "2015",
    type: "Blanc de Blancs",
    classification: "Premier Cru",
    varieties: { "Chardonnay": 100 },
    priceRange:"20-30€"
  },
  {
    slug: "veuve-clicquot-rose",
    domainSlug: "veuve-clicquot",
    brand: "Veuve Clicquot",
    title: "Rosé",
    note: "90",
    thumbId: "9cf5b309-8e91-4482-99a9-bbcffe5e99e2",
    featured: false,
    vintage: "NM",
    type: "Rosé",
    priceRange:"20-30€"
  },
  {
    slug: "taittinger-brut-reserve",
    domainSlug: "taittinger",
    brand: "Taittinger",
    title: "Brut Réserve",
    note: "89",
    thumbId: "4d8afdb0-8766-49bf-aca7-a0a75efbce12",
    featured: false,
    vintage: "BSA",
    type: "Brut",
    varieties: { "Chardonnay": 40, "Pinot Noir": 35, "Pinot Meunier": 25 },
    priceRange:"20-30€"
  },
  {
    slug: "jacques-selosse-2011",
    domainSlug: "jacques-selosse",
    brand: "Jacques Selosse",
    title: "Substance",
    note: "95",
    thumbId: "859aed74-dbf8-41d1-a901-0cce2780bd1f",
    featured: true,
    vintage: "2011",
    type: "Brut Nature",
    classification: "Grand Cru",
    priceRange:"20-30€"
  },
  {
    slug: "ruinart-blanc-de-blancs",
    domainSlug: "ruinart",
    brand: "Ruinart",
    title: "Blanc de Blancs",
    thumbId: "4d8afdb0-8766-49bf-aca7-a0a75efbce12",
    featured: false,
    vintage: "NM",
    type: "Blanc de Blancs",
    priceRange:"20-30€"
  },
  {
    slug: "champagne-tres-long-nom",
    domainSlug: "maison-longue",
    brand: "Maison avec un Nom Très Long pour Tester l'Affichage",
    title: "Cuvée Prestige Millésimée Grand Cru Blanc de Blancs Extra Brut",
    note: "94",
    thumbId: "313ac9d4-f755-4556-aab7-9a9c956c2463",
    featured: false,
    vintage: "2008",
    type: "Extra Brut",
    classification: "Grand Cru",
    priceRange:"20-30€"
  }
];

// VINS - 11 vins
export const WinesData: WineCardProps[] = [
  {
    slug: "romanee-conti-2018",
    domainSlug: "domaine-romanee-conti",
    brand: "Domaine de la Romanée-Conti",
    title: "Romanée-Conti Grand Cru",
    note: "100",
    thumbId: "c25cbded-269b-4458-9e9c-419cb8b1d37d",
    featured: true,
    vintage: "2018",
    colorCode: "Rouge" as ColorCode,
    appellation: ["Bourgogne", "Romanée-Conti AOC"],
    varieties: { "Pinot Noir": 100 },
    priceRange:"20-30€"
  },
  {
    slug: "montrachet-leflaive-2019",
    domainSlug: "domaine-leflaive",
    brand: "Domaine Leflaive",
    title: "Montrachet Grand Cru",
    note: "98",
    thumbId: "2359adc2-a6a8-4d33-893e-966171eb34f4",
    featured: true,
    vintage: "2019",
    colorCode: "Blanc" as ColorCode,
    appellation: ["Bourgogne", "Montrachet Grand Cru"],
    varieties: { "Chardonnay": 100 },
    priceRange:"20-30€"
  },
  {
    slug: "chateau-margaux-2015",
    domainSlug: "chateau-margaux",
    brand: "Château Margaux",
    title: "Château Margaux",
    note: "99",
    thumbId: "ff72d52b-148a-4987-860a-9068b40e1262",
    featured: true,
    vintage: "2015",
    colorCode: "Rouge" as ColorCode,
    appellation: ["Bordeaux", "Margaux AOC"],
    varieties: { "Sauvignon": 90, "Merlot": 7, "Petit Verdot": 2, "Cabernet Franc": 1 },
    priceRange:"20-30€"
  },
  {
    slug: "hermitage-chave-2017",
    domainSlug: "domaine-chave",
    brand: "Jean-Louis Chave",
    title: "Hermitage",
    note: "96",
    thumbId: "76ef9c4c-1b5e-4965-b67f-267f6fae5454",
    featured: true,
    vintage: "2017",
    colorCode: "Rouge" as ColorCode,
    appellation: ["Rhône", "Hermitage AOC"],
    priceRange:"20-30€"
  },
  {
    slug: "vouvray-huet-2020",
    domainSlug: "domaine-huet",
    brand: "Domaine Huet",
    title: "Vouvray Moelleux Le Mont",
    note: "92",
    thumbId: "cd0f7c77-f2e8-445e-a023-4d27b78bbd86",
    featured: false,
    vintage: "2020",
    colorCode: "Blanc" as ColorCode,
    appellation: ["Loire", "Vouvray AOC"],
    varieties: { "Chenin Blanc": 100 },
    priceRange:"20-30€"
  },
  {
    slug: "provence-rose-2022",
    domainSlug: "chateau-minuty",
    brand: "Château Minuty",
    title: "Cuvée Prestige Rosé",
    note: "88",
    thumbId: "7291863b-79b1-423e-8159-aadb40a1a2f8",
    featured: false,
    vintage: "2022",
    colorCode: "Rosé" as ColorCode,
    appellation: ["Provence", "Côtes de Provence AOC"]
  },
  {
    slug: "riesling-zind-humbrecht-2019",
    domainSlug: "zind-humbrecht",
    brand: "Zind-Humbrecht",
    title: "Riesling Grand Cru Rangen",
    note: "94",
    thumbId: "76ef9c4c-1b5e-4965-b67f-267f6fae5454",
    featured: true,
    vintage: "2019",
    colorCode: "Blanc" as ColorCode,
    appellation: ["Alsace", "Alsace Grand Cru Rangen AOC"],
    varieties: { "Riesling": 100 }
  },
  {
    slug: "vin-orange-radikon",
    domainSlug: "radikon",
    brand: "Radikon",
    title: "Oslavje",
    thumbId: "c89ecc82-aac6-420b-9a80-4bdf612194eb",
    featured: false,
    colorCode: "Orange" as ColorCode,
    appellation: ["Vin de France"]
  },
  {
    slug: "cremant-bourgogne-2021",
    domainSlug: "louis-picamelot",
    brand: "Louis Picamelot",
    title: "Crémant de Bourgogne Brut",
    note: "87",
    thumbId: "4de81533-f095-4e8e-ba8a-f15a44b5cf94",
    featured: false,
    vintage: "2021",
    colorCode: "Blanc" as ColorCode,
    appellation: ["Bourgogne", "Crémant de Bourgogne AOC"]
  },
  {
    slug: "sancerre-vacheron-2021",
    domainSlug: "domaine-vacheron",
    brand: "Domaine Vacheron",
    title: "Sancerre",
    note: "91",
    thumbId: "dd6a5c74-4fde-4535-8875-1bd7c74d0d2c",
    featured: false,
    vintage: "2021",
    colorCode: "Blanc" as ColorCode,
    appellation: ["Loire", "Sancerre AOC"],
    varieties: { "Sauvignon Blanc": 100 }
  },
  {
    slug: "vin-rouge-tres-long-nom",
    domainSlug: "domaine-tres-long",
    brand: "Domaine avec un Nom Extrêmement Long",
    title: "Cuvée Spéciale Grand Cru Classé Premier de la Classe Millésimé Exceptionnel",
    note: "93",
    thumbId: "3664c05b-1ee7-4641-912b-77b86a1f138e",
    featured: false,
    vintage: "2016",
    colorCode: "Rouge" as ColorCode,
    appellation: ["Bourgogne", "Chambertin Grand Cru AOC"],
    varieties: { "Pinot Noir": 100 }
  }
];

// WHISKIES - 9 whiskies
export const WhiskiesData: WhiskyCardProps[] = [
  {
    slug: "ardbeg-uigeadail",
    brand: "Ardbeg",
    title: "Uigeadail",
    note: "94",
    thumbId: "dfb9dd36-1cfc-4879-8ec1-5c3db96c3a46",
    featured: true,
    originCountry: "Écosse",
    region: "Islay",
    classification: "Single Malt",
    alcoholVolume: "54.2%",
    priceRange:"20-30€"
  },
  {
    slug: "macallan-18",
    brand: "The Macallan",
    title: "18 Years Old Sherry Oak",
    note: "95",
    thumbId: "d0f1aece-2a70-44cb-bc32-34b2e9220011",
    featured: true,
    originCountry: "Écosse",
    region: "Speyside",
    classification: "Single Malt",
    alcoholVolume: "43%",
    priceRange:"20-30€"
  },
  {
    slug: "buffalo-trace",
    brand: "Buffalo Trace",
    title: "Kentucky Straight Bourbon",
    note: "89",
    thumbId: "839cf202-45f1-47af-9d1d-b121377e3280",
    featured: false,
    originCountry: "États-Unis",
    region: "Kentucky",
    classification: "Bourbon",
    alcoholVolume: "45%",
    priceRange:"20-30€"
  },
  {
    slug: "nikka-yoichi",
    brand: "Nikka",
    title: "Yoichi Single Malt",
    note: "92",
    thumbId: "60b689c4-c3d4-4042-815d-cc934fbc3fc0",
    featured: true,
    originCountry: "Japon",
    region: "Yoichi",
    classification: "Single Malt",
    alcoholVolume: "45%"
  },
  {
    slug: "redbreast-12",
    brand: "Redbreast",
    title: "12 Year Old Cask Strength",
    note: "91",
    thumbId: "242313b6-71fe-4d56-86ab-8a47b08584ba",
    featured: false,
    originCountry: "Irlande",
    classification: "Pure Pot Still",
    alcoholVolume: "57.7%",
    priceRange:"20-30€"
  },
  {
    slug: "rittenhouse-rye",
    brand: "Rittenhouse",
    title: "Straight Rye Whisky",
    note: "88",
    thumbId: "3154ad95-fd27-41eb-8520-b82974d8e8ca",
    featured: false,
    originCountry: "États-Unis",
    region: "Kentucky",
    classification: "Rye Whiskey",
    alcoholVolume: "50%"
  },
  {
    slug: "johnnie-walker-blue",
    brand: "Johnnie Walker",
    title: "Blue Label",
    note: "93",
    thumbId: "d0f1aece-2a70-44cb-bc32-34b2e9220011",
    featured: true,
    originCountry: "Écosse",
    classification: "Blended",
    alcoholVolume: "40%"
  },
  {
    slug: "armorik-double-maturation",
    brand: "Armorik",
    title: "Double Maturation",
    note: "87",
    thumbId: "d0f1aece-2a70-44cb-bc32-34b2e9220011",
    featured: false,
    originCountry: "France",
    region: "Bretagne",
    classification: "Single Malt",
    alcoholVolume: "46%"
  },
  {
    slug: "whisky-tres-long-nom",
    brand: "Distillerie avec un Nom Très Long",
    title: "Single Malt Whisky Écossais Premium Aged in Sherry Casks Édition Limitée",
    note: "90",
    thumbId: "d0f1aece-2a70-44cb-bc32-34b2e9220011",
    featured: false,
    originCountry: "Écosse",
    region: "Highlands",
    classification: "Single Malt",
    alcoholVolume: "48%"
  }
];

// COGNACS - 7 cognacs
export const CognacsData: CognacCardProps[] = [
  {
    slug: "hennessy-xo",
    brand: "Hennessy",
    title: "XO",
    note: "94",
    thumbId: "ba0326a2-9e1b-4d21-a761-cad17c888d85",
    featured: true,
    originCountry: "France",
    region: "Charente",
    appellation: "Grande Champagne",
    alcoholVolume: "40%",
    priceRange:"20-30€"
  },
  {
    slug: "remy-martin-vsop",
    brand: "Rémy Martin",
    title: "VSOP Fine Champagne",
    note: "90",
    thumbId: "112aaff7-b7a4-4b46-be7d-1e81319c26c0",
    featured: true,
    originCountry: "France",
    region: "Charente",
    appellation: "Petite Champagne",
    alcoholVolume: "40%",
    priceRange:"20-30€"
  },
  {
    slug: "courvoisier-vs",
    brand: "Courvoisier",
    title: "VS",
    note: "86",
    thumbId: "7525feff-1e34-42fe-bb71-86f291f34b8e",
    featured: false,
    originCountry: "France",
    region: "Charente",
    appellation: "Fins Bois",
    varieties: { "Ugni Blanc": 98, "Folle Blanche": 2 },
    alcoholVolume: "40%",
    priceRange:"20-30€"
  },
  {
    slug: "delamain-hors-dage",
    brand: "Delamain",
    title: "Hors d'Âge Réserve de la Famille",
    note: "96",
    thumbId: "63b4cc16-5f6f-4802-868d-6de89695be32",
    featured: true,
    originCountry: "France",
    region: "Charente",
    appellation: "Borderies",
    alcoholVolume: "43%"
  },
  {
    slug: "louis-xiii",
    brand: "Rémy Martin",
    title: "Louis XIII",
    note: "98",
    thumbId: "64c886bd-4f8e-471f-9b1e-474cd24f2fc0",
    featured: true,
    originCountry: "France",
    region: "Charente",
    appellation: "Grande Champagne",
    alcoholVolume: "40%"
  },
  {
    slug: "martell-vsop",
    brand: "Martell",
    title: "VSOP Médaillon",
    note: "88",
    thumbId: "ae2650cf-4166-41b7-b06d-a5d6b2d1e885",
    featured: false,
    originCountry: "France",
    region: "Charente",
    alcoholVolume: "40%",
    priceRange:"20-30€"
  },
  {
    slug: "cognac-tres-long-nom",
    brand: "Maison de Cognac avec un Nom Très Long",
    title: "Cognac Hors d'Âge Grande Champagne Premier Cru Édition Limitée Numérotée",
    note: "95",
    thumbId: "d0e35d98-bf53-40e7-8fe7-531ff8ab7d0f",
    featured: false,
    originCountry: "France",
    region: "Charente",
    appellation: "Grande Champagne",
    alcoholVolume: "42%",
    priceRange:"20-30€"
  }
];

// ARMAGNACS - 6 armagnacs
export const ArmagnacsData: ArmagnacCardProps[] = [
  {
    slug: "chateau-du-tariquet-1978",
    brand: "Château du Tariquet",
    title: "Millésime 1978",
    note: "95",
    thumbId: "db7dc52c-c0e9-475e-a39f-9230e72b9793",
    featured: true,
    vintage: "1978",
    originCountry: "France",
    region: "Gascogne",
    appellation: "Bas-Armagnac",
    alcoholVolume: "42%",
    priceRange:"20-30€"
  },
  {
    slug: "janneau-vsop",
    brand: "Janneau",
    title: "VSOP",
    note: "89",
    thumbId: "2e9dd454-1b59-4cdc-96a5-7f2b04ee2540",
    featured: false,
    originCountry: "France",
    region: "Gascogne",
    appellation: "Ténarèze",
    alcoholVolume: "40%"
  },
  {
    slug: "darroze-xo",
    brand: "Darroze",
    title: "XO 20 ans d'Âge",
    note: "93",
    thumbId: "153b596b-d372-41a2-8b47-00228e074ab0",
    featured: true,
    originCountry: "France",
    region: "Gascogne",
    appellation: "Bas-Armagnac",
    varieties: { "Ugni Blanc": 60, "Baco": 30, "Colombard": 10 },
    alcoholVolume: "43%",
    priceRange:"20-30€"
  },
  {
    slug: "delord-hors-dage",
    brand: "Delord",
    title: "Hors d'Âge 25 ans",
    note: "94",
    thumbId: "18f3bf2b-45b4-4157-b553-95a6dd9739f0",
    featured: true,
    originCountry: "France",
    region: "Gascogne",
    appellation: "Bas-Armagnac",
    alcoholVolume: "40%",
    priceRange:"20-30€"
  },
  {
    slug: "baron-de-sigognac-1990",
    brand: "Baron de Sigognac",
    title: "Millésime 1990",
    note: "91",
    thumbId: "b699d14e-0a80-4063-98f0-c18e67dbd37e",
    featured: false,
    vintage: "1990",
    originCountry: "France",
    region: "Gascogne",
    appellation: "Ténarèze",
    alcoholVolume: "41%"
  },
  {
    slug: "armagnac-tres-long-nom",
    brand: "Domaine d'Armagnac avec un Nom Très Long",
    title: "Armagnac Hors d'Âge Bas-Armagnac Millésimé Édition Collector Numérotée",
    note: "92",
    thumbId: "6b95ff0e-9ba0-4149-a123-1da7e073a901",
    featured: false,
    vintage: "1985",
    originCountry: "France",
    region: "Gascogne",
    appellation: "Bas-Armagnac",
    alcoholVolume: "44%",
    priceRange:"20-30€"
  }
];

// CALVADOS - 6 calvados
export const CalvadosData: CalvadosCardProps[] = [
  {
    slug: "boulard-vsop",
    brand: "Boulard",
    title: "VSOP Pays d'Auge",
    note: "89",
    thumbId: "692836fc-2f67-4616-a9dd-938f19b1c16d",
    featured: true,
    originCountry: "France",
    region: "Normandie",
    appellation: "Calvados Pays d'Auge",
    rawMaterial: "Pommes",
    alcoholVolume: "40%",
    priceRange:"20-30€"
  },
  {
    slug: "dupont-xo",
    brand: "Domaine Dupont",
    title: "XO Domfrontais",
    note: "92",
    thumbId: "d0243d8e-6136-472f-af35-56abc9e230d9",
    featured: true,
    originCountry: "France",
    region: "Normandie",
    appellation: "Calvados Domfrontais",
    rawMaterial: "Pommes et Poires",
    alcoholVolume: "42%"
  },
  {
    slug: "pere-magloire-vieux",
    brand: "Père Magloire",
    title: "Vieux 8 ans",
    note: "87",
    thumbId: "29ae8272-ad96-4d06-88ab-4e3d6790b20a",
    featured: false,
    originCountry: "France",
    region: "Normandie",
    appellation: "AOC Calvados",
    alcoholVolume: "40%"
  },
  {
    slug: "adrien-camut-hors-dage",
    brand: "Adrien Camut",
    title: "Hors d'Âge 18 ans",
    note: "94",
    thumbId: "cb31e977-3012-4fcf-acb0-28d299f347a1",
    featured: true,
    originCountry: "France",
    region: "Normandie",
    appellation: "Calvados Pays d'Auge",
    rawMaterial: "100% Pommes normandes",
    alcoholVolume: "43%",
    priceRange:"20-30€"
  },
  {
    slug: "lemorton-xo",
    brand: "Lemorton",
    title: "XO Réserve",
    note: "90",
    thumbId: "bbd2dc11-c23e-4bcc-8def-8398619a6d85",
    featured: false,
    originCountry: "France",
    region: "Normandie",
    appellation: "Calvados Domfrontais",
    alcoholVolume: "41%",
    priceRange:"20-30€"
  },
  {
    slug: "calvados-tres-long-nom",
    brand: "Distillerie de Calvados avec un Nom Très Long",
    title: "Calvados Pays d'Auge Hors d'Âge Vieilli en Fûts de Chêne Édition Limitée",
    note: "93",
    thumbId: "e1f9b184-73d4-4c07-b8dc-aff9c781e571",
    featured: false,
    originCountry: "France",
    region: "Normandie",
    appellation: "Calvados Pays d'Auge",
    rawMaterial: "Pommes",
    alcoholVolume: "45%",
    priceRange:"20-30€"
  }
];

// RHUMS - 8 rhums
export const RumsData: RumCardProps[] = [
  {
    slug: "rhum-jm-vsop",
    brand: "Rhum J.M",
    title: "VSOP",
    note: "92",
    thumbId: "d4c64674-d208-4b4e-9682-ff1824d1a1d4",
    featured: true,
    originCountry: "Martinique",
    region: "Macouba",
    appellation: "AOC Martinique",
    rawMaterial: "Jus de canne frais",
    vintage: {
      label: "Âge",
      value: "7 ans"
    },
  },
  {
    slug: "neisson-blanc",
    brand: "Neisson",
    title: "Blanc 52.5°",
    note: "89",
    thumbId: "d897b4f9-a737-4ae4-a29c-dd494cfcf179",
    featured: false,
    originCountry: "Martinique",
    appellation: "AOC Martinique",
    rawMaterial: "Jus de canne frais",
  },
  {
    slug: "damoiseau-xo",
    brand: "Damoiseau",
    title: "XO",
    note: "90",
    thumbId: "41d3c1bf-29ac-4517-bd1e-c3b9347d54ed",
    featured: true,
    originCountry: "Guadeloupe",
    region: "Grande-Terre",
    rawMaterial: "Mélasse",
    vintage: {
      label: "Âge",
      value: "6 ans minimum",
      
    },
    priceRange:"20-30€"
  },
  {
    slug: "diplomatico-reserva",
    brand: "Diplomático",
    title: "Reserva Exclusiva",
    note: "88",
    thumbId: "9d208c36-956a-4ed1-ac1f-f4f8af483621",
    featured: false,
    originCountry: "Venezuela",
    rawMaterial: "Mélasse",
    priceRange:"20-30€"
  },
  {
    slug: "appleton-21",
    brand: "Appleton Estate",
    title: "21 Year Old",
    note: "94",
    thumbId: "14dfd764-a926-4ad3-a2d1-7a342014053b",
    featured: true,
    originCountry: "Jamaïque",
    rawMaterial: "Mélasse",
    vintage: {
      label: "Millésime",
      value: "2000"
    },
  },
  {
    slug: "don-papa-10",
    brand: "Don Papa",
    title: "10 Years Old",
    note: "86",
    thumbId: "2b06d551-e55c-4f57-b82b-0ada60dbe0d3",
    featured: false,
    originCountry: "Philippines",
    rawMaterial: "Mélasse",
    vintage: {
      label: "Âge",
      value: "10 ans"
    },
    priceRange:"20-30€"
  },
  {
    slug: "clement-1976",
    brand: "Rhum Clément",
    title: "Millésime 1976",
    note: "96",
    thumbId: "5be88968-b1b5-4c06-a97c-d62341abee29",
    featured: true,
    originCountry: "Martinique",
    appellation: "AOC Martinique",
    rawMaterial: "Jus de canne frais",
    vintage: {
      label: "Millésime",
      value: "1976"
    },
  },
  {
    slug: "rhum-tres-long-nom",
    brand: "Distillerie de Rhum avec un Nom Très Long",
    title: "Rhum Agricole AOC Martinique Vieux Hors d'Âge Vieilli en Fûts de Chêne Édition Limitée",
    note: "93",
    thumbId: "76e808cc-e38b-474d-af81-be8a3a10cc8b",
    featured: false,
    originCountry: "Martinique",
    region: "Saint-Pierre",
    appellation: "AOC Martinique",
    rawMaterial: "Jus de canne frais",
    vintage: {
      label: "Âge",
      value: "15 ans"
    },
  }
];
