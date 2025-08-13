import { useTranslation } from 'react-i18next';

import { Container, Typography } from '@mui/material';

export function HeaderIntro() {
  const { t } = useTranslation();
  return (
    <Container>
      <Typography variant="h1" align="center">
        {t('components.headerIntro.welcome')}
      </Typography>
      <Typography variant="body1" align="center">
        <i>{t('components.headerIntro.description')}</i>
      </Typography>
    </Container>
  );
}
