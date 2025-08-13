import { useTranslation } from 'react-i18next';

import { Clear, ClearAll } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack
} from '@mui/material';

import { PollenType } from '@/types/pollen';
import { Stations } from '@/types/stations';

interface FilterBarProps {
  station: Stations | '';
  pollenType: PollenType | '';
  setStation: (station: Stations | '') => void;
  setPollenType: (pollenType: PollenType | '') => void;
}

export function FilterBar({ station, pollenType, setStation, setPollenType }: FilterBarProps) {
  const { t } = useTranslation();

  const hasActiveFilters = station !== '' || pollenType !== '';

  const handleClearStation = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent opening the select dropdown
    setStation('');
  };

  const handleClearPollenType = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPollenType('');
  };

  const handleClearAllFilters = () => {
    setStation('');
    setPollenType('');
  };

  return (
    <Stack direction="row" spacing={3} alignItems="center" marginTop={5} justifyContent="center">
      <Box sx={{ minWidth: 250 }}>
        <FormControl fullWidth>
          <InputLabel id="station-select-label">{t('components.filterBar.station')}</InputLabel>
          <Select
            labelId="station-select-label"
            id="station-select"
            value={station}
            label={t('components.filterBar.station')}
            onChange={(e) => setStation(e.target.value as Stations | '')}
            endAdornment={
              station && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClearStation}
                    onMouseDown={(e) => e.preventDefault()} // Prevent focus issues
                    sx={{ marginRight: 1 }}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }
          >
            {Object.entries(Stations)
              .sort(([, a], [, b]) => a.localeCompare(b))
              .map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 250 }}>
        <FormControl fullWidth>
          <InputLabel id="pollen-select-label">{t('components.filterBar.pollenType')}</InputLabel>
          <Select
            labelId="pollen-select-label"
            id="pollen-select"
            value={pollenType}
            label={t('components.filterBar.pollenType')}
            onChange={(e) => setPollenType(e.target.value as PollenType | '')}
            endAdornment={
              pollenType && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClearPollenType}
                    onMouseDown={(e) => e.preventDefault()}
                    sx={{ marginRight: 1 }}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }
          >
            {Object.entries(PollenType)
              .sort(([, a], [, b]) => a.localeCompare(b))
              .map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="outlined"
        size="small"
        startIcon={<ClearAll />}
        onClick={handleClearAllFilters}
        sx={{ whiteSpace: 'nowrap' }}
        disabled={!hasActiveFilters}
      >
        {t('components.filterBar.clear')}
      </Button>
    </Stack>
  );
}
