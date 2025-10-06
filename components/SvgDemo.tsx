/**
 * @fileoverview SVG Import Demo Component
 * @description Démontre comment importer et utiliser des SVG comme composants React
 */

import React from 'react';
// Import des SVG comme composants React
import StarIcon from '/public/icons/star.svg';
import CheckIcon from '/public/icons/check.svg';

/**
 * Props pour le composant SVG Demo
 */
interface SvgDemoProps {
  /** @description Taille des icônes en pixels */
  size?: number;
  /** @description Couleur des icônes */
  color?: string;
}

/**
 * Composant de démonstration pour les imports SVG
 * @description Montre comment utiliser les SVG importés comme composants React
 * @param props - Props du composant
 * @returns JSX element avec des exemples d'utilisation SVG
 * @example
 * ```tsx
 * <SvgDemo size={32} color="#ff6b35" />
 * ```
 */
export const SvgDemo: React.FC<SvgDemoProps> = ({ 
  size = 24, 
  color = 'currentColor' 
}) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>🎨 SVG Import Demo</h3>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h4>⭐ Star Icon</h4>
          <StarIcon 
            width={size} 
            height={size} 
            style={{ color }} 
            title="Star icon"
          />
        </div>
        
        <div>
          <h4>✅ Check Icon</h4>
          <CheckIcon 
            width={size} 
            height={size} 
            style={{ color }} 
            title="Check icon"
          />
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h4>📝 Comment utiliser :</h4>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
{`// 1. Import du SVG comme composant React
import StarIcon from '/public/icons/star.svg';

// 2. Utilisation comme composant
<StarIcon 
  width={24} 
  height={24} 
  style={{ color: '#ff6b35' }} 
  title="Star icon"
  className="my-icon-class"
/>`}
        </pre>
      </div>

      <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
        <h4>✅ Avantages de cette méthode :</h4>
        <ul style={{ fontSize: '14px', margin: '10px 0' }}>
          <li>🎯 <strong>Composants React natifs</strong> : Props, styles, événements</li>
          <li>📦 <strong>Optimisation automatique</strong> : Tree-shaking et minification</li>
          <li>🎨 <strong>Stylable via CSS/props</strong> : currentColor, className, style</li>
          <li>♿ <strong>Accessibilité</strong> : Support des attributs aria-* et title</li>
          <li>🔄 <strong>Réutilisable</strong> : Import une fois, utilise partout</li>
        </ul>
      </div>
    </div>
  );
};

export default SvgDemo;