import { useEffect, useRef, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { TRAMITES } from '../../config/permisoDescarga';
import type { Tramite } from '../../config/permisoDescarga';
import SeccionFija from './SeccionFija';
import TituloSeccion from './TituloSeccion';
import { TINTE_CLARO } from './estilos';

// Nombre corto de cada trámite para el indicador de avance, en el orden de TRAMITES.
const ETIQUETAS_CORTAS = ['Permiso nuevo', 'Renovación', 'Modificación', 'Aviso de cambios'];

function TarjetaTramite({ tramite, indice, horizontal }: { tramite: Tramite; indice: number; horizontal: boolean }) {
  const destacada = indice === 0;
  return (
    <Box
      component="article"
      sx={{
        width: horizontal ? 'min(560px, 84vw)' : 'auto',
        minHeight: { xs: 0, md: 340 },
        flexShrink: 0,
        borderRadius: 1,
        p: { xs: 3, md: 4.5 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 3,
        ...(destacada
          ? { bgcolor: 'primary.main', color: 'primary.contrastText' }
          : { bgcolor: 'background.paper', border: 1, borderColor: 'divider' }),
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
        <Typography aria-hidden="true" sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, lineHeight: 0.9, fontWeight: 800, letterSpacing: '-0.04em', color: destacada ? 'secondary.main' : 'primary.main' }}>
          0{indice + 1}
        </Typography>
        {tramite.costo && (
          <Chip
            label={tramite.costo}
            sx={
              tramite.costo === 'Sin costo'
                ? { bgcolor: 'success.light', color: 'text.primary', fontWeight: 600 }
                : destacada
                  ? { bgcolor: 'primary.main', color: 'primary.contrastText', border: 1, borderColor: '#7A203D', fontWeight: 600 }
                  : { bgcolor: 'background.paper', border: 1, borderColor: 'grey.400', fontWeight: 600 }
            }
          />
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography component="h3" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, lineHeight: 1.15, fontWeight: 800, color: destacada ? 'inherit' : 'primary.main' }}>
          {tramite.titulo}
        </Typography>
        <Typography sx={{ color: destacada ? TINTE_CLARO : 'text.secondary' }}>{tramite.descripcion}</Typography>
      </Box>
    </Box>
  );
}

function Escena({ progreso, estatico }: { progreso: MotionValue<number>; estatico: boolean }) {
  const envolturaRef = useRef<HTMLDivElement>(null);
  const pistaRef = useRef<HTMLDivElement>(null);
  // Cuánto puede desplazarse la pista; se mide al cambiar el tamaño.
  const recorridoMaximo = useMotionValue(0);
  const x = useTransform(() => -progreso.get() * recorridoMaximo.get());
  const avance = useTransform(progreso, (p) => `${Math.round(p * 100)}%`);
  const indiceDe = (p: number) => Math.min(TRAMITES.length - 1, Math.floor(p * TRAMITES.length));
  const [indice, setIndice] = useState(() => indiceDe(progreso.get()));
  useMotionValueEvent(progreso, 'change', (p) => setIndice(indiceDe(p)));

  useEffect(() => {
    const envoltura = envolturaRef.current;
    const pista = pistaRef.current;
    if (estatico || !envoltura || !pista) return;
    const medir = () => recorridoMaximo.set(Math.max(0, pista.scrollWidth - envoltura.clientWidth));
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(envoltura);
    observador.observe(pista);
    return () => observador.disconnect();
  }, [estatico, recorridoMaximo]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px 48px' }}>
        <TituloSeccion id="pd-tramites" antetitulo="04 · Según tu situación" titulo="Cuatro trámites." />
        {!estatico && (
          <Box aria-hidden="true" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 260 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main', whiteSpace: 'nowrap' }}>
              0{indice + 1} · {ETIQUETAS_CORTAS[indice]}
            </Typography>
            <Box sx={{ flex: 1, height: 3, bgcolor: 'divider', minWidth: 120 }}>
              <Box component={motion.div} style={{ width: avance }} sx={{ height: 3, bgcolor: 'secondary.main' }} />
            </Box>
          </Box>
        )}
      </Box>

      {estatico ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
          {TRAMITES.map((t, i) => <TarjetaTramite key={t.titulo} tramite={t} indice={i} horizontal={false} />)}
        </Box>
      ) : (
        <Box ref={envolturaRef} sx={{ overflow: 'hidden' }}>
          <Box ref={pistaRef} component={motion.div} style={{ x }} sx={{ display: 'flex', gap: 3, width: 'max-content' }}>
            {TRAMITES.map((t, i) => <TarjetaTramite key={t.titulo} tramite={t} indice={i} horizontal />)}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default function Tramites() {
  return (
    <SeccionFija tituloId="pd-tramites" pantallas={3.2}>
      {(progreso, estatico) => <Escena progreso={progreso} estatico={estatico} />}
    </SeccionFija>
  );
}
