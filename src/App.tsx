import { CssBaseline } from '@mui/material';

import { SEOHead } from './components/SEO/SEOHead';
import { MainLayout } from './ui/MainLayout/MainLayout';
import { ThemeProvider } from './ui/theme/ThemeContext';

export function App() {
  return (
    <ThemeProvider>
      <SEOHead />
      <CssBaseline />
      <MainLayout />
    </ThemeProvider>
  );
}
