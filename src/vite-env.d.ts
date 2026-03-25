/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPBOX_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Injected at build time by Vite's `define` — value comes from package.json version */
declare const __APP_VERSION__: string;
