import { useState } from 'react';
import type { ReactNode } from 'react';
import { Box, Button, Checkbox, FormControlLabel, LinearProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useReducedMotion } from 'motion/react';
import { DOCUMENTOS_CONDICIONALES } from '../../config/permisoDescarga';
import type { Giro, TipoEstablecimiento } from '../../config/permisoDescarga';
import { armarCalendario, armarGruposDocumentos, contarDocumentos, resumenPeriodicidad } from '../../utils/permisoDescarga';
import TituloSeccion from './TituloSeccion';
import Cierre from './Cierre';
import { ALTO_NAVBAR, TINTE_CLARO, irASeccion, panelClaroSx, rellenoPanelSx, tituloGrandeSx } from './estilos';

const GOTA = 'M12 2 C12 2 3 13 3 19 a9 9 0 0 0 18 0 C21 13 12 2 12 2Z';
const tituloMedianoSx = { ...tituloGrandeSx, fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)' };

function Dato({ etiqueta, children }: { etiqueta: string; children: ReactNode }) {
  return (
    <Box sx={{ bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 0.75, minWidth: 0 }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{etiqueta}</Typography>
      {children}
    </Box>
  );
}

const cifraSx = { fontSize: '2.5rem', lineHeight: 1.1, fontWeight: 800, color: 'primary.main', letterSpacing: '-0.02em' } as const;

// Se monta con key = giro, así que las casillas marcadas se reinician al cambiar de giro.
export default function ResultadoRuta({ tipo, giro }: { tipo: TipoEstablecimiento; giro: Giro }) {
  const theme = useTheme();
  const suave = !useReducedMotion();
  const [marcados, setMarcados] = useState<Record<string, boolean>>({});

  const grupos = armarGruposDocumentos(tipo, giro);
  const total = contarDocumentos(grupos);
  const listos = Object.values(marcados).filter(Boolean).length;
  const calendario = armarCalendario(giro);
  const resumen = resumenPeriodicidad(giro);
  const esTransporte = tipo.clase === 'transporte';

  const alternar = (id: string) => setMarcados((actual) => ({ ...actual, [id]: !actual[id] }));

  return (
    <Box component="section" aria-labelledby="pd-resultado" sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
      {/* Resumen */}
      <Box sx={{ ...rellenoPanelSx, bgcolor: TINTE_CLARO, borderRadius: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px 48px' }}>
          <TituloSeccion id="pd-resultado" antetitulo={`Tu ruta · ${tipo.nombre}`} titulo={giro.nombre} sx={{ maxWidth: 900 }} />
          <Button
            variant="contained"
            href="#tu-giro"
            onClick={(e) => { e.preventDefault(); irASeccion('pd-tu-giro', suave); }}
            sx={{ minHeight: 48, px: 3.25 }}
          >
            Cambiar mi giro
          </Button>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(230px, 100%), 1fr))', gap: 2 }}>
          <Dato etiqueta="Cuestionario"><Typography sx={cifraSx}>{tipo.cuestionario}</Typography></Dato>
          <Dato etiqueta="Documentos en tu lista">
            <Typography sx={cifraSx}>{total}</Typography>
            {!esTransporte && <Typography variant="body2" sx={{ color: 'text.secondary' }}>más los que apliquen a tu caso</Typography>}
          </Dato>
          {resumen && (
            <Dato etiqueta="Análisis de laboratorio">
              <Typography sx={{ fontSize: '1.375rem', lineHeight: 1.25, fontWeight: 800, color: 'primary.main' }}>{resumen}</Typography>
            </Dato>
          )}
          <Dato etiqueta="Vigencia"><Typography sx={cifraSx}>1 año</Typography></Dato>
        </Box>
      </Box>

      {/* Calendario de análisis: solo para giros con periodicidad publicada */}
      {calendario.length > 0 && (
        <Box sx={{ ...panelClaroSx, ...rellenoPanelSx, display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 5fr) minmax(0, 7fr)' }, gap: { xs: 3, md: 8 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
            <Typography component="p" sx={{ fontSize: '0.875rem', fontWeight: 700, color: 'primary.light' }}>Tu calendario</Typography>
            <Typography component="h3" sx={{ ...tituloMedianoSx, color: 'primary.main' }}>Cada gota, una entrega de análisis.</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Laboratorio acreditado ante la EMA. Primer análisis dentro de los 30 días naturales; los siguientes, en los primeros 15 días del mes posterior al muestreo.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {calendario.map((tira) => (
              <Box key={tira.etiqueta} sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '4px 16px' }}>
                  <Typography component="h4" sx={{ fontWeight: 800, fontSize: '1.125rem', color: 'primary.main' }}>{tira.etiqueta} · {tira.cadencia}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>{tira.entregasAlAnio} entregas al año</Typography>
                </Box>
                <Box component="ol" aria-label={`Meses con entrega: ${tira.meses.filter((m) => m.entrega).map((m) => m.numero).join(', ')}`} sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 0.75 }}>
                  {tira.meses.map((m) => (
                    <Box component="li" key={m.numero} aria-hidden="true" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
                      <Box component="svg" viewBox="0 0 24 30" sx={{ width: '100%', maxWidth: 40, height: 'auto' }}>
                        <path d={GOTA} fill={m.entrega ? theme.palette.primary.main : '#FFFFFF'} stroke={m.entrega ? theme.palette.primary.main : theme.palette.grey[400]} strokeWidth="1.5" />
                      </Box>
                      <Box component="span" sx={{ fontSize: '0.75rem', fontWeight: 700, color: m.entrega ? 'primary.main' : 'text.secondary' }}>{m.numero}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Meses desde que recibes el permiso; las gotas rellenas marcan las entregas. Ilustración con el primer análisis en el mes 1.
            </Typography>
          </Box>
        </Box>
      )}

      {/* Lista de documentos */}
      <Box sx={{ ...rellenoPanelSx, px: { xs: 0, md: 0 }, display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 4fr) minmax(0, 8fr)' }, gap: { xs: 3, lg: 6 }, alignItems: 'start' }}>
        <Box sx={{ position: { lg: 'sticky' }, top: { lg: ALTO_NAVBAR.md + 16 }, display: 'flex', flexDirection: 'column', gap: 2.25 }}>
          <Typography component="p" sx={{ fontSize: '0.875rem', fontWeight: 700, color: 'primary.light' }}>Tu lista</Typography>
          <Typography component="h3" sx={{ ...tituloMedianoSx, color: 'primary.main' }}>Marca lo que ya tienes.</Typography>
          <Box aria-live="polite" sx={{ display: 'flex', alignItems: 'baseline', gap: 1.25 }}>
            <Typography sx={{ fontSize: '4rem', lineHeight: 1, fontWeight: 800, color: 'primary.main', letterSpacing: '-0.04em' }}>{listos}</Typography>
            <Typography sx={{ fontWeight: 700, color: 'text.secondary' }}>de {total} listos</Typography>
          </Box>
          <LinearProgress
            aria-hidden="true"
            variant="determinate"
            value={total ? (listos / total) * 100 : 0}
            color="secondary"
            sx={{ height: 8, borderRadius: 9999, bgcolor: 'divider' }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Todo en copia, con el cuestionario lleno, firmado y sellado. Tu lista se borra si cambias de giro.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {grupos.map((grupo, gi) => (
            <Box key={grupo.titulo} sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              <Typography component="h4" variant="h4" sx={{ color: 'primary.main' }}>{grupo.titulo}</Typography>
              {grupo.documentos.map((documento, di) => {
                const id = `${gi}-${di}`;
                const marcado = Boolean(marcados[id]);
                return (
                  <FormControlLabel
                    key={id}
                    control={<Checkbox checked={marcado} onChange={() => alternar(id)} />}
                    label={documento}
                    sx={{
                      m: 0, alignItems: 'flex-start', gap: 0.5, p: '6px 16px 6px 6px', border: 1, borderRadius: 1,
                      borderColor: marcado ? 'primary.main' : 'divider', bgcolor: marcado ? TINTE_CLARO : 'background.paper',
                      '&:hover': { borderColor: 'secondary.main' },
                      '& .MuiFormControlLabel-label': { pt: 1.1, fontSize: '0.9375rem', lineHeight: 1.5 },
                    }}
                  />
                );
              })}
            </Box>
          ))}

          {!esTransporte && (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography component="h4" variant="h4" sx={{ color: 'primary.main', mb: 1 }}>Solo si aplica a tu caso</Typography>
              <Box component="dl" sx={{ m: 0, borderBottom: 1, borderColor: 'divider' }}>
                {DOCUMENTOS_CONDICIONALES.map(({ caso, documento }) => (
                  <Box key={caso} sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 0.5, sm: 2 }, py: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Typography component="dt" sx={{ fontWeight: 700, color: 'primary.main' }}>{caso}</Typography>
                    <Typography component="dd" variant="body2" sx={{ m: 0 }}>{documento}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Cierre />
    </Box>
  );
}
