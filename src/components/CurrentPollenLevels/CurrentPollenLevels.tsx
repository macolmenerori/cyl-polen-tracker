import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container, Typography } from '@mui/material';
import useSWR from 'swr';

import { ErrorCard } from '../ErrorCard/ErrorCard';
import { FilterBar } from '../FilterBar/FilterBar';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { PollenMap } from '../PollenMap/PollenMap';

import { fetcherPollenData } from '@/api/pollenApi';
import { POLLEN_URL } from '@/types/api';
import { PollenType } from '@/types/pollen';

export function CurrentPollenLevels() {
  const [pollenType, setPollenType] = useState<PollenType | ''>('');

  const { t } = useTranslation();

  const { data, error, isLoading } = useSWR(
    pollenType !== ''
      ? `${POLLEN_URL}/informacion-polinica-actual/records?where=tipos_polinicos%20like%20%27${pollenType}%27`
      : null,
    fetcherPollenData
  );

  return (
    <Container>
      <FilterBar pollenType={pollenType} setPollenType={setPollenType} />
      {pollenType === '' ? (
        <Typography margin={4} textAlign="center" fontStyle="italic">
          {`${t('components.currentPollenLevels.selectPollenType')}`}
        </Typography>
      ) : null}
      {isLoading && <LoadingSpinner position="center" />}
      {error && <ErrorCard message={t('components.currentPollenLevels.errorCardMessage')} />}
      {data && <PollenMap pollenApiData={data.results} selectedPollen={pollenType} />}
    </Container>
  );
}
