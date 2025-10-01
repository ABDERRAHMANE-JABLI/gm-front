// Mock data pour ThePlaceCard
// Note: ThePlaceCard n'a pas encore d'interface définie dans types.ts
// Nous utilisons une structure basique pour les tests

export interface PlaceProps {
  title: string;
  slug: string;
  thumbId?: string;
  category?: string;
  address?: string;
  description?: string;
}

export const PlacesData: PlaceProps[] = [
  {
    title: "Les Halles de Lyon Paul Bocuse",
    slug: "halles-lyon-paul-bocuse",
    thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
    category: "Marché couvert",
    address: "102 Cours Lafayette, 69003 Lyon",
    description: "Le temple de la gastronomie lyonnaise"
  },
  {
    title: "Marché Président Wilson",
    slug: "marche-president-wilson-paris",
    thumbId: "4763a23b-2508-4a51-9cae-53b4da465f87",
    category: "Marché de plein air",
    address: "Avenue du Président Wilson, 75016 Paris",
    description: "L'un des plus beaux marchés de Paris"
  },
  {
    title: "Marché de la Condamine",
    slug: "marche-condamine-monaco",
    thumbId: "01d3cfef-738f-4fff-9684-4a7583af9f6b",
    category: "Marché traditionnel",
    address: "Place d'Armes, 98000 Monaco",
    description: "Le marché historique de la Principauté"
  },
];
