# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React/TypeScript web application for tracking pollen levels in Castilla y León (Spain). The app displays current pollen data for different types of pollen across provinces in an interactive map using Mapbox GL JS.

## Development Commands

- **Development server**: `pnpm dev` (SSG-enabled dev server on port 3000)
- **Build**: `pnpm build` (generates sitemap, TypeScript check, SSG build)
- **Preview**: `pnpm preview` (preview production build locally on port 3000)
- **Test**: `pnpm test` (Jest tests)
- **Linting**: `pnpm lint` (ESLint with auto-fix)
- **Formatting**: `pnpm prettify` (Prettier formatting)
- **Type checking**: `pnpm types` (TypeScript compiler check)
- **Full verification**: `pnpm verify` (runs lint, prettify, types, test, audit, and build)

## Architecture

### Core Structure
- **App entry**: `src/App.tsx` - Main app component with theme provider
- **Layout**: `src/ui/MainLayout/MainLayout.tsx` - Main page layout with header, main content, and footer
- **API layer**: `src/api/pollenApi.ts` - Data fetching with SWR
- **Internationalization**: `src/i18n.ts` - i18next configuration with ES/EN support

### Key Components
- **PollenMap**: Interactive Mapbox GL JS map showing pollen levels by province
- **CurrentPollenLevels**: Main data display component with filters and map
- **FilterBar**: Pollen type selection component
- **ThemeToggle/LanguageSwitcher**: User preference controls
- **SEOHead**: SEO meta tags management with react-helmet-async
- **JsonLd**: JSON-LD structured data for search engines

### State Management
- Uses React hooks and context for state management
- SWR for data fetching and caching
- Custom ThemeContext for dark/light mode

### Data Flow
1. API data fetched via `fetcherPollenData` in `pollenApi.ts`
2. Data typed with interfaces in `src/types/` (pollen.ts, stations.ts, api.ts)
3. Components consume data and render interactive map with province-level coloring

## Technology Stack

- **Frontend**: React 19, TypeScript, Material-UI
- **Mapping**: Mapbox GL JS with custom province boundaries (CyL_Boundaries.geojson)
- **Data fetching**: SWR
- **Styling**: Material-UI + styled-components + Emotion
- **Build**: Vite with vite-react-ssg for Static Site Generation
- **SEO**: react-helmet-async for meta tags management
- **Testing**: Jest + React Testing Library
- **Package manager**: pnpm

## Static Site Generation (SSG)

The application uses **vite-react-ssg** to pre-render static HTML for improved SEO and faster initial page load.

### SSG Architecture
- **Entry point**: `src/index.tsx` uses `ViteReactSSG` from `vite-react-ssg/single-page`
- **Mode**: Single-page SSG (no routing)
- **Default language**: Spanish (pre-rendered), English available via client-side switching

### SSR Guards
Browser-dependent features are protected with `typeof window !== 'undefined'` checks:
- `src/ui/theme/ThemeContext.tsx` - localStorage and window.matchMedia guards
- `src/i18n.ts` - LanguageDetector only used in browser, Spanish forced during SSG

### SEO Components
- **SEOHead** (`src/components/SEO/SEOHead.tsx`): Meta tags, Open Graph, Twitter Cards, canonical URLs, hreflang alternates
- **JsonLd** (`src/components/SEO/JsonLd.tsx`): Structured data (WebSite, BreadcrumbList schemas)

### SEO Static Files
- `public/robots.txt` - Search engine crawling directives
- `public/sitemap.xml` - XML sitemap with language alternates (auto-updated on build)
- `scripts/generate-sitemap.ts` - Updates sitemap lastmod timestamp before each build

### Build Output
- Pre-rendered HTML with Spanish content
- Client-side JavaScript bundles for interactivity
- Static deployment ready (CDN compatible)

## Important Notes

- Mapbox token required in environment variables (`VITE_MAPBOX_TOKEN` in `.env`)
- Uses path aliases (`@/*` maps to `src/*`)
- Supports Spanish and English localization
- Province data comes from static GeoJSON file in `public/data/`
- Build output directory: `dist/` (Vite default)
- Vite serves `public/` directory at root in both dev and production
- SSR/SSG guards required when using browser APIs (localStorage, window.matchMedia)