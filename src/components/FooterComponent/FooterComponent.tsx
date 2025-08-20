import { useTranslation } from 'react-i18next';

import CopyrightIcon from '@mui/icons-material/Copyright';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Divider, Link, Stack, Typography } from '@mui/material';

export function FooterComponent() {
  const { t } = useTranslation();
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1}
      divider={<Divider orientation="vertical" flexItem />}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 2
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <CopyrightIcon fontSize="small" />
        <Typography>
          <Link
            href="https://miguelangelcolmenero.es/"
            target="_blank"
            rel="noopener"
            sx={{ color: 'text.primary' }}
          >
            macolmenerori
          </Link>{' '}
          {new Date().getFullYear()}
        </Typography>
      </Stack>
      <Typography>
        {t('components.footer.source')}:{' '}
        <Link
          href="https://analisis.datosabiertos.jcyl.es"
          target="_blank"
          rel="noopener"
          sx={{ color: 'text.primary' }}
        >
          CyL
        </Link>
      </Typography>
      <Link
        href="https://github.com/macolmenerori/cyl-polen-tracker"
        target="_blank"
        rel="noopener"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <GitHubIcon sx={{ color: 'text.primary' }} />
      </Link>
      <iframe
        src="https://github.com/sponsors/macolmenerori/button"
        title="Sponsor macolmenerori"
        height="32"
        width="114"
        style={{ border: 0, borderRadius: '6px' }}
      ></iframe>
    </Stack>
  );
}
