import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FilterBar } from './FilterBar';

import { PollenType } from '@/types/pollen';

describe('FilterBar', () => {
  const mockSetStation = jest.fn();
  const mockSetPollenType = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    pollenType: '' as PollenType | '',
    setStation: mockSetStation,
    setPollenType: mockSetPollenType
  };

  it('renders correctly with empty filters', () => {
    render(<FilterBar {...defaultProps} />);

    expect(screen.getByLabelText('Pollen type')).toBeInTheDocument();
  });

  it('renders with selected pollen type', () => {
    render(<FilterBar {...defaultProps} pollenType={PollenType.BETULA} />);

    expect(screen.getByDisplayValue('Betula')).toBeInTheDocument();
  });

  it('calls setPollenType when pollen type select changes', async () => {
    const user = userEvent.setup();
    render(<FilterBar {...defaultProps} />);

    const pollenSelect = screen.getByLabelText('Pollen type');
    await user.click(pollenSelect);

    const pollenOption = screen.getByRole('option', { name: 'Betula' });
    await user.click(pollenOption);

    expect(mockSetPollenType).toHaveBeenCalledWith(PollenType.BETULA);
  });

  it('clears pollen type when clear pollen type button is clicked', async () => {
    const user = userEvent.setup();
    render(<FilterBar {...defaultProps} pollenType={PollenType.BETULA} />);

    const clearButton = screen.getByTestId('clear-pollen-type-button');
    await user.click(clearButton);

    expect(mockSetPollenType).toHaveBeenCalledWith('');
  });
});
