import { Stack } from '@mui/material';

import { CurrentPollenLevels } from '@/components/CurrentPollenLevels/CurrentPollenLevels';
import { FooterComponent } from '@/components/FooterComponent/FooterComponent';
import { HeaderIntro } from '@/components/HeaderIntro/HeaderIntro';
import { UpperBar } from '@/components/UpperBar/UpperBar';

export function MainLayout() {
  return (
    <Stack spacing={3}>
      <header>
        <UpperBar />
      </header>
      <main>
        <HeaderIntro />
        <CurrentPollenLevels />
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </Stack>
  );
}
