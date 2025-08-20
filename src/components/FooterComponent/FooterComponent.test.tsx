import { FooterComponent } from './FooterComponent';

import { render, screen } from '@/test/setupTests';

describe('FooterComponent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders everything correctly', () => {
    render(<FooterComponent />);

    const currentYear = new Date().getFullYear().toString();

    expect(screen.getByText('macolmenerori')).toBeInTheDocument();
    expect(screen.getByText(currentYear)).toBeInTheDocument();

    const profileLink = screen.getByRole('link', { name: 'macolmenerori' });
    expect(profileLink).toHaveAttribute('href', 'https://miguelangelcolmenero.es/');
    expect(profileLink).toHaveAttribute('target', '_blank');
    expect(profileLink).toHaveAttribute('rel', 'noopener');

    const source = screen.getByRole('link', { name: 'CyL' });
    expect(source).toHaveAttribute('href', 'https://analisis.datosabiertos.jcyl.es');
    expect(source).toHaveAttribute('target', '_blank');
    expect(source).toHaveAttribute('rel', 'noopener');

    const projectLink = screen.getByTestId('github-link');
    expect(projectLink).toHaveAttribute(
      'href',
      'https://github.com/macolmenerori/cyl-polen-tracker'
    );
    expect(projectLink).toHaveAttribute('target', '_blank');
    expect(projectLink).toHaveAttribute('rel', 'noopener');

    const iframe = screen.getByTitle('Sponsor macolmenerori');
    expect(iframe).toHaveAttribute('src', 'https://github.com/sponsors/macolmenerori/button');
    expect(iframe).toHaveAttribute('height', '32');
    expect(iframe).toHaveAttribute('width', '114');
  });
});
