import { CookieConsent } from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';

export function CustomCookieConsent() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <CookieConsent
      location="bottom"
      buttonText={t('components.cookieConsent.accept')}
      declineButtonText={t('components.cookieConsent.decline')}
      cookieName="cylPolenCookieConsent"
      expires={150}
      enableDeclineButton
      disableButtonStyles
      ButtonComponent={Button}
      customButtonProps={{
        variant: 'contained',
        color: 'primary',
        size: 'small'
      }}
      customDeclineButtonProps={{
        variant: 'outlined',
        size: 'small',
        sx: {
          borderColor: theme.palette.divider,
          color: theme.palette.text.secondary,
          '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.1)
          }
        }
      }}
      customButtonWrapperAttributes={{ style: { display: 'flex', gap: '8px' } }}
      ariaAcceptLabel={t('components.cookieConsent.accept')}
      ariaDeclineLabel={t('components.cookieConsent.decline')}
      style={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderTop: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.1)',
        padding: '16px 24px',
        alignItems: 'center',
        fontFamily: theme.typography.fontFamily,
        fontSize: '0.875rem'
      }}
      contentStyle={{
        color: theme.palette.text.secondary,
        flex: '1 1 auto',
        margin: '0 16px 0 0'
      }}
    >
      {t('components.cookieConsent.message')}
    </CookieConsent>
  );
}
