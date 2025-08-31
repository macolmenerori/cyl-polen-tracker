import { useTranslation } from 'react-i18next';

import { Box, Container, Typography, useTheme } from '@mui/material';

export function HeaderIntro() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: 'white',
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.1)',
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box textAlign="center">
          <Typography
            variant="h1"
            sx={{
              mb: 3,
              background:
                'linear-gradient(45deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {t('components.headerIntro.welcome')}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              opacity: 0.9,
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
