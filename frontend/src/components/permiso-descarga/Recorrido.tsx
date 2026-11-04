import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, useMotionValueEvent, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { ETAPAS_RECORRIDO } from '../../config/permisoDescarga';
import { clamp01 } from '../../utils/permisoDescarga';
import SeccionFija from './SeccionFija';
import TituloSeccion from './TituloSeccion';
import { TINTE_CLARO, VINO_APAGADO, VINO_MEDIO, entradillaSx } from './estilos';

// Fracción del trazo en la que la tubería alcanza cada etapa (establecimiento, registro, drenaje, planta).
const UMBRALES = [0, 0.277, 0.614, 0.97];
const etapaDe = (trazo: number) => UMBRALES.reduce((etapa, umbral, i) => (trazo >= umbral ? i : etapa), 0);
const TUBERIA = 'M170 300 V340 H860 V260';

function Escena({ progreso, estatico }: { progreso: MotionValue<number>; estatico: boolean }) {
  const theme = useTheme();
  const trazo = useTransform(progreso, (p) => clamp01(p * 1.12));
  const [etapa, setEtapa] = useState(() => etapaDe(trazo.get()));
  useMotionValueEvent(trazo, 'change', (valor) => setEtapa(etapaDe(valor)));

  const oro = theme.palette.secondary.main;
  const activa = (i: number) => estatico || etapa >= i;
  const trazoDe = (i: number) => (activa(i) ? oro : VINO_MEDIO);
  const rellenoDe = (i: number) => (activa(i) ? oro : theme.palette.primary.main);
  const textoDe = (i: number) => (activa(i) ? '#FFFFFF' : VINO_APAGADO);
  const transicion = estatico ? undefined : 'fill .35s ease, stroke .35s ease';
  const etiqueta = { textAnchor: 'middle', fontSize: 20, fontWeight: 700, fontFamily: 'inherit', style: { transition: transicion } } as const;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px 48px' }}>
        <TituloSeccion id="pd-recorrido" antetitulo="01 · Qué regula el permiso" titulo="El recorrido de tu agua residual." oscuro sx={{ maxWidth: 760 }} />
        <Typography sx={{ ...entradillaSx, color: TINTE_CLARO, maxWidth: 460 }}>
          Cuánta puedes descargar, por dónde, a qué planta llega y qué límites de contaminantes debes cumplir.
        </Typography>
      </Box>

      <Box
        component="svg"
        role="img"
        aria-label="Recorrido: establecimiento, registro a pie de banqueta, drenaje municipal y planta de tratamiento"
        viewBox="0 0 1000 400"
        sx={{ width: '100%', height: 'auto', maxHeight: { md: '44vh' }, display: 'block' }}
      >
        <g fill="none" strokeWidth="2" strokeLinejoin="round" style={{ transition: transicion }}>
          <rect x="90" y="110" width="160" height="190" rx="4" stroke={trazoDe(0)} />
          <path d="M120 150h30M180 150h40M120 190h30M180 190h40M120 230h30M180 230h40M155 300v-40h30v40" stroke={trazoDe(0)} />
        </g>
        <rect x="338" y="318" width="44" height="44" rx="4" fill={rellenoDe(1)} stroke={trazoDe(1)} strokeWidth="2" style={{ transition: transicion }} />
        <circle cx="640" cy="340" r="26" fill={rellenoDe(2)} stroke={trazoDe(2)} strokeWidth="2" style={{ transition: transicion }} />
        <g fill="none" strokeWidth="2" style={{ transition: transicion }}>
          <circle cx="860" cy="200" r="46" stroke={trazoDe(3)} />
          <circle cx="860" cy="200" r="24" fill={rellenoDe(3)} stroke={trazoDe(3)} />
          <path d="M800 260h120" stroke={trazoDe(3)} />
        </g>
        <path d={TUBERIA} fill="none" stroke={theme.palette.primary.light} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <motion.path d={TUBERIA} fill="none" stroke={oro} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: trazo }} />
        <text x="170" y="90" fill={textoDe(0)} {...etiqueta}>Tu establecimiento</text>
        <text x="360" y="394" fill={textoDe(1)} {...etiqueta}>Registro</text>
        <text x="640" y="394" fill={textoDe(2)} {...etiqueta}>Drenaje municipal</text>
        <text x="860" y="128" fill={textoDe(3)} {...etiqueta}>Planta de tratamiento</text>
      </Box>

      {estatico ? (
        <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 2, gridTemplateColumns: { md: 'repeat(2, minmax(0, 1fr))' } }}>
          {ETAPAS_RECORRIDO.map((e, i) => (
            <Box component="li" key={e.titulo} sx={{ borderTop: 1, borderColor: 'primary.light', pt: 1.5, display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 800, color: 'secondary.main' }}>0{i + 1}</Typography>
              <Typography sx={{ color: TINTE_CLARO }}>
                <strong style={{ color: '#FFFFFF' }}>{e.titulo}</strong> {e.texto}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px 32px', minHeight: 72, borderTop: 1, borderColor: 'primary.light', pt: 2.5 }}>
          <Typography aria-hidden="true" sx={{ fontSize: '2.75rem', lineHeight: 1, fontWeight: 800, color: 'secondary.main' }}>
            0{etapa + 1}/04
          </Typography>
          <Typography aria-live="polite" sx={{ ...entradillaSx, color: TINTE_CLARO, maxWidth: 820 }}>
            <strong style={{ color: '#FFFFFF' }}>{ETAPAS_RECORRIDO[etapa].titulo}</strong> {ETAPAS_RECORRIDO[etapa].texto}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default function Recorrido() {
  return (
    <SeccionFija tituloId="pd-recorrido" pantallas={3.2} oscuro>
      {(progreso, estatico) => <Escena progreso={progreso} estatico={estatico} />}
    </SeccionFija>
  );
}
