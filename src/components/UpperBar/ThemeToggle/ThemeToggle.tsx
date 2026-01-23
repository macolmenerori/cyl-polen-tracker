import { ThemeSwitch } from '@macolmenerori/component-library/theme-switch';

import '@macolmenerori/component-library/theme-switch-css';

import { useTheme } from '@/ui/theme/ThemeContext';

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  const handleSetEnableDarkMode = () => {
    toggleTheme();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ThemeSwitch
        enableDarkMode={mode === 'dark'}
        setEnableDarkMode={handleSetEnableDarkMode}
        size="small"
      />
    </div>
  );
}
