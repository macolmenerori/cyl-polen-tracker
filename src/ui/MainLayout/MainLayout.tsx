import { Box, Container } from '@mui/material';

import { CurrentPollenLevels } from '@/components/CurrentPollenLevels/CurrentPollenLevels';
import { FooterComponent } from '@/components/FooterComponent/FooterComponent';
import { HeaderIntro } from '@/components/HeaderIntro/HeaderIntro';
import { UpperBar } from '@/components/UpperBar/UpperBar';

export function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header>
        <UpperBar />
      </header>

      <Box component="main" sx={{ flex: 1 }}>
        <HeaderIntro />
        <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
          <CurrentPollenLevels />
        </Container>
      </Box>

      <Box component="footer" sx={{ mt: 'auto', py: 4 }}>
        <FooterComponent />
      </Box>
    </Box>
  );
}
