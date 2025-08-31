import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { alpha, Box, Paper, Typography, useTheme } from '@mui/material';
import useSWR from 'swr';

import { ErrorCard } from '../ErrorCard/ErrorCard';
import { FilterBar } from '../FilterBar/FilterBar';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { PollenMap } from '../PollenMap/PollenMap';

import { fetcherPollenData } from '@/api/pollenApi';
import { POLLEN_URL } from '@/types/api';
import { PollenType } from '@/types/pollen';

export function CurrentPollenLevels() {
  const [pollenType, setPollenType] = useState<PollenType | ''>(PollenType.PLANTAGO);
  const { t } = useTranslation();
  const theme = useTheme();

  const { data, error, isLoading } = useSWR(
    pollenType !== ''
      ? `${POLLEN_URL}/informacion-polinica-actual/records?where=tipos_polinicos%20like%20%27${pollenType}%27`
      : null,
    fetcherPollenData
  );

  return (
    <Box>
      <FilterBar pollenType={pollenType} setPollenType={setPollenType} />

      {pollenType === '' ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            background: `linear-gradient(145deg, ${alpha(theme.palette.secondary.main, 0.05)}, ${alpha(theme.palette.primary.main, 0.05)})`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderRadius: 3,
            mx: { xs: 2, md: 0 }
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontStyle: 'italic',
              fontWeight: 400
            }}
          >
            {t('components.currentPollenLevels.selectPollenType')}
          </Typography>
        </Paper>
      ) : (
        <>
          {isLoading && <LoadingSpinner position="center" />}
          {error && <ErrorCard message={t('components.currentPollenLevels.errorCardMessage')} />}
          {data && <PollenMap pollenApiData={data.results} selectedPollen={pollenType} />}
        </>
      )}
    </Box>
  );
}
