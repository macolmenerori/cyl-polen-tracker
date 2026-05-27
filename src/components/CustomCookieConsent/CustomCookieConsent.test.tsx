import userEvent from '@testing-library/user-event';

import { CustomCookieConsent } from './CustomCookieConsent';

import { i18n, render, screen } from '@/test/setupTests';

const user = userEvent.setup();

const COOKIE_NAME = 'cylPolenCookieConsent';

const EN_MESSAGE =
  "This website uses cookies to enhance the user experience. By clicking 'Accept', you consent to the use of cookies. You can decline the use of cookies by clicking 'Decline'.";
const EN_ACCEPT = 'Accept';
const EN_DECLINE = 'Decline';

function clearConsentCookie() {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

beforeEach(() => {
  clearConsentCookie();
});

afterEach(() => {
  i18n.changeLanguage('en');
});

describe('CustomCookieConsent', () => {
  it('renders the consent message when no cookie is set', () => {
    render(<CustomCookieConsent />);
    expect(screen.getByText(EN_MESSAGE)).toBeInTheDocument();
  });

  it('renders both Accept and Decline buttons', () => {
    render(<CustomCookieConsent />);
    expect(screen.getByRole('button', { name: EN_ACCEPT })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: EN_DECLINE })).toBeInTheDocument();
  });

  it('hides the banner and sets cookie to true when Accept is clicked', async () => {
    render(<CustomCookieConsent />);
    await user.click(screen.getByRole('button', { name: EN_ACCEPT }));
    expect(screen.queryByText(EN_MESSAGE)).not.toBeInTheDocument();
    expect(document.cookie).toContain(`${COOKIE_NAME}=true`);
  });

  it('hides the banner and sets cookie to false when Decline is clicked', async () => {
    render(<CustomCookieConsent />);
    await user.click(screen.getByRole('button', { name: EN_DECLINE }));
    expect(screen.queryByText(EN_MESSAGE)).not.toBeInTheDocument();
    expect(document.cookie).toContain(`${COOKIE_NAME}=false`);
  });

  it('does not render when the consent cookie is already set', () => {
    document.cookie = `${COOKIE_NAME}=true`;
    render(<CustomCookieConsent />);
    expect(screen.queryByText(EN_MESSAGE)).not.toBeInTheDocument();
  });

  it('renders with Spanish translations when language is set to es', async () => {
    await i18n.changeLanguage('es');
    render(<CustomCookieConsent />);
    expect(
      screen.getByText(
        "Este sitio web utiliza cookies para mejorar la experiencia del usuario. Al hacer clic en 'Aceptar', das tu consentimiento para el uso de cookies. Puedes rechazar el uso de cookies haciendo clic en 'Rechazar'."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Aceptar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rechazar' })).toBeInTheDocument();
  });
});
