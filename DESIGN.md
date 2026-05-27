# Design Specification — Pollen Tracker CyL

This document is the authoritative design reference for the Pollen Tracker CyL application. It describes the visual language, design tokens, component patterns, and conventions that all contributors (human or AI) must follow to keep the UI consistent.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing System](#4-spacing-system)
5. [Shape & Elevation](#5-shape--elevation)
6. [Interactive States](#6-interactive-states)
7. [Layout](#7-layout)
8. [Component Patterns](#8-component-patterns)
9. [Map Integration](#9-map-integration)
10. [Theme System](#10-theme-system)
11. [Internationalization](#11-internationalization)
12. [Do's and Don'ts](#12-dos-and-donts)

---

## 1. Design Philosophy

- **Data-first, chrome-minimal.** The map and pollen data are the only things that matter. UI chrome (header, filter bar, footer) is deliberately lightweight so the map is always the focal point.
- **Clean and calm.** No gradients for decoration, no loud colours outside of the semantic pollen palette. The interface should feel like a professional data dashboard, not a marketing page.
- **Performance-conscious.** No web fonts, no heavy decorative assets. The system font stack is used exclusively.
- **Light and dark parity.** Every surface, component, and state must look intentional in both modes. The only exception is the embedded Mapbox map (see [Map Integration](#9-map-integration)).

---

## 2. Color System

The palette is defined in `src/ui/theme/theme.ts` and consumed exclusively through MUI's `ThemeProvider`. Colours are never hardcoded in components except for the semantic pollen tokens listed below.

### 2.1 Light Mode Palette

| Role               | Token                | Hex       | Tailwind reference |
| ------------------ | -------------------- | --------- | ------------------ |
| Primary main       | `primary.main`       | `#4f46e5` | Indigo 600         |
| Primary light      | `primary.light`      | `#818cf8` | Indigo 400         |
| Primary dark       | `primary.dark`       | `#3730a3` | Indigo 800         |
| Secondary main     | `secondary.main`     | `#10b981` | Emerald 500        |
| Secondary light    | `secondary.light`    | `#34d399` | Emerald 400        |
| Secondary dark     | `secondary.dark`     | `#047857` | Emerald 700        |
| Background default | `background.default` | `#f8fafc` | Slate 50           |
| Background paper   | `background.paper`   | `#ffffff` | White              |
| Text primary       | `text.primary`       | `#1e293b` | Slate 800          |
| Text secondary     | `text.secondary`     | `#64748b` | Slate 500          |
| Text tertiary      | `text.tertiary`      | `#94a3b8` | Slate 400          |
| Text disabled      | `text.disabled`      | `#cbd5e1` | Slate 300          |

### 2.2 Dark Mode Palette

| Role               | Token                | Hex       | Tailwind reference |
| ------------------ | -------------------- | --------- | ------------------ |
| Primary main       | `primary.main`       | `#6366f1` | Indigo 500         |
| Primary light      | `primary.light`      | `#8b5cf6` | Violet 500         |
| Primary dark       | `primary.dark`       | `#4338ca` | Indigo 700         |
| Secondary main     | `secondary.main`     | `#14b8a6` | Teal 500           |
| Secondary light    | `secondary.light`    | `#2dd4bf` | Teal 400           |
| Secondary dark     | `secondary.dark`     | `#0f766e` | Teal 700           |
| Background default | `background.default` | `#0f172a` | Slate 900          |
| Background paper   | `background.paper`   | `#1e293b` | Slate 800          |
| Text primary       | `text.primary`       | `#f1f5f9` | Slate 100          |
| Text secondary     | `text.secondary`     | `#cbd5e1` | Slate 300          |
| Text tertiary      | `text.tertiary`      | `#94a3b8` | Slate 400          |
| Text disabled      | `text.disabled`      | `#64748b` | Slate 500          |

> **Note:** `text.tertiary` is a custom palette extension not present in MUI's default palette. Access it via `theme.palette.text.tertiary` after augmenting the module type.

### 2.3 Semantic Pollen Level Tokens

These are the only colours that are intentionally hardcoded outside the theme palette. They represent domain-specific pollen severity levels and are defined as constants in `src/components/PollenMap/PollenMap.tsx`.

| Level    | Constant name     | Hex       | Usage                                  |
| -------- | ----------------- | --------- | -------------------------------------- |
| High     | `pollen.high`     | `#ef4444` | Red 500 — province fill, legend dot    |
| Moderate | `pollen.moderate` | `#eab308` | Yellow 500 — province fill, legend dot |
| Low      | `pollen.low`      | `#22c55e` | Green 500 — province fill, legend dot  |
| No data  | `pollen.noData`   | `#9ca3af` | Gray 400 — province fill, legend dot   |

These colours were chosen to be:

- Universally legible against Mapbox's `light-v11` base map
- Semantically intuitive (red=danger, yellow=caution, green=safe, gray=unknown)
- Sufficiently saturated to distinguish filled provinces at a glance

Do **not** add these colours to the MUI palette — they are semantic/domain colours that do not belong in the general-purpose design system.

---

## 3. Typography

### 3.1 Font Stack

The application uses a system font stack exclusively. No web fonts are loaded.

```
-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

This is defined in `commonThemeSettings.typography.fontFamily` in `src/ui/theme/theme.ts`.

### 3.2 Type Scale

| Variant | Size              | Weight | Line height | Letter spacing | Usage                                 |
| ------- | ----------------- | ------ | ----------- | -------------- | ------------------------------------- |
| `h1`    | `3rem` (48px)     | 700    | 1.2         | `-0.02em`      | Page title ("Pollen Tracker CyL")     |
| `h2`    | `2.25rem` (36px)  | 600    | 1.3         | `-0.01em`      | Major section headings                |
| `h3`    | `1.875rem` (30px) | 600    | 1.3         | —              | Sub-section headings                  |
| `h4`    | `1.5rem` (24px)   | 600    | 1.4         | —              | Card titles                           |
| `h5`    | `1.25rem` (20px)  | 500    | 1.4         | —              | Subtitles (e.g. page subtitle)        |
| `h6`    | `1rem` (16px)     | 500    | 1.5         | —              | Component labels (filter bar, legend) |
| `body1` | `1rem` (16px)     | 400    | 1.6         | —              | General body text                     |
| `body2` | `0.875rem` (14px) | 400    | 1.5         | —              | Secondary text, captions, footer      |

**Rationale:** Tight negative letter-spacing on `h1` and `h2` creates a modern editorial feel. The generous `body1` line-height of 1.6 improves readability. `h6` is used for compact in-component labels rather than true section headings.

---

## 4. Spacing System

MUI's default **8px base unit** is used (`theme.spacing(1) = 8px`). All spacing values in `sx` props must use this scale.

| MUI token    | Pixels | Common usage                                                      |
| ------------ | ------ | ----------------------------------------------------------------- |
| `spacing(1)` | 8px    | Tight gaps, icon-to-label spacing                                 |
| `spacing(2)` | 16px   | Component internal padding (compact), gaps between small elements |
| `spacing(3)` | 24px   | Section padding, legend internal padding                          |
| `spacing(4)` | 32px   | Card padding (`p={4}`), standard section vertical padding         |
| `spacing(6)` | 48px   | Empty/error state cards, large vertical padding                   |
| `spacing(8)` | 64px   | Header intro top padding (desktop)                                |

### Responsive spacing pattern

The header intro uses responsive top padding that serves as the canonical responsive pattern:

```tsx
pt: { xs: 6, md: 8 }  // 48px mobile → 64px desktop
py: { xs: 2, md: 4 }  // 16px mobile → 32px desktop (main container)
```

---

## 5. Shape & Elevation

### 5.1 Border Radius

The global border radius is set to **12px** via `theme.shape.borderRadius = 12`. All MUI components inherit this value.

| Context                           | Value                      | Pixels                        |
| --------------------------------- | -------------------------- | ----------------------------- |
| Global / default (MUI components) | `theme.shape.borderRadius` | 12px                          |
| Buttons (explicit override)       | `borderRadius: 12`         | 12px                          |
| Glassmorphism cards (via `sx`)    | `borderRadius: 3`          | 24px (3 × 8px MUI `sx` scale) |
| Map container                     | `borderRadius: 3`          | 24px                          |

> **Important:** `borderRadius` in `sx` props uses MUI's spacing scale (`1 unit = 8px`), **not** `theme.shape.borderRadius`. So `borderRadius: 3` in an `sx` prop equals `24px`, not `36px`.

### 5.2 Shadow / Elevation Levels

Three levels of shadow are used, defined as global MUI component overrides:

| Component   | Shadow (rest)                                                     | Shadow (hover)                                                      |
| ----------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| `MuiPaper`  | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`           | —                                                                   |
| `MuiCard`   | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` |
| `MuiButton` | `none`                                                            | `0 4px 12px rgba(0,0,0,0.15)`                                       |

### 5.3 Glassmorphism Card Pattern

The filter bar and map legend use a consistent glassmorphism-lite style. This is the canonical surface treatment for floating/overlay panels:

```tsx
sx={{
  background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  backdropFilter: 'blur(10px)',
  borderRadius: 3,  // = 24px
  elevation: 0,
}}
```

Do not use `elevation > 0` on these panels — the border + gradient replace the shadow.

---

## 6. Interactive States

All interactive states use alpha-tinted variants of `primary.main`. This is the canonical pattern for form controls (Select, IconButton, etc.):

| State               | Background                        |
| ------------------- | --------------------------------- |
| Hover               | `alpha(primary.main, 0.1)`        |
| Selected            | `alpha(primary.main, 0.15)`       |
| Selected + hover    | `alpha(primary.main, 0.2)`        |
| Focus ring / border | `primary.main` solid, `2px` width |

Buttons follow the elevation-shift pattern: flat at rest, light shadow on hover (see [Elevation](#52-shadow--elevation-levels)).

---

## 7. Layout

### 7.1 Page Structure

The page uses a full-viewport-height flex column:

```tsx
<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  <AppBar /> {/* pinned top */}
  <Box component="main" sx={{ flex: 1 }}>
    {/* content */}
  </Box>
  <Footer sx={{ mt: 'auto' }} />
</Box>
```

Footer is pushed to the bottom with `mt: 'auto'` — do not use absolute/fixed positioning for the footer.

### 7.2 Container Widths

| Section                         | MUI Container `maxWidth` | Notes                         |
| ------------------------------- | ------------------------ | ----------------------------- |
| Header intro (title + subtitle) | `lg`                     | Centred text, narrower column |
| Main content (filter + map)     | `xl`                     | Full-width data area          |
| Footer                          | `xl`                     | Spans full width              |

### 7.3 Breakpoints

Only `xs` and `md` breakpoints are used for responsive values. Do not introduce `sm`, `lg`, or `xl` breakpoints in `sx` props unless there is a strong reason.

| Breakpoint | Width  | Role           |
| ---------- | ------ | -------------- |
| `xs`       | 0px+   | Mobile default |
| `md`       | 900px+ | Desktop layout |

### 7.4 Map Container

The map is fixed-height and full-width within its container:

```tsx
height: 600px
width: '100%'
borderRadius: 3  // 24px
overflow: 'hidden'
```

The map container uses `elevation={0}` with `overflow: hidden` to clip the Mapbox canvas to the rounded corners.

---

## 8. Component Patterns

### 8.1 Header / Upper Bar

- Rendered as a MUI `AppBar` or equivalent top bar
- Contains: theme toggle (left or right), language switcher (right)
- Background: transparent or `background.paper` — no strong colour
- No border or divider — relies on natural page flow to separate from content
- Controls: `ThemeToggle` (`size="small"`) from `@macolmenerori/component-library/theme-switch`, language `Select` with flag icon

### 8.2 Page Header Intro

- Centred block with `h1` title and `h5` subtitle
- Title: `primary.main` colour
- Subtitle: `text.secondary` colour
- No decorative elements (no underlines, no background)

```tsx
<Typography variant="h1" color="primary.main">Pollen Tracker CyL</Typography>
<Typography variant="h5" color="text.secondary">Pollen monitor for Castilla y León</Typography>
```

### 8.3 Filter Bar

- Uses the [glassmorphism card pattern](#53-glassmorphism-card-pattern)
- Internal layout: section heading (icon + `h6` label) centred above a `Select` input
- The `Select` is full-width up to a max of ~300px, centred in the card
- The filter icon uses `primary.main` colour
- The section label uses `text.primary` weight 600

### 8.4 Map Legend

- Positioned absolutely inside the map container (top-right corner)
- Uses the [glassmorphism card pattern](#53-glassmorphism-card-pattern)
- Lists the four pollen levels, each with a coloured dot and a label
- Dot size: `12px × 12px`, `borderRadius: '50%'`
- Legend title: `h6` variant, `text.primary`
- Legend items: `body2` variant, `text.secondary`
- Colour dots use the [semantic pollen tokens](#23-semantic-pollen-level-tokens)

### 8.5 Footer

- Horizontal row of items separated by MUI `Divider` (vertical, `flexItem`)
- Items: copyright + author link, data source link, GitHub icon link, GitHub Sponsors iframe
- Typography: `body2`, `text.secondary`
- Links: styled with `primary.main` in light mode; inherit in dark mode
- No background — sits on `background.default`

### 8.6 Loading State

- Centred `CircularProgress` with `color="primary"` and `size={48}`
- `mt: 3` top margin to separate from page elements above
- No text label alongside the spinner

### 8.7 Error / Empty State

- MUI `Paper` with `p={6}`, `textAlign: 'center'`
- Icon or emoji at top (optional)
- `h6` heading in `text.primary`
- `body2` description in `text.secondary`
- Follows the same elevation as `MuiPaper` global override

---

## 9. Map Integration

### Mapbox Style

The map **always uses Mapbox's `light-v11` style**, regardless of the app's current theme mode. This is an intentional design decision:

- The pollen semantic colours (`#ef4444`, `#eab308`, `#22c55e`, `#9ca3af`) are calibrated for legibility against the light-v11 base map
- Switching to `dark-v11` would require recalibrating province fill colours and legend contrast

Do not conditionally switch the Mapbox style based on the app's theme. If this behaviour is changed in future, the pollen level colours must be re-evaluated for contrast on the new base map.

### Province Fill

- Province boundaries come from `public/data/CyL_Boundaries.geojson`
- Fill colour is set via Mapbox's `fill-color` paint property using the pollen level for each province
- Fill opacity: `0.7`
- Province outline (stroke): `#ffffff`, `2px` width

### Map Legend

See [Component Patterns — Map Legend](#84-map-legend).

---

## 10. Theme System

### Architecture

- Theme is created via `createAppTheme(mode: PaletteMode)` in `src/ui/theme/theme.ts`
- `ThemeContext` (`src/ui/theme/ThemeContext.tsx`) manages mode state and exposes a toggle function
- `ThemeProvider` wraps the entire application in `src/App.tsx`

### Mode Detection Priority

1. `localStorage` key `themeMode` — explicit user preference (highest priority)
2. `window.matchMedia('(prefers-color-scheme: dark)')` — OS/browser system preference
3. `'light'` — SSG/SSR default (forced during static site generation to avoid hydration mismatch)

### SSR Guards

All browser API access (`localStorage`, `window.matchMedia`) is guarded with `typeof window !== 'undefined'`. During SSG, the theme defaults to `'light'`. This means the pre-rendered HTML is always in light mode; dark mode activates on the client after hydration.

---

## 11. Internationalization

- Supported languages: **Spanish (`es`)** and **English (`en`)**
- Configured via `i18next` in `src/i18n.ts`
- Language detection uses `i18next-browser-languagedetector` (client-side only)
- During SSG, language is forced to `es` to match the pre-rendered HTML and avoid hydration mismatches
- User's language preference persists via `localStorage`

The language switcher in the header renders a `Select` with a flag icon and the language code as the selected value.

---

## 12. Do's and Don'ts

### Styling

| Do                                                             | Don't                                                          |
| -------------------------------------------------------------- | -------------------------------------------------------------- |
| Use MUI's `sx` prop for all component styling                  | Write CSS files, CSS Modules, or styled-components             |
| Reference colours via `theme.palette.*`                        | Hardcode hex values in components (except pollen tokens)       |
| Use `alpha()` from `@mui/material/styles` for opacity variants | Use `rgba()` with hardcoded colour values                      |
| Use `theme.spacing()` or MUI `sx` numeric spacing              | Use `px` units directly in spacing properties                  |
| Keep `borderRadius: 3` (24px) for cards and map                | Use `borderRadius: '24px'` as a string                         |
| Use the glassmorphism card pattern for floating panels         | Apply box shadows to panels that use the border+gradient style |

### Typography

| Do                                                          | Don't                                                                       |
| ----------------------------------------------------------- | --------------------------------------------------------------------------- |
| Use MUI's typography variants (`h1`–`h6`, `body1`, `body2`) | Use arbitrary `fontSize` values outside the type scale                      |
| Use `text.secondary` for supporting labels                  | Use `text.tertiary` for main content — reserve it for the subtlest hints    |
| Keep headings left-aligned in data sections                 | Centre headings in data sections (centering is reserved for the page intro) |

### Colours

| Do                                                       | Don't                                                           |
| -------------------------------------------------------- | --------------------------------------------------------------- |
| Define new semantic colour groups as named constants     | Add domain-specific colours to the MUI palette                  |
| Keep light/dark variants consistent across both palettes | Introduce a colour in one mode without defining it in the other |

### Map

| Do                                           | Don't                                                              |
| -------------------------------------------- | ------------------------------------------------------------------ |
| Use Mapbox `light-v11` style                 | Switch Mapbox style based on theme mode                            |
| Use pollen semantic tokens for province fill | Add new fill colours without adding them to the pollen token table |

### Layout

| Do                                                     | Don't                                                                |
| ------------------------------------------------------ | -------------------------------------------------------------------- |
| Use `Container` with `maxWidth="xl"` for data sections | Use `maxWidth="md"` or `maxWidth="sm"` for full-width data content   |
| Use `mt: 'auto'` to push the footer to the bottom      | Use absolute or fixed positioning for the footer                     |
| Introduce responsive values only at `xs` and `md`      | Use absolute or fixed positioning for the footer                     |
| Introduce responsive values only at `xs` and `md`      | Add `sm`, `lg`, or `xl` responsive breakpoints without justification |
