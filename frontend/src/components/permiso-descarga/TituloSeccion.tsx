import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { ALTO_NAVBAR, tituloGrandeSx } from './estilos';

interface TituloSeccionProps {
  id: string;
  antetitulo: string;
  titulo: string;
  oscuro?: boolean;
  nivel?: 'h2' | 'h3';
  sx?: SxProps<Theme>;
}

// Antetítulo + título grande. El título recibe el foco al navegar a la sección (tabIndex -1).
export default function TituloSeccion({ id, antetitulo, titulo, oscuro = false, nivel = 'h2', sx }: TituloSeccionProps) {
  return (
    <Box sx={[{ display: 'flex', flexDirection: 'column', gap: 1.5 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography
        component="p"
        sx={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.02em', color: oscuro ? 'secondary.main' : 'primary.light' }}
      >
        {antetitulo}
      </Typography>
      <Typography
        component={nivel}
        id={id}
        tabIndex={-1}
        sx={{
          ...tituloGrandeSx,
          color: oscuro ? 'primary.contrastText' : 'primary.main',
          // Al saltar a la sección, que la Navbar sticky no tape el título.
          scrollMarginTop: { xs: ALTO_NAVBAR.xs + 48, md: ALTO_NAVBAR.md + 64 },
          '&:focus': { outline: 'none' },
        }}
      >
        {titulo}
      </Typography>
    </Box>
  );
}
