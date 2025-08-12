import React from 'react';
import { initReactI18next } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';

import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import i18n from 'i18next';

import '@testing-library/jest-dom';

import enTranslation from '@/../public/locales/en.json';
import esTranslation from '@/../public/locales/es.json';
import { createAppTheme } from '@/ui/theme/theme';

// Initialize i18n for testing
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  resources: {
    en: {
      translation: enTranslation
    },
    es: {
      translation: esTranslation
    }
  }
});

// Mock HTMLFormElement.prototype.requestSubmit if not available
if (!HTMLFormElement.prototype.requestSubmit) {
  HTMLFormElement.prototype.requestSubmit = function (submitter) {
    if (submitter) {
      submitter.click();
    } else {
      this.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }
  };
}

interface ExtendedRenderOptions {
  theme?: 'light' | 'dark';
  lng?: string; // Allow overriding language for specific tests
}

function renderWithProviders(
  ui: React.ReactElement,
  options = {},
  extended: ExtendedRenderOptions = {}
) {
  const theme = createAppTheme(extended.theme || 'light');

  // If a specific language is provided for this test, change it
  if (extended.lng && extended.lng !== i18n.language) {
    i18n.changeLanguage(extended.lng);
  }

  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </I18nextProvider>
    );
  };

  return render(ui, { wrapper: AllProviders, ...options });
}

export * from '@testing-library/react';
export { renderWithProviders as render };
export { i18n }; // Export i18n instance for direct manipulation in tests if needed
