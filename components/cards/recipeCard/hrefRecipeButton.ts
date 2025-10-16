import { RecipeCardButtonKind } from "@/types/Recipe";

export const rootByKindRecipe: Record<RecipeCardButtonKind, string> = {
  [RecipeCardButtonKind.PEOPLE]: "peoples",
  [RecipeCardButtonKind.RESTAURANT]: "restaurant",
};

export const defaultLabelByKindRecipe: Record<RecipeCardButtonKind, string> = {
  [RecipeCardButtonKind.PEOPLE]: "Chef",
  [RecipeCardButtonKind.RESTAURANT]: "Restaurant",
};

export const hrefCardRecipe = (lang: string, slug: string) => `/${lang}/recipes/${slug}`;

export const hrefButtonRecipe = (lang: string, kind: RecipeCardButtonKind, slug: string) =>
  `/${lang}/${rootByKindRecipe[kind]}/${slug}`;
