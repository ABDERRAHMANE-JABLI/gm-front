/**
 * CODES COULEURS DISPONIBLES POUR LES BOUTEILLES :
 * 
 * Basé sur DTProductService::getColorInfos() - match($product->color->bottlesColorId)
 * 
 * - 'Ambré' → #FFB701
 * - 'Rouge' → #CC292B  
 * - 'Rosé' → #FFACAC (inclut 'Effervescent rosé', 'Effervescent rosé de saignée')
 * - 'Orange' → #F58331
 * - 'Blanc' → #F2EB8F (inclut 'Effervescent blanc', 'blanc effervescent')
 * - 'nonWoodAged' → #F8F8FF (blanc non élevé en bois)
 * - 'woodAged' → #8B5A2B (élevé en bois)
 */
export type ColorCode = 
    | 'Ambré'
    | 'Rouge' 
    | 'Rosé'
    | 'Effervescent rosé'
    | 'Effervescent rosé de saignée'
    | 'Orange'
    | 'Blanc'
    | 'Effervescent blanc'
    | 'blanc effervescent'
    | 'nonWoodAged'
    | 'woodAged';

// Mapping des couleurs vers leurs codes hexa (pour référence)
export const COLOR_HEX_MAP: Record<ColorCode, string> = {
    'Ambré': '#FFB701',
    'Rouge': '#CC292B',
    'Rosé': '#FFACAC',
    'Effervescent rosé': '#FFACAC',
    'Effervescent rosé de saignée': '#FFACAC',
    'Orange': '#F58331',
    'Blanc': '#F2EB8F',
    'Effervescent blanc': '#F2EB8F',
    'blanc effervescent': '#F2EB8F',
    'nonWoodAged': '#F8F8FF',
    'woodAged': '#8B5A2B',
};

export default interface WineCardProps {
    /**
     * Marque du vin
     * @description Nom du domaine viticole / maison
     * @example "Yann Chave", "Château Margaux", "Domaine de la Côte", "Louis Jadot"
     */
    brand: string;

    /** 
     * Titre du vin
     * @description Nom de la cuvée
     * @example "Le Rouvre", "Côtes du Rhône", "Chablis Premier Cru", "Sancerre", "Margaux"
     */
    title: string;

    /** 
     * Note du vin
     * @description Note sur 100
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
     * Vin en vedette
     * @description Indique si le vin est mis en avant
     * @example true, false
     */
    featured: boolean;

    /** 
     * Millésime du vin
     * @description Année de production du vin
     * @example "2018", "2020"
     * @optional
     */
    vintage?: string;

    /** 
     * Appellation du vin
     * @description Appellation d'origine contrôlée et région
     * @example ["Bourgogne", "Chablis"], ["Bordeaux", "Saint-Émilion"]
     * @optional
     */
    appellation?: string[];

    /** 
     * Couleur du vin
     * @description Code couleur du vin, le composant gère l'affichage à partir de ce code
     * @example "Rouge", "Blanc", "Rosé", "Ambré", "Orange"
     * @optional
     */
    colorCode?: ColorCode;

    /** 
     * Cépages du vin
     * @description Cépages utilisés dans l'assemblage du vin avec pourcentage
     * Dans le cas d'un monocépage, c'est forcément 100% de ce cépage. La carte affiche uniquement le nom du cépage sans écrire 100%
     * @example { "Cabernet Sauvignon": 60, "Merlot": 30, "Cabernet Franc": 10 }
     * @optional
     */
    varieties?: Record<string, number>;

    /**
     * Gamme de prix du vin
     * @description Indique la gamme de prix du vin
     * @example "15-25€", "25-40€", "40-80€"
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