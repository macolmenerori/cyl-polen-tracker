import Stack from '@mui/material/Stack';

import { LanguageSwitcher } from './LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle/ThemeToggle';

export function UpperBar() {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignSelf: 'end',
        justifyContent: 'flex-end',
        margin: 2
      }}
    >
      <ThemeToggle />
      <LanguageSwitcher />
    </Stack>
  );
}
