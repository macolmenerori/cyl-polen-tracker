import { Stack } from '@mui/material';

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
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </Stack>
  );
}
