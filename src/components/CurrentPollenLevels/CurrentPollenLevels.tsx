import { useState } from 'react';

import { Container } from '@mui/material';
import useSWR from 'swr';

import { FilterBar } from '../FilterBar/FilterBar';

import { fetcherPollenData } from '@/api/pollenApi';
import { POLLEN_URL } from '@/types/api';
import { PollenType } from '@/types/pollen';

export function CurrentPollenLevels() {
  const [pollenType, setPollenType] = useState<PollenType | ''>('');

  const { data, error, isLoading } = useSWR(
    pollenType !== ''
      ? `${POLLEN_URL}/informacion-polinica-actual/records?where=tipos_polinicos%20like%20%27${pollenType}%27`
      : null,
    fetcherPollenData
  );

  return (
    <Container>
      <FilterBar pollenType={pollenType} setPollenType={setPollenType} />
      {/* TODO: Please select a pollen type */}
      {pollenType === '' ? <div>Please select a pollen type.</div> : null}
      {/* TODO: spinner */}
      {isLoading && <div>Loading...</div>}
      {/* TODO: error card */}
      {error && <div>Error fetching pollen data.</div>}
      {data && (
        <div>
          <h2>Pollen Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </Container>
  );
}
