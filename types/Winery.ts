import { OpeningPeriods } from "@/types/Time";

export enum ProductKind {
    /** Production de vin */
    WINE = 'wine',
    /** Production de champagne */
    CHAMPAGNE = 'champagne',
}

export interface WineryProps {
    /** 
     * Nom du domaine/cave/vigneron
     * @example "Domaine de la Côte"
     */
    title: string;
    
    /** 
     * Identifiant unique pour l'URL (slug)
     * @example "domaine-de-la-cote-bourgogne"
     */
    slug: string;
    
    /** 
     * Indique si le vigneron est sélectionné par Gault&Millau
     * @description false = 'Sponsorisé', true = sélectionné par GM
     * @example true
     */
    isGmSelected: boolean;
    
    /** 
     * Catégorie de production principale
     * @description Type de produit principal (wine, champagne) - permet l'affichage de la petite icône à côté du titre
     * @example ProductKind.WINE
     * @optional
     */
    producerCategory?: ProductKind;
    
    /** 
     * Identifiant de l'image miniature
     * @description ID de l'image au format 666x444 avec fit=cover
     * @example "img_22222"
     * @optional
     */
    thumbId?: string;
    
    /** 
     * Horaires d'ouverture du domaine
     * @description Horaires pour chaque jour de la semaine (visites, dégustation)
     * @optional
     */
    openingPeriods?: OpeningPeriods;
    
    /** 
     * Adresse complète du domaine
     * @example "Route des Grands Crus, 21220 Gevrey-Chambertin"
     * @optional
     */
    address?: string;
    
    /** 
     * Types de production
     * @description Liste des types de vins/spiritueux produits
     * @example ["rouge", "blanc", "rosé", "effervescent"]
     * @optional
     */
    productions?: string[];
    
    /** 
     * Services proposés par le domaine
     * @description Liste des services disponibles (dégustation, visite, vente directe, etc.)
     * @example ["dégustation", "visite guidée", "vente directe", "expédition"]
     * @optional
     */
    services?: string[];

    /**
     * Distance par rapport à la position actuelle
     * @description Affiche la distance en km si fournie, fonctionne avec 'Autour de moi'
     * @example "3.4 km"
     * @optional
     */
    distance?: string;
}