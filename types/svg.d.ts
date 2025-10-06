/**
 * SVG module declarations for TypeScript
 * @description Permet d'importer les SVG comme composants React
 */

declare module '*.svg' {
  import React from 'react';
  
  /**
   * SVG component type
   * @description Interface pour les composants SVG importés
   */
  interface SVGProps extends React.SVGProps<SVGSVGElement> {
    /** @description Optional title for accessibility */
    title?: string;
  }
  
  /**
   * Default export as React component
   * @description Composant React généré à partir du SVG
   */
  const ReactComponent: React.FC<SVGProps>;
  
  export default ReactComponent;
}

declare module '*.svg?url' {
  /**
   * SVG as URL string
   * @description Import du SVG comme URL statique
   */
  const content: string;
  export default content;
}