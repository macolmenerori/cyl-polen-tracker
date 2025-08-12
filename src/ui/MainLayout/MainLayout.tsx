import { Stack } from '@mui/material';

import { UpperBar } from '@/components/UpperBar/UpperBar';

export function MainLayout() {
  return (
    <Stack spacing={3}>
      <header>
        <UpperBar />
      </header>
      <main>
        <h1>Main Content</h1>
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </Stack>
  );
}
