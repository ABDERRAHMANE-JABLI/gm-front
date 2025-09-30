import ChampagneCardProps from "@/types/product/champagne";

export const ChampagneData: ChampagneCardProps[] = [
  {
    slug: "gosset-21-ans-cave",
    domainSlug: "gosset",
    brand: "Gosset",
    title: "21 ans de cave a minima",
    note: "96",
    thumbId: "b026a008-c77f-48b9-b129-ddebf1fdd743",
    featured: false,
    vintage: "BSA",
    type: "Extra-brut",
    classification: "Blanc",
    priceRange: "Plus de 101€",
    supportfavorite: false
  },
  {
    slug: "leclerc-briant-abyss-rose",
    domainSlug: "leclerc-briant",
    brand: "Leclerc Briant",
    title: "Abyss Rosé",
    note: "96",
    thumbId: "2d7f8076-58f4-4a75-a77e-cd586fb95919",
    featured: false,
    vintage: "2018",
    type: "Brut nature",
    classification: "Rosé",
    varieties: {
      Chardonnay: 85,
      "Pinot Noir": 15
    },
    priceRange: "Plus de 101€",
    supportfavorite: false
  },
  {
    slug: "alfred-gratien-cuvee-paradis",
    domainSlug: "alfred-gratien",
    brand: "Alfred Gratien",
    title: "Cuvée Paradis",
    note: "96",
    thumbId: "33936c1c-cd99-4ffe-bcdb-33341bfa217d",
    featured: false,
    vintage: "2015",
    type: "Brut",
    classification: "Blanc",
    varieties: {
      Chardonnay: 60,
      "Pinot Noir": 40
    },
    supportfavorite: false
  }
];
