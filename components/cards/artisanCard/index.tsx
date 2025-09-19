import { ArtisanProps } from "../types";

/**
 * Artisan card component for displaying artisan craftsperson information
 * @description Renders a card showcasing local artisans and their crafts including specialty, location, and contact details
 * @param props - Artisan properties containing all necessary information
 * @returns JSX element representing an artisan card
 * @example
 * ```tsx
 * <ArtisanCard 
 *   name="Marie Dubois"
 *   specialty="Chocolatier"
 *   description="Master chocolatier creating handcrafted artisanal chocolates"
 *   address="45 Rue du Chocolat, Lyon"
 *   phone="+33 4 78 12 34 56"
 *   email="marie@chocolatsdubois.fr"
 *   website="https://chocolatsdubois.fr"
 *   imageUrl="https://example.com/marie-chocolatier.jpg"
 * />
 * ```
 * @see {@link ArtisanProps} for detailed prop descriptions
 */
export const ArtisanCard = (props: ArtisanProps) => {
  // TODO: Implement artisan card UI with props data
  console.log('Artisan card props:', props);
  return <div>Artisan Card Component</div>;
}