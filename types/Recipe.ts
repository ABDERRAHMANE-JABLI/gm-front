// Interface simplifiée pour RecipeCard (React/TypeScript)
// Inspirée de NewsCardProps

export enum RecipeCardButtonKind {
  PEOPLE = "people",
  RESTAURANT = "restaurant",
}

export interface RecipeCardButtonProps {
  buttonKind: RecipeCardButtonKind;
  label?: string;
  text_line1: string;
  text_line2?: string;
  slug: string;
}

export interface RecipeCardRatingProps {
  /** 
   * Nombre de toques
   * @description -1 = sponsorisé, 1-5 = nombre de toques standard, 6 = toques d'or
   * @min -1
   * @max 6
   */
  nbToques: number;
  
  /** 
   * Note
   * @description Note sur 20 ou autre système de notation
   * @example "18/20"
   */
  note?: string;
  
  /** 
   * Description de la note ou du statut
   * @description Texte explicatif comme "Table de prestige", "Sponsorisé", etc.
   * @example "Table de prestige"
   */
  noteDescription?: string;
}

export interface RecipeCardProps {
  id: string;
  title: string;
  resume: string;
  slug: string;
  thumbId: string;                
  buttons: [] | [RecipeCardButtonProps] | [RecipeCardButtonProps, RecipeCardButtonProps];
  rating?: RecipeCardRatingProps; // Informations de notation facultatives
}