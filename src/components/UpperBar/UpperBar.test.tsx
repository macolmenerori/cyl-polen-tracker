import { UpperBar } from './UpperBar';

import { render, screen } from '@/test/setupTests';

jest.mock('@/components/UpperBar/LanguageSwitcher/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Language Switcher</div>
}));

jest.mock('@/components/UpperBar/ThemeToggle/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>
}));

describe('UpperBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the language switcher and theme toggle components in the UpperBar', () => {
    render(<UpperBar />);
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });
});
