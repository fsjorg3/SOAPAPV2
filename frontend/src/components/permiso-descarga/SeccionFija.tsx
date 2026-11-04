import { useRef } from 'react';
import type { ReactNode } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMotionValue, useReducedMotion } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { useProgresoSeccion } from './useProgresoSeccion';
import { ALTO_NAVBAR, panelClaroSx, panelOscuroSx, rellenoPanelSx } from './estilos';

interface SeccionFijaProps {
  // Id del título que nombra la sección (aria-labelledby).
  tituloId: string;
  // Alto de la sección en pantallas: cuánto scroll dura la animación.
  pantallas: number;
  oscuro?: boolean;
  children: (progreso: MotionValue<number>, estatico: boolean) => ReactNode;
}

// Sección que se queda fija mientras el scroll avanza su animación. En móvil (donde el contenido no cabe
// en una pantalla) y con "reducir movimiento" se muestra completa, con altura normal y el progreso en 1.
export default function SeccionFija({ tituloId, pantallas, oscuro = false, children }: SeccionFijaProps) {
  const ref = useRef<HTMLElement>(null);
  const theme = useTheme();
  const escritorio = useMediaQuery(theme.breakpoints.up('md'));
  const reducirMovimiento = useReducedMotion();
  const progresoScroll = useProgresoSeccion(ref);
  const progresoCompleto = useMotionValue(1);

  const estatico = Boolean(reducirMovimiento) || !escritorio;
  const progreso = estatico ? progresoCompleto : progresoScroll;

  return (
    <Box
      component="section"
      ref={ref}
      aria-labelledby={tituloId}
      sx={{
        ...(oscuro ? panelOscuroSx : panelClaroSx),
        position: 'relative',
        height: estatico ? 'auto' : `${pantallas * 100}svh`,
      }}
    >
      <Box
        sx={
          estatico
            ? rellenoPanelSx
            : {
                ...rellenoPanelSx,
                position: 'sticky',
                top: ALTO_NAVBAR.md,
                height: `calc(100svh - ${ALTO_NAVBAR.md}px)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
              }
        }
      >
        {children(progreso, estatico)}
      </Box>
    </Box>
  );
}
