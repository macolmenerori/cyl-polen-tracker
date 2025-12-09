import { StrictMode, Suspense } from 'react';

import { ViteReactSSG } from 'vite-react-ssg/single-page';

import './i18n.ts';

import { App } from './App';

export const createRoot = ViteReactSSG(
  <StrictMode>
    <Suspense fallback={<p>Loading...</p>}>
      <App />
    </Suspense>
  </StrictMode>
);
