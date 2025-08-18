import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

type ErrorCardProps = {
  message: string;
  width?: string;
  height?: string;
};

export function ErrorCard({ message, width, height }: ErrorCardProps) {
  const { t } = useTranslation();
  return (
    <Box sx={{ width, height, border: '1px solid', borderRadius: '8px', borderColor: 'secondary' }}>
      <Typography textAlign="center" padding={3}>
        {message}
      </Typography>
    </Box>
  );
}
