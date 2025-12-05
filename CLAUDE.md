# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React/TypeScript web application for tracking pollen levels in Castilla y León (Spain). The app displays current pollen data for different types of pollen across provinces in an interactive map using Mapbox GL JS.

## Development Commands

- **Development server**: `pnpm start` or `pnpm dev` (Vite dev server on port 3000)
- **Build**: `pnpm build` (TypeScript check + Vite production build)
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
- **Build**: Vite with React plugin and TypeScript support
- **Testing**: Jest + React Testing Library
- **Package manager**: pnpm

## Important Notes

- Mapbox token required in environment variables (`VITE_MAPBOX_TOKEN` in `.env`)
- Uses path aliases (`@/*` maps to `src/*`)
- Supports Spanish and English localization
- Province data comes from static GeoJSON file in `public/data/`
- Build output directory: `dist/` (Vite default)
- Vite serves `public/` directory at root in both dev and production