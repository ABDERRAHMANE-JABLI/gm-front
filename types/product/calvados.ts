export default interface CalvadosCardProps {
    slug: string;
    
    /**
     * Marque du calvados
     * @description Nom de la distillerie / maison de calvados
     * @example "Christian Drouin", "Père Magloire", "Lecompte"
     */
    brand: string;

    /** 
     * Titre du calvados
     * @description Nom de la cuvée / âge / références
     * @example "Calvados très pomme", "Vsop", "5 ans"
     */
    title: string;

    /** 
     * Note du calvados
     * @description Note sur 100 ou autre système de notation
     * @example "92", "91"
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
     * Calvados en vedette
     * @description Indique si le calvados est mis en avant
     * @example true, false
     * @default false
     */
    featured: boolean;

    /** 
     * Pays d'origine du calvados
     * @description Pays de production (généralement France)
     * @example "France"
     * @optional
     */
    originCountry?: string;

    /** 
     * Région de production
     * @description Région spécifique en Normandie
     * @example "Calvados AOC", "Calvados Pays d'Auge", "Calvados Domfrontais"
     * @optional
     */
    region?: string;

    /**
     * la règle d'affichage pour l'origineCountry et la region: 
     * A : afficher origineCountry / region si les 2 propriétés existent
     * B : afficher origineCountry si la propriété existe
     * C : afficher region si la propriété existe
     * maximum 2 lignes avec ellipsis si nécessaire
     */

    /** 
     * Appellation du calvados
     * @description Appellation d'origine contrôlée
     * @example "AOC Calvados", "AOC Calvados Pays d'Auge", "AOC Calvados Domfrontais"
     * @optional
     */
    appellation?: string;

    /** 
     * Matière première du calvados
     * @description Type de pommes et/ou poires utilisées
     * @example "Pommes", "Pommes et Poires", "100% Pommes normandes"
     * @optional
     */
    rawMaterial?: string;

    /** 
     * Degré d'alcool
     * @description Teneur en alcool du calvados
     * @example "40%", "42%", "45%"
     * @optional
     */
    alcoholVolume?: string;

    /**
     * Gamme de prix du calvados
     * @description Indique la gamme de prix du calvados
     * @example "40-60€", "60-100€", "100-200€"
     * @optional
     */
    priceRange?: string;
}