import { lazy, Suspense } from 'react';
import { Box, Skeleton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { MapaUbicacionProps } from './MapaUbicacion';

const MapaUbicacion = lazy(() => import('./MapaUbicacion'));

interface MapaUbicacionDiferidoProps extends MapaUbicacionProps {
  // Estilos del marco. Por defecto: alto fijo responsivo, borde y radio del tema.
  // Quien lo use puede cambiarlo, p. ej. por aspect-ratio.
  sx?: SxProps<Theme>;
}

const marcoPorDefecto: SxProps<Theme> = {
  height: { xs: 300, md: 420 },
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'grey.100',
};

// Envuelve MapaUbicacion en lazy + Suspense con un placeholder del mismo tamaño,
// para que Leaflet no entre al bundle de la ruta y la página no salte al cargar el mapa.
export default function MapaUbicacionDiferido({ sx, ...props }: MapaUbicacionDiferidoProps) {
  return (
    <Box sx={[{ overflow: 'hidden' }, ...(Array.isArray(sx) ? sx : [sx ?? marcoPorDefecto])]}>
      <Suspense fallback={<Skeleton variant="rectangular" width="100%" height="100%" aria-label="Cargando mapa" />}>
        <MapaUbicacion {...props} />
      </Suspense>
    </Box>
  );
}
