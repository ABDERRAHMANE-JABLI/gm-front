# Navigation and Layout Components

This folder contains the main navigation and layout components for your GMI website.

## Components Overview

### 🔗 Menu Component (`/ui/Menu`)
A flexible, accessible menu component with dropdown support.

**Features:**
- Horizontal and vertical orientations
- Nested dropdown menus
- Active state highlighting
- External link support
- Keyboard navigation
- Mobile responsive

**Usage:**
```tsx
import { Menu, MenuItem } from '@/components/ui';

const menuItems: MenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Web Development', href: '/services/web' },
      { label: 'Mobile Apps', href: '/services/mobile' },
    ]
  }
];

<Menu items={menuItems} orientation="horizontal" activePath="/about" />
```

### 🍔 BurgerMenu Component (`/ui/BurgerMenu`)
Mobile-first hamburger menu with smooth animations.

**Features:**
- Smooth slide-in animation
- Overlay backdrop
- Body scroll lock
- Portal rendering
- Keyboard navigation (ESC to close)
- Customizable icons

**Usage:**
```tsx
import { BurgerMenu } from '@/components/ui';

<BurgerMenu 
  items={menuItems} 
  activePath="/about"
  onItemClick={(item) => console.log('Clicked:', item.label)}
/>
```

### 🎯 Header Component (`/layout/Header`)
Complete site header with navigation and branding.

**Features:**
- Responsive design (desktop menu + mobile burger)
- Sticky positioning
- Logo/branding area
- Action buttons (CTA)
- Multiple style variants
- Auto-generated menu from props

**Usage:**
```tsx
import { Header } from '@/components/layout';

<Header 
  variant="transparent"
  sticky={true}
  logo={<img src="/logo.png" alt="GMI" />}
  actionButtons={
    <div>
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign Up</Link>
    </div>
  }
/>
```

### 🦶 Footer Component (`/layout/Footer`)
Comprehensive site footer with links and contact info.

**Features:**
- Multi-column link sections
- Contact information display
- Social media links
- Responsive grid layout
- SEO-friendly structure

**Usage:**
```tsx
import { Footer } from '@/components/layout';

<Footer 
  description="Custom company description"
  contactInfo={{
    address: "123 Main St\nCity, State 12345",
    phone: "+1 (555) 123-4567",
    email: "hello@gmi.com"
  }}
  sections={customFooterSections}
/>
```

### 🏗️ Layout Component (`/layout/Layout`)
Complete page layout wrapper combining Header and Footer.

**Features:**
- Automatic header/footer inclusion
- Flexible main content area
- Customizable header/footer props
- Option to hide header/footer
- Proper semantic HTML structure

**Usage:**
```tsx
import { Layout } from '@/components/layout';

export default function Page() {
  return (
    <Layout 
      headerProps={{ variant: 'transparent' }}
      footerProps={{ hideNewsletter: true }}
    >
      <YourPageContent />
    </Layout>
  );
}
```

## Integration Examples

### Basic App Layout (app/layout.tsx)
```tsx
import { Layout } from '@/components/layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
```

### Custom Page with Different Header
```tsx
// app/landing/page.tsx
import { Header, Footer } from '@/components/layout';

export default function LandingPage() {
  return (
    <>
      <Header 
        variant="transparent" 
        actionButtons={
          <button className="cta-button">Get Started Free</button>
        }
      />
      <main>
        {/* Landing page content */}
      </main>
      <Footer />
    </>
  );
}
```

### Page Without Header/Footer
```tsx
// app/auth/login/page.tsx
import { Layout } from '@/components/layout';

export default function LoginPage() {
  return (
    <Layout hideHeader hideFooter>
      <div className="auth-container">
        {/* Login form */}
      </div>
    </Layout>
  );
}
```

## Customization

### Custom Menu Items
```tsx
const customMenuItems: MenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/api' },
      { label: 'GitHub', href: 'https://github.com/gmi', external: true },
    ]
  },
  { label: 'Support', href: '/support' },
];
```

### Custom Footer Sections
```tsx
const customFooterSections = [
  {
    title: 'Products',
    links: [
      { label: 'Web Apps', href: '/products/web' },
      { label: 'Mobile Apps', href: '/products/mobile' },
      { label: 'APIs', href: '/products/api' },
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Status Page', href: 'https://status.gmi.com', external: true },
    ]
  },
];
```

### Custom Social Links
```tsx
const customSocialLinks = [
  {
    platform: 'LinkedIn',
    href: 'https://linkedin.com/company/gmi',
    icon: <LinkedInIcon />
  },
  {
    platform: 'Twitter',
    href: 'https://twitter.com/gmi',
    icon: <TwitterIcon />
  },
];
```

## Styling & Theming

All components use CSS Modules and can be customized through:

1. **CSS Custom Properties**: Define your colors and spacing
2. **CSS Modules Override**: Import and extend the existing styles
3. **className Props**: Add additional classes for specific instances

### Example Theme Variables
```css
/* globals.css */
:root {
  --header-height: 70px;
  --header-background: #ffffff;
  --menu-text-color: #4a5568;
  --menu-hover-color: #2d3748;
  --menu-active-color: #3182ce;
  --footer-background: #1a202c;
  --footer-text-color: #e2e8f0;
}
```

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Visible focus indicators and logical tab order
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **High Contrast**: Supports high contrast mode
- **Semantic HTML**: Proper use of nav, main, footer elements

## Mobile Responsiveness

- **Breakpoints**: 768px (tablet) and 480px (mobile)
- **Touch Targets**: Minimum 44px touch targets
- **Viewport Meta**: Optimized for mobile devices
- **Performance**: Minimal JavaScript for mobile users

## Performance Considerations

- **Code Splitting**: Components can be imported individually
- **CSS Modules**: Scoped styles prevent conflicts
- **Portal Rendering**: Mobile menu uses React Portal for better performance
- **Event Delegation**: Efficient event handling
- **Lazy Loading**: Icons and images can be lazy loaded
