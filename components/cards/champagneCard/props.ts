export default interface ChampagneCardProps {
    /**
     * Marque du champagne
     * @description Nom de la maison de champagne / domaine
     * @example "Bollinger", "Gosset", "Laurent-Perrier"
     */
    brand: string;

    /** 
     * Titre du champagne
     * @description Nom du champagne
     * @example "La côte aux enfants", "Special Cuvée", "Grand Siècle", "Cuvée Rosé"
     */
    title: string;

    /** 
     * Note du champagne
     * @description Note sur 100 ou autre système de notation
     * @example "98"
     * @optional
     */
    note?: string;

    /** 
     * Identifiant de l'image miniature
     * @description ID de l'image utilisant une transformation de type resize au format 240x500 avec fit=contain et background transparent
     * @example "cdd12ef0-945c-4da5-aece-e112cf218a0a"
     * @optional
     */
    thumbId?: string;

    /**
     * Champagne en vedette
     * @description Indique si le champagne est mis en avant
     * @example true, false
     * demander un screen car je ne crois pas avoir d'exemple online
    */
    featured: boolean;

    /** 
     * Millésime du champagne
     * @description Année de production du champagne
     * @example "2012" , "NM" (Non Millésimé), "BSA" (Brut Sans Année)
     * @optional
     */
    vintage?: string;

    /** 
     * Type de champagne
     * @description Type de champagne (Brut, Extra Brut, Rosé, Blanc de Blancs, Blanc de Noirs, etc.)
     * @example "Brut", "Extra Brut", "Brut Nature"
     * @optional
     */
    type?: string;

    /** 
     * Classification du champagne
     * @description Classification officielle ou indication de qualité du champagne
     * @example "Grand Cru", "Premier Cru", "Blanc", "Rosé"
     * @optional
     */
    classification?: string;

    /** 
     * Cépages du champagne
     * @description Cépages utilisés dans l'assemblage du champagne avec pourcentage
     * dans le cas d'un monocépage, c'est forcément 100% de ce cépage. La carte uniquement le nom du cépage sans écrire 100%
     * @example { "Chardonnay": 40, "Pinot Noir": 40, "Pinot Meunier": 20 }
     * @optional
     */
    varieties?: Record<string, number>;

    /**
     * Gamme du champagne
     * @description Indique la gamme de prix du champagne
     * @example "10-20€", "20-30€", "30-50€"
     * @optional
     */
    priceRange?: string;

    /** 
     * Indique si la bouteille peut être mis en favori
     * @description Permet l'affichage de l'icône cœur
     * @default false
     * @optional
     */
    supportfavorite?: boolean;
}