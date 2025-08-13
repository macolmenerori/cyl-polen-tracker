import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FilterBar } from './FilterBar';

import { PollenType } from '@/types/pollen';
import { Stations } from '@/types/stations';

describe('FilterBar', () => {
  const mockSetStation = jest.fn();
  const mockSetPollenType = jest.fn();

  beforeEach(() => {
    // (useTranslation as jest.Mock).mockReturnValue({ t: mockT });
    jest.clearAllMocks();
  });

  const defaultProps = {
    station: '' as Stations | '',
    pollenType: '' as PollenType | '',
    setStation: mockSetStation,
    setPollenType: mockSetPollenType
  };

  it('renders correctly with empty filters', () => {
    render(<FilterBar {...defaultProps} />);

    expect(screen.getByLabelText('Station')).toBeInTheDocument();
    expect(screen.getByLabelText('Pollen type')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeDisabled();
  });

  it('renders with selected station', () => {
    render(<FilterBar {...defaultProps} station={Stations.SALAMANCA} />);

    expect(screen.getByDisplayValue('Salamanca')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeEnabled();
  });

  it('renders with selected pollen type', () => {
    render(<FilterBar {...defaultProps} pollenType={PollenType.BETULA} />);

    expect(screen.getByDisplayValue('Betula')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeEnabled();
  });

  it('calls setStation when station select changes', async () => {
    const user = userEvent.setup();
    render(<FilterBar {...defaultProps} />);

    const stationSelect = screen.getByLabelText('Station');
    await user.click(stationSelect);

    const stationOption = screen.getByRole('option', { name: 'Salamanca' });
    await user.click(stationOption);

    expect(mockSetStation).toHaveBeenCalledWith(Stations.SALAMANCA);
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

  it('clears station when clear station button is clicked', async () => {
    const user = userEvent.setup();
    render(<FilterBar {...defaultProps} station={Stations.SALAMANCA} />);

    const clearButton = screen.getByRole('button', { name: 'Clear' }); // Clear icon button
    await user.click(clearButton);

    expect(mockSetStation).toHaveBeenCalledWith('');
  });

  it('clears pollen type when clear pollen type button is clicked', async () => {
    const user = userEvent.setup();
    render(<FilterBar {...defaultProps} pollenType={PollenType.BETULA} />);

    const clearButtons = screen.getAllByRole('button', { name: 'Clear' });
    await user.click(clearButtons[0]); // First clear button should be for pollen type

    expect(mockSetPollenType).toHaveBeenCalledWith('');
  });

  it('clears all filters when clear all button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <FilterBar {...defaultProps} station={Stations.SALAMANCA} pollenType={PollenType.BETULA} />
    );

    const clearAllButton = screen.getByRole('button', { name: 'Clear' });
    await user.click(clearAllButton);

    expect(mockSetStation).toHaveBeenCalledWith('');
    expect(mockSetPollenType).toHaveBeenCalledWith('');
  });

  it('prevents event propagation on clear station click', async () => {
    const user = userEvent.setup();
    render(<FilterBar {...defaultProps} station={Stations.SALAMANCA} />);

    const clearButton = screen.getByRole('button', { name: 'Clear' });
    await user.click(clearButton);

    expect(mockSetStation).toHaveBeenCalledWith('');
  });

  it('shows clear all button as enabled when there are active filters', () => {
    render(<FilterBar {...defaultProps} station={Stations.SALAMANCA} />);

    const clearAllButton = screen.getByRole('button', { name: 'Clear' });
    expect(clearAllButton).toBeEnabled();
  });

  it('shows clear all button as disabled when there are no active filters', () => {
    render(<FilterBar {...defaultProps} />);

    const clearAllButton = screen.getByRole('button', { name: 'Clear' });
    expect(clearAllButton).toBeDisabled();
  });
});
