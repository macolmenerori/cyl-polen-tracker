import { ThemeToggle } from './ThemeToggle';

import { render, screen } from '@/test/setupTests';
import { useTheme } from '@/ui/theme/ThemeContext';

// Mock the modules
jest.mock('@/ui/theme/ThemeContext', () => ({
  useTheme: jest.fn()
}));

jest.mock('@macolmenerori/component-library/theme-switch', () => ({
  ThemeSwitch: ({
    enableDarkMode,
    setEnableDarkMode
  }: {
    enableDarkMode: boolean;
    setEnableDarkMode: (value: boolean) => void;
  }) => (
    <button
      data-testid="theme-switch"
      data-dark-mode={enableDarkMode}
      onClick={() => setEnableDarkMode(!enableDarkMode)}
    >
      {enableDarkMode ? 'Dark Mode' : 'Light Mode'}
    </button>
  )
}));

describe('ThemeToggle', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders in light mode', () => {
    (useTheme as jest.Mock).mockReturnValue({ mode: 'light', toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    const themeSwitch = screen.getByTestId('theme-switch');
    expect(themeSwitch).toBeInTheDocument();
    expect(themeSwitch).toHaveAttribute('data-dark-mode', 'false');
    expect(themeSwitch).toHaveTextContent('Light Mode');
  });

  test('renders in dark mode', () => {
    (useTheme as jest.Mock).mockReturnValue({ mode: 'dark', toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    const themeSwitch = screen.getByTestId('theme-switch');
    expect(themeSwitch).toBeInTheDocument();
    expect(themeSwitch).toHaveAttribute('data-dark-mode', 'true');
    expect(themeSwitch).toHaveTextContent('Dark Mode');
  });

  test('calls toggleTheme when clicked', async () => {
    (useTheme as jest.Mock).mockReturnValue({ mode: 'light', toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    const themeSwitch = screen.getByTestId('theme-switch');
    themeSwitch.click();
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
