# 🎨 Guide d'Importation SVG - Méthode 2

## ✅ Configuration Terminée

Votre projet est maintenant configuré pour importer des SVG comme composants React !

## 📁 Structure des Fichiers

```
/root/gmi-website/
├── next.config.ts          ✅ Configuration Webpack pour SVG
├── types/svg.d.ts           ✅ Déclarations TypeScript pour SVG
├── tsconfig.json           ✅ Inclut les types SVG
├── public/icons/           ✅ Dossier pour vos SVG
│   ├── star.svg
│   └── check.svg
└── components/SvgDemo.tsx  ✅ Composant de démonstration
```

## 🚀 Comment Utiliser les SVG

### 1. **Import du SVG comme Composant React**

```tsx
// Import direct depuis public/
import StarIcon from '/public/icons/star.svg';
import CheckIcon from '/public/icons/check.svg';

// Ou depuis un dossier assets/
import MyIcon from '@/assets/icons/my-icon.svg';
```

### 2. **Utilisation dans vos Composants**

```tsx
function MyComponent() {
  return (
    <div>
      {/* Utilisation basique */}
      <StarIcon />
      
      {/* Avec props personnalisées */}
      <StarIcon 
        width={32} 
        height={32} 
        className="text-yellow-500"
        title="Étoile"
      />
      
      {/* Avec styles inline */}
      <CheckIcon 
        style={{ 
          color: '#10b981', 
          width: '24px', 
          height: '24px' 
        }} 
      />
    </div>
  );
}
```

### 3. **Props Disponibles**

Chaque SVG importé accepte toutes les props SVG standards :

```tsx
interface SVGProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  title?: string;           // Pour l'accessibilité
  fill?: string;
  stroke?: string;
  onClick?: () => void;     // Événements React
  // ... toutes les props SVG/React standard
}
```

## 🎯 Avantages de cette Méthode

- ✅ **Composants React natifs** : Props, événements, lifecycle
- ✅ **TypeScript intégré** : Autocomplétion et vérification de types
- ✅ **Tree-shaking** : Seuls les SVG utilisés sont inclus dans le bundle
- ✅ **Stylable facilement** : CSS, className, style props
- ✅ **Accessibilité** : Support complet des attributs aria-*
- ✅ **Performance** : Inline dans le HTML, pas de requête réseau
- ✅ **Réutilisable** : Import une fois, utilise partout

## 📝 Exemples Pratiques

### Icône avec Tailwind CSS
```tsx
<StarIcon className="w-6 h-6 text-yellow-400 hover:text-yellow-500" />
```

### Icône avec CSS Modules
```tsx
<CheckIcon className={styles.successIcon} />
```

### Icône Interactive
```tsx
<StarIcon 
  onClick={() => handleFavorite()}
  className="cursor-pointer hover:scale-110 transition-transform"
  title="Ajouter aux favoris"
/>
```

### Icône Animée
```tsx
<CheckIcon 
  className="animate-bounce text-green-500"
  style={{ animationDuration: '2s' }}
/>
```

## 🔧 Configuration Technique

### Next.js Config (`next.config.ts`)
```typescript
webpack(config) {
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack'],
  });
  return config;
}
```

### Types TypeScript (`types/svg.d.ts`)
```typescript
declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
```

## 🎨 Test en Direct

Visitez `/fr/test-cards` pour voir la démonstration en action !

## 📦 Packages Installés

- `@svgr/webpack` : Transforme les SVG en composants React
- Configuration Webpack intégrée à Next.js 15.5.3

---

**🎉 Votre configuration SVG est maintenant opérationnelle !**