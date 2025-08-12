import { Stack } from '@mui/material';

import { LanguageSwitcher } from './LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle/ThemeToggle';

export function UpperBar() {
  return (
    <Stack direction="row" spacing={1} alignSelf="end" justifyContent="flex-end" margin={2}>
      <ThemeToggle />
      <LanguageSwitcher />
    </Stack>
  );
}
