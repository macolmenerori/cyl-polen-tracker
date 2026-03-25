import { CssBaseline } from '@mui/material';

import { DatadogRum } from './components/DatadogRum/DatadogRum';
import { SEOHead } from './components/SEO/SEOHead';
import { MainLayout } from './ui/MainLayout/MainLayout';
import { ThemeProvider } from './ui/theme/ThemeContext';

export function App() {
  return (
    <ThemeProvider>
      <DatadogRum />
      <SEOHead />
      <CssBaseline />
      <MainLayout />
    </ThemeProvider>
  );
}
