import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type ErrorCardProps = {
  message: string;
  width?: string;
  height?: string;
};

export function ErrorCard({ message, width, height }: ErrorCardProps) {
  return (
    <Box sx={{ width, height, border: '1px solid', borderRadius: '8px', borderColor: 'secondary' }}>
      <Typography
        sx={{
          textAlign: 'center',
          padding: 3
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}
