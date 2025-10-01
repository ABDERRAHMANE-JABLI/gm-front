// Mock data pour RecipeCard
// Note: RecipeCard n'a pas encore d'interface définie dans types.ts
// Nous utilisons une structure basique pour les tests

export interface RecipeProps {
  title: string;
  slug: string;
  thumbId?: string;
  cookingTime?: string;
  difficulty?: string;
  servings?: number;
  category?: string;
  chefName?: string;
}

export const RecipesData: RecipeProps[] = [
  {
    title: "Boeuf bourguignon traditionnel",
    slug: "boeuf-bourguignon-traditionnel",
    thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
    cookingTime: "3h30",
    difficulty: "Moyenne",
    servings: 6,
    category: "Plat principal",
    chefName: "Paul Bocuse"
  },
  {
    title: "Soufflé au fromage",
    slug: "souffle-au-fromage",
    thumbId: "4763a23b-2508-4a51-9cae-53b4da465f87",
    cookingTime: "45min",
    difficulty: "Difficile",
    servings: 4,
    category: "Entrée",
    chefName: "Alain Ducasse"
  },
  {
    title: "Tarte tatin aux pommes",
    slug: "tarte-tatin-aux-pommes",
    thumbId: "01d3cfef-738f-4fff-9684-4a7583af9f6b",
    cookingTime: "1h15",
    difficulty: "Facile",
    servings: 8,
    category: "Dessert",
    chefName: "Pierre Hermé"
  },
  {
    title: "Coq au vin de Bourgogne",
    slug: "coq-au-vin-bourgogne",
    thumbId: "f54d02ac-15a5-46bc-9f1d-3f0a58ff5a41",
    cookingTime: "2h30",
    difficulty: "Moyenne",
    servings: 4,
    category: "Plat principal",
    chefName: "Georges Blanc"
  },
];
