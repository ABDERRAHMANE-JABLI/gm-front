/**
 * Interface représentant les propriétés d'un ustensile
 * @description Décrit les informations nécessaires pour afficher un ustensile
 * @example
 * {
 *   id: "ust_001",
 *   title: "Spatule en silicone",
 *   description: "Idéale pour mélanger et racler sans rayer.",
 *   thumbId: "img_spatule",
 *   thumbIdOver: "img_spatule_hover"
 * }
 */

export interface UtensilProps {
  /**
   * Identifiant unique de l'ustensile
   * @example "ust_001"
   */
  id: string;

  /**
   * Nom de l'ustensile
   * @example "Spatule en silicone"
   */
  title: string;

  /**
   * Brève description de l'ustensile
   * @example "Idéale pour mélanger et racler sans rayer."
   */
  description: string;

  /**
   * Identifiant de l'image principale (miniature)
   * @example "img_spatule"
   */
  thumbId: string;

  /**
   * Identifiant de l'image au survol (optionnel)
   * @example "img_spatule_hover"
   */
  thumbIdOver?: string;
}
