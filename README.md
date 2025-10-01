# Gault&Millau Website

This is a [Next.js](https://nextjs.org) project for the Gault&Millau gastronomic guide, featuring multi-country and multi-language support.

## 🎨 Test Cards Page

Une page de test complète a été créée pour visualiser tous les composants de cartes :
- **URL locale** : `http://fr.gm.wip:3000/fr/test-cards`
- **Documentation** : Voir [app/[lang]/test-cards/README.md](app/[lang]/test-cards/README.md)
- **Mocks disponibles** : Plus de 40 données mockées dans `/mocks/`

Cette page permet de tester visuellement tous les composants cards (restaurants, hôtels, artisans, people, news, wineries, recipes, spirits, etc.).

## 🌍 Hostname and Language Configuration

### Domain Structure
The application uses a sophisticated domain and language routing system:

- **Country**: Determined by subdomain (e.g., `fr.gm.wip`, `us.gm.wip`, `de.gm.wip`)
- **Language**: Determined by URL path (e.g., `/fr/`, `/en/`)

### Supported Domains
- `*.gm.wip` (Development/Testing)
- `*.gaultmillau.com` (Production)
- `localhost` (Local development)

### Language-Locale Mapping
```typescript
{
  "fr": "fr-FR",  // French → French (France)
  "en": "en-US"   // English → English (United States)
}
```

## 🚀 Getting Started

### Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Localhost Development
Pour lancer le serveur Next.js sur fr.gm.wip:3000 (accessible depuis Windows et WSL) :
```bash
npm run local
```
Ce script démarre Next.js sur l'adresse fr.gm.wip et le port 3000, idéal pour le développement local multi-plateforme.
```

### Production with PM2
```bash
npm run build
pm2 start ecosystem.config.js
```

## 🔧 Developer Configuration

### 1. Local Development Setup

For local development, add these entries to your hosts file:

**Windows**: `C:\Windows\System32\drivers\etc\hosts`
**Linux/Mac**: `/etc/hosts`

```
127.0.0.1 fr.gm.wip
127.0.0.1 us.gm.wip
127.0.0.1 de.gm.wip
127.0.0.1 en.gm.wip
```

### 2. WSL2 Development Setup

If using WSL2, find your WSL2 IP address:
```bash
ip addr show eth0 | grep inet
```

Then add to your **Windows** hosts file:
```
<WSL2_IP> fr.gm.wip
<WSL2_IP> us.gm.wip
<WSL2_IP> de.gm.wip
<WSL2_IP> en.gm.wip
```

### 3. Accessing the Application

- French site: `http://fr.gm.wip:3000/` → Redirects to `http://fr.gm.wip:3000/fr/`
- US site: `http://us.gm.wip:3000/` → Redirects to `http://us.gm.wip:3000/en/`
- Direct language access: `http://fr.gm.wip:3000/en/` (French country, English language)

## 🏗️ Architecture

### Middleware (`middleware.ts`)
- Extracts country from subdomain
- Handles language routing and normalization
- Sets custom headers for server components

### Headers Helper (`lib/headers.ts`)
```typescript
import { getCountryAndLanguage } from '@/lib/headers';

export default async function MyPage() {
  const { country, language, locale, hostname } = await getCountryAndLanguage();
  // country: 'FR', 'US', 'DE' (uppercase)
  // language: 'fr', 'en' (lowercase)
  // locale: 'fr-FR', 'en-US' (full locale)
  // hostname: 'fr.gm.wip:3000'
}
```

### Custom Headers
The middleware sets these headers for server components:
- `x-country`: Country code (uppercase)
- `x-language`: Language code (lowercase)
- `x-locale`: Full locale identifier
- `x-hostname`: Original hostname

## 📁 Project Structure

```
app/
├── [lang]/                 # Dynamic language routes
│   ├── page.tsx           # Homepage
│   ├── restaurants/       # Restaurant pages
│   ├── hotels/           # Hotel pages
│   └── ...               # Other content pages
lib/
├── headers.ts            # Middleware headers helper
├── types.ts              # TypeScript definitions
└── i18n.ts              # Internationalization
middleware.ts             # Domain and language routing
ecosystem.config.js       # PM2 configuration
```

## 🔄 URL Routing Examples

| URL | Country | Language | Locale | Description |
|-----|---------|----------|--------|-------------|
| `fr.gm.wip:3000/` | FR | fr | fr-FR | French country, auto-redirect to French |
| `us.gm.wip:3000/` | US | en | en-US | US country, auto-redirect to English |
| `fr.gm.wip:3000/en/` | FR | en | en-US | French country, English language |
| `de.gm.wip:3000/fr/` | DE | fr | fr-FR | German country, French language |

## 🛠️ Development Tips

### Adding New Countries
1. Add subdomain to hosts file
2. No code changes needed - middleware handles automatically

### Adding New Languages
1. Update `LANGUAGE_LOCALE_MAP` in `middleware.ts`
2. Add language validation in middleware
3. Update supported language arrays

### Testing Different Configurations
```bash
# Test French country with English language
curl -H "Host: fr.gm.wip" http://localhost:3000/en/

# Test US country with French language  
curl -H "Host: us.gm.wip" http://localhost:3000/fr/
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
