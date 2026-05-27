import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export function HeaderIntro() {
  const { t } = useTranslation();

  return (
    <Box sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 1, md: 1 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h1" sx={{ mb: 3 }}>
            {t('components.headerIntro.welcome')}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6
            }}
          >
            {t('components.headerIntro.description')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
