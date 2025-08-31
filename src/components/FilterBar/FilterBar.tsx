import { useTranslation } from 'react-i18next';

import { Clear, FilterAlt } from '@mui/icons-material';
import {
  alpha,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  useTheme
} from '@mui/material';

import { PollenType } from '@/types/pollen';

interface FilterBarProps {
  pollenType: PollenType | '';
  setPollenType: (pollenType: PollenType | '') => void;
}

export function FilterBar({ pollenType, setPollenType }: FilterBarProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleClearPollenType = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPollenType('');
  };

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 0 } }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          backdropFilter: 'blur(10px)',
          borderRadius: 3
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <FilterAlt
              sx={{
                color: theme.palette.primary.main,
                fontSize: 28
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              {t('components.filterBar.pollenType')}
            </Typography>
          </Stack>

          <Box sx={{ minWidth: { xs: '100%', sm: 350 } }}>
            <FormControl fullWidth>
              <InputLabel
                id="pollen-select-label"
                sx={{
                  color: 'text.secondary',
                  '&.Mui-focused': {
                    color: 'primary.main'
                  }
                }}
              >
                {t('components.filterBar.pollenType')}
              </InputLabel>
              <Select
                labelId="pollen-select-label"
                id="pollen-select"
                value={pollenType}
                label={t('components.filterBar.pollenType')}
                onChange={(e) => setPollenType(e.target.value as PollenType | '')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: alpha(theme.palette.primary.main, 0.3)
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2
                    }
                  }
                }}
                endAdornment={
                  pollenType && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={handleClearPollenType}
                        onMouseDown={(e) => e.preventDefault()}
                        sx={{
                          marginRight: 1,
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: alpha(theme.palette.primary.main, 0.1)
                          }
                        }}
                        data-testid="clear-pollen-type-button"
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
                    <MenuItem
                      key={key}
                      value={value}
                      sx={{
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1)
                        },
                        '&.Mui-selected': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.15),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2)
                          }
                        }
                      }}
                    >
                      {value}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
