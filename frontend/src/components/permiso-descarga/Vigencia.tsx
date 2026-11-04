import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { CONTENIDO_PERMISO } from '../../config/permisoDescarga';
import { clamp01 } from '../../utils/permisoDescarga';
import SeccionFija from './SeccionFija';
import TituloSeccion from './TituloSeccion';

// Cada punto del contenido se enciende al avanzar el scroll; antes queda atenuado.
function PuntoContenido({ indice, progreso, titulo, texto }: { indice: number; progreso: MotionValue<number>; titulo: string; texto: string }) {
  const inicio = (indice + 0.3) / 6;
  const opacidad = useTransform(progreso, [inicio - 0.02, inicio], [0.22, 1]);

  return (
    <motion.li style={{ opacity: opacidad }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '48px minmax(0, 1fr)', gap: 1.5, py: 1.75, borderTop: 1, borderColor: 'divider' }}>
        <Typography sx={{ fontWeight: 800, color: 'secondary.dark' }}>0{indice + 1}</Typography>
        <Typography>
          <Box component="strong" sx={{ color: 'primary.main' }}>{titulo}</Box> {texto}
        </Typography>
      </Box>
    </motion.li>
  );
}

function Escena({ progreso }: { progreso: MotionValue<number> }) {
  const theme = useTheme();
  const anillo = useTransform(progreso, (p) => clamp01(p * 1.15));

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 5fr) minmax(0, 7fr)' }, gap: { xs: 4, md: 8 }, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box component="svg" role="img" aria-label="Vigencia de un año" viewBox="0 0 320 320" sx={{ width: 'min(380px, 70vw)', height: 'auto', maxHeight: { md: '46vh' } }}>
          <circle cx="160" cy="160" r="136" fill="none" stroke={theme.palette.grey[100]} strokeWidth="18" />
          <motion.circle
            cx="160" cy="160" r="136" fill="none" stroke={theme.palette.primary.main} strokeWidth="18"
            transform="rotate(-90 160 160)" style={{ pathLength: anillo }}
          />
          <text x="160" y="168" textAnchor="middle" fontSize="76" fontWeight="800" fill={theme.palette.primary.main} fontFamily="inherit" letterSpacing="-3">1 año</text>
          <text x="160" y="212" textAnchor="middle" fontSize="17" fontWeight="600" fill={theme.palette.text.secondary} fontFamily="inherit">de vigencia · se renueva</text>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TituloSeccion id="pd-vigencia" antetitulo="03 · Qué trae tu permiso" titulo="Un documento con tus reglas." />
        <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, borderBottom: 1, borderColor: 'divider' }}>
          {CONTENIDO_PERMISO.map((punto, i) => (
            <PuntoContenido key={punto.titulo} indice={i} progreso={progreso} titulo={punto.titulo} texto={punto.texto} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default function Vigencia() {
  return (
    <SeccionFija tituloId="pd-vigencia" pantallas={2.4}>
      {(progreso) => <Escena progreso={progreso} />}
    </SeccionFija>
  );
}
