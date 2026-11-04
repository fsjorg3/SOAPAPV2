import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useMotionValueEvent } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { HITOS_PRIMER_ANIO } from '../../config/permisoDescarga';
import { clamp01 } from '../../utils/permisoDescarga';
import SeccionFija from './SeccionFija';
import TituloSeccion from './TituloSeccion';
import { TINTE_CLARO, VINO_APAGADO, VINO_MEDIO } from './estilos';

const mesesLlenos = (p: number) => Math.round(clamp01(p * 1.1) * 12);

function Escena({ progreso }: { progreso: MotionValue<number> }) {
  const [mes, setMes] = useState(() => mesesLlenos(progreso.get()));
  useMotionValueEvent(progreso, 'change', (p) => setMes(mesesLlenos(p)));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 5 } }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px 48px' }}>
        <TituloSeccion id="pd-primer-anio" antetitulo="06 · Después de recibirlo" titulo="Tu primer año con permiso." oscuro sx={{ maxWidth: 760 }} />
        <Box aria-hidden="true" sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
          <Typography variant="body2" sx={{ color: TINTE_CLARO }}>Mes</Typography>
          <Typography sx={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 0.9, fontWeight: 800, color: 'secondary.main', letterSpacing: '-0.04em' }}>{mes}</Typography>
        </Box>
      </Box>

      <Box aria-hidden="true" sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(6, minmax(0, 1fr))', md: 'repeat(12, minmax(0, 1fr))' }, gap: 0.75 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <Box
            key={i}
            sx={{
              height: 56, borderRadius: 0.5, border: 1, borderColor: VINO_MEDIO, display: 'flex', alignItems: 'flex-end', px: 1, py: 0.75,
              fontSize: '0.75rem', fontWeight: 700, transition: 'background-color .35s ease, color .35s ease',
              bgcolor: i < mes ? 'secondary.main' : 'primary.main',
              color: i < mes ? 'primary.main' : VINO_APAGADO,
            }}
          >
            {i + 1}
          </Box>
        ))}
      </Box>

      <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 3 }}>
        {HITOS_PRIMER_ANIO.map((hito) => (
          <Box
            component="li"
            key={hito.titulo}
            sx={{ opacity: hito.mes === 0 || mes >= hito.mes ? 1 : 0.25, transition: 'opacity .35s ease', borderTop: 2, borderColor: 'secondary.main', pt: 1.75, display: 'flex', flexDirection: 'column', gap: 0.5 }}
          >
            <Typography sx={{ fontWeight: 800, fontSize: '1.125rem' }}>{hito.titulo}</Typography>
            <Typography variant="body2" sx={{ color: TINTE_CLARO }}>{hito.texto}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function PrimerAnio() {
  return (
    <SeccionFija tituloId="pd-primer-anio" pantallas={2.6} oscuro>
      {(progreso) => <Escena progreso={progreso} />}
    </SeccionFija>
  );
}
