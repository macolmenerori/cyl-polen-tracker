import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { JsonLd } from './JsonLd';

const CANONICAL_URL = 'https://cylpolentracker.miguelangelcolmenero.es/';

export function SEOHead() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const metadata = {
    es: {
      title: 'Polen Tracker CyL | Monitor de Niveles de Polen',
      description:
        'Monitor de niveles de polen para Castilla y Le\u00f3n. Consulta los niveles de polen actuales por provincia y tipo de polen en un mapa interactivo.',
      keywords:
        'polen, alergia, Castilla y Le\u00f3n, niveles de polen, alergias, gram\u00edneas, olivo, cipr\u00e9s, mapa polen'
    },
    en: {
      title: 'CyL Pollen Tracker | Pollen Level Monitor',
      description:
        'Pollen level monitor for Castilla y Le\u00f3n (Spain). Check current pollen levels by province and pollen type on an interactive map.',
      keywords:
        'pollen, allergy, Castilla y Leon, pollen levels, allergies, grass, olive, cypress, pollen map'
    }
  };

  const meta = metadata[currentLang as 'es' | 'en'] || metadata.es;

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={currentLang} />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />

        {/* Canonical URL */}
        <link rel="canonical" href={CANONICAL_URL} />

        {/* Language alternates */}
        <link rel="alternate" hrefLang="es" href={CANONICAL_URL} />
        <link rel="alternate" hrefLang="en" href={`${CANONICAL_URL}?lang=en`} />
        <link rel="alternate" hrefLang="x-default" href={CANONICAL_URL} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:locale" content={currentLang === 'es' ? 'es_ES' : 'en_US'} />
        <meta property="og:locale:alternate" content={currentLang === 'es' ? 'en_US' : 'es_ES'} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />

        {/* Theme */}
        <meta name="theme-color" content="#1976d2" />
        <meta name="color-scheme" content="light dark" />
      </Helmet>

      {/* JSON-LD Structured Data */}
      <JsonLd />
    </HelmetProvider>
  );
}
