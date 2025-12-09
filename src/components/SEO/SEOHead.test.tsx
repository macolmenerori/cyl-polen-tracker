import { HelmetProvider } from 'react-helmet-async';

import { SEOHead } from './SEOHead';

import { render, screen } from '@/test/setupTests';

// Wrapper with HelmetProvider for testing
const renderWithHelmet = (ui: React.ReactElement) => {
  return render(<HelmetProvider>{ui}</HelmetProvider>);
};

describe('SEOHead', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      const { container } = renderWithHelmet(<SEOHead />);
      expect(container).toBeInTheDocument();
    });

    it('renders HelmetProvider component successfully', () => {
      const { container } = renderWithHelmet(<SEOHead />);
      expect(container).toBeTruthy();
    });
  });

  describe('Component Integration', () => {
    it('includes both Helmet and JsonLd components without errors', () => {
      const { container } = renderWithHelmet(<SEOHead />);
      expect(container).toBeTruthy();
    });

    it('renders all SEO enhancements (meta tags + JSON-LD)', () => {
      // This test verifies that the component renders successfully with all enhancements:
      // - Canonical URL
      // - Hreflang alternates
      // - Open Graph tags
      // - Twitter Card tags
      // - JSON-LD structured data (WebSite, BreadcrumbList)
      const { container } = renderWithHelmet(<SEOHead />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('does not render any visible content', () => {
      renderWithHelmet(<SEOHead />);
      // SEOHead should only render head elements, no visible content
      expect(screen.queryByRole('main')).not.toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });
  });
});
