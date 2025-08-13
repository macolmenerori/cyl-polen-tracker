import { useState } from 'react';

import { Container } from '@mui/material';

import { FilterBar } from '../FilterBar/FilterBar';

import { PollenType } from '@/types/pollen';
import { Stations } from '@/types/stations';

export function CurrentPollenLevels() {
  const [station, setStation] = useState<Stations | ''>('');
  const [pollenType, setPollenType] = useState<PollenType | ''>('');

  return (
    <Container>
      <FilterBar
        station={station}
        pollenType={pollenType}
        setStation={setStation}
        setPollenType={setPollenType}
      />
    </Container>
  );
}
