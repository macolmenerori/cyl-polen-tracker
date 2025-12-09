import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/**
 * JSON-LD Structured Data Component
 *
 * Provides schema.org structured data for search engines:
 * - WebSite: Identifies the site
 * - BreadcrumbList: Improves SERP appearance
 */

const SITE_URL = 'https://cylpolentracker.miguelangelcolmenero.es/';

interface WebSiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  inLanguage: string[];
}

interface BreadcrumbListSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item?: string;
  }>;
}

export function JsonLd() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'es';

  // Language-specific content
  const content = {
    es: {
      siteName: 'Polen Tracker CyL',
      siteDescription:
        'Monitor de niveles de polen para Castilla y Le\u00f3n. Consulta los niveles de polen actuales por provincia y tipo de polen.',
      breadcrumbHome: 'Inicio'
    },
    en: {
      siteName: 'CyL Pollen Tracker',
      siteDescription:
        'Pollen level monitor for Castilla y Le\u00f3n (Spain). Check current pollen levels by province and pollen type.',
      breadcrumbHome: 'Home'
    }
  };

  const lang: 'es' | 'en' = currentLang === 'en' ? 'en' : 'es';
  const text = content[lang];

  // WebSite Schema
  const websiteSchema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: text.siteName,
    url: SITE_URL,
    description: text.siteDescription,
    inLanguage: ['es', 'en']
  };

  // BreadcrumbList Schema
  const breadcrumbSchema: BreadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: text.breadcrumbHome,
        item: SITE_URL
      }
    ]
  };

  return (
    <Helmet>
      {/* WebSite Schema */}
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>
  );
}
