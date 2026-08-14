import { Box, CircularProgress } from '@mui/material';

export default function RouteLoadingFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        width: '100%',
      }}
    >
      <CircularProgress color="primary" size={44} thickness={4} aria-label="Cargando contenido" />
    </Box>
  );
}
