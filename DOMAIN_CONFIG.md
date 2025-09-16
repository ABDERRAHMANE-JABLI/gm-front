# Domain Configuration for *.gm.wip

This document outlines the configuration setup for handling `*.gm.wip` domains.

## Supported Domain Patterns

The website now responds to the following domain patterns:

- `*.gm.wip` (e.g., `fr.gm.wip`, `en.gm.wip`)
- `*.gaultmillau.com` (e.g., `fr.gaultmillau.com`, `en.gaultmillau.com`)
- `localhost` (for development)

## Language Detection

The system automatically detects the language based on the subdomain:

- `fr.gm.wip` → French content
- `en.gm.wip` → English content  
- If no valid language subdomain is detected, defaults to French (`fr`)

## Configuration Files Modified

### 1. middleware.ts
- Updated to recognize `*.gm.wip` domain pattern
- Enhanced subdomain parsing for language detection
- Added domain type headers for debugging

### 2. next.config.ts
- Added `*.gm.wip` to image remote patterns
- Ensures images from gm.wip domains are allowed

### 3. ecosystem.config.js
- Added environment variables for domain management
- Configured allowed domains list

### 4. .env.local
- Added domain configuration variables
- Set public domain pattern for client-side access

## Testing

You can test the domain functionality by:

1. Setting up DNS to point `*.gm.wip` to your server
2. Accessing `fr.gm.wip` or `en.gm.wip`
3. Verifying automatic language routing works correctly

## Headers Added

The middleware now adds these headers for debugging:

- `x-country`: Detected country/language code
- `x-language`: Current page language
- `x-hostname`: Request hostname
- `x-domain-type`: Domain type (`gm-wip`, `gaultmillau`, or `other`)

## Automatic Redirects

- Root domain (`gm.wip`) redirects to `fr.gm.wip`
- URLs without language codes are automatically prefixed with the detected language
