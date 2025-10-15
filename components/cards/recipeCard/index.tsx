"use client";

import styles from "./recipeCard.module.css";
import { RecipeCardProps } from "@/types/Recipe";

type Language = 'fr' | 'en';

type Props = {
  lang: Language;
  Recipe: RecipeCardProps;
};

export const RecipeCard = ({ lang, Recipe }: Props) => {

  return (
    <div>Recipe Card</div>
  );
}
