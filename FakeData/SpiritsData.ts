// Mock data pour les cartes de produits (spirits)
// Note: Les composants n'ont pas encore d'interfaces définies
// Nous utilisons une structure basique pour les tests

export interface SpiritProps {
  title: string;
  slug: string;
  thumbId?: string;
  type: 'champagne' | 'wine' | 'whisky' | 'cognac' | 'armagnac' | 'calvados' | 'rum';
  producer?: string;
  region?: string;
  year?: string;
  price?: string;
  rating?: string;
}

export const ChampagnesData: SpiritProps[] = [
  {
    title: "Dom Pérignon Vintage 2013",
    slug: "dom-perignon-vintage-2013",
    thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
    type: "champagne",
    producer: "Moët & Chandon",
    region: "Champagne",
    year: "2013",
    price: "180€",
    rating: "18/20"
  },
  {
    title: "Krug Grande Cuvée",
    slug: "krug-grande-cuvee",
    thumbId: "4763a23b-2508-4a51-9cae-53b4da465f87",
    type: "champagne",
    producer: "Krug",
    region: "Champagne",
    price: "220€",
    rating: "19/20"
  },
];

export const WinesData: SpiritProps[] = [
  {
    title: "Château Margaux 2015",
    slug: "chateau-margaux-2015",
    thumbId: "01d3cfef-738f-4fff-9684-4a7583af9f6b",
    type: "wine",
    producer: "Château Margaux",
    region: "Bordeaux",
    year: "2015",
    price: "850€",
    rating: "20/20"
  },
  {
    title: "Romanée-Conti 2018",
    slug: "romanee-conti-2018",
    thumbId: "f54d02ac-15a5-46bc-9f1d-3f0a58ff5a41",
    type: "wine",
    producer: "Domaine de la Romanée-Conti",
    region: "Bourgogne",
    year: "2018",
    price: "15000€",
    rating: "20/20"
  },
];

export const WhiskiesData: SpiritProps[] = [
  {
    title: "Macallan 25 ans",
    slug: "macallan-25-ans",
    thumbId: "59fd20f3-5cfb-4587-b0ca-bfd9a7a2e686",
    type: "whisky",
    producer: "Macallan",
    region: "Speyside, Écosse",
    year: "25 ans",
    price: "1800€",
    rating: "19/20"
  },
  {
    title: "Yamazaki 18 ans",
    slug: "yamazaki-18-ans",
    thumbId: "6c7906d9-3ab7-434d-90e1-4d1f7f3bd98b",
    type: "whisky",
    producer: "Suntory",
    region: "Osaka, Japon",
    year: "18 ans",
    price: "450€",
    rating: "18/20"
  },
];

export const CognacsData: SpiritProps[] = [
  {
    title: "Rémy Martin Louis XIII",
    slug: "remy-martin-louis-xiii",
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    type: "cognac",
    producer: "Rémy Martin",
    region: "Cognac",
    price: "3500€",
    rating: "19/20"
  },
  {
    title: "Hennessy Paradis Impérial",
    slug: "hennessy-paradis-imperial",
    thumbId: "7d46b9c8-93c6-4035-963e-fdbba06bccd3",
    type: "cognac",
    producer: "Hennessy",
    region: "Cognac",
    price: "2800€",
    rating: "18/20"
  },
];

export const ArmagnacsData: SpiritProps[] = [
  {
    title: "Darroze 1978",
    slug: "darroze-1978",
    thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
    type: "armagnac",
    producer: "Francis Darroze",
    region: "Gascogne",
    year: "1978",
    price: "450€",
    rating: "18/20"
  },
];

export const CalvadosData: SpiritProps[] = [
  {
    title: "Calvados Père Magloire XO",
    slug: "calvados-pere-magloire-xo",
    thumbId: "82e5954e-cc61-4d53-aea7-1c7d532faeba",
    type: "calvados",
    producer: "Père Magloire",
    region: "Normandie",
    price: "85€",
    rating: "17/20"
  },
];

export const RumsData: SpiritProps[] = [
  {
    title: "Diplomatico Reserva Exclusiva",
    slug: "diplomatico-reserva-exclusiva",
    thumbId: "9c8047f8-df57-49f3-b178-e6780bcae448",
    type: "rum",
    producer: "Diplomatico",
    region: "Venezuela",
    price: "55€",
    rating: "17/20"
  },
  {
    title: "Zacapa Centenario 23",
    slug: "zacapa-centenario-23",
    thumbId: "374cbf78-ff32-407f-b933-59a2d7550c94",
    type: "rum",
    producer: "Zacapa",
    region: "Guatemala",
    year: "23 ans",
    price: "70€",
    rating: "18/20"
  },
];
