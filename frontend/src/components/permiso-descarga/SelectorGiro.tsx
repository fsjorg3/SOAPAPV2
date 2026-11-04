import { Box, Button, ButtonBase, Typography } from '@mui/material';
import { TIPOS_ESTABLECIMIENTO } from '../../config/permisoDescarga';
import type { TipoEstablecimiento } from '../../config/permisoDescarga';
import TituloSeccion from './TituloSeccion';
import { TINTE_CLARO, entradillaSx, panelOscuroSx, rellenoPanelSx } from './estilos';

interface SelectorGiroProps {
  tipo: TipoEstablecimiento | null;
  giroId: string | null;
  onElegirTipo: (tipoId: string) => void;
  onElegirGiro: (giroId: string) => void;
}

const leyendaSx = { p: 0, mb: 2.5, fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4, color: 'primary.contrastText' } as const;

export default function SelectorGiro({ tipo, giroId, onElegirTipo, onElegirGiro }: SelectorGiroProps) {
  return (
    <Box component="section" aria-labelledby="pd-tu-giro" sx={{ ...panelOscuroSx, ...rellenoPanelSx, display: 'flex', flexDirection: 'column', gap: { xs: 4, md: 7 } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, maxWidth: 1100 }}>
        <TituloSeccion id="pd-tu-giro" antetitulo="Parte 2 · Lo que depende de ti" titulo="Ahora, tu giro." oscuro />
        <Typography sx={{ ...entradillaSx, color: TINTE_CLARO, maxWidth: 720 }}>
          Elige tu tipo de establecimiento y tu giro. Armamos tu ruta: cuestionario, documentos que te tocan y cada cuánto entregas análisis.
        </Typography>
      </Box>

      <Box component="fieldset" sx={{ border: 0, p: 0, m: 0, minWidth: 0 }}>
        <Typography component="legend" sx={leyendaSx}>1 · ¿Qué tipo de establecimiento tienes?</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 2 }}>
          {TIPOS_ESTABLECIMIENTO.map((t, i) => {
            const elegido = tipo?.id === t.id;
            return (
              <ButtonBase
                key={t.id}
                aria-pressed={elegido}
                onClick={() => onElegirTipo(t.id)}
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between', gap: 2.5,
                  textAlign: 'left', minHeight: 200, p: 3, borderRadius: 1, border: 1, fontFamily: 'inherit',
                  transition: 'background-color .2s, border-color .2s, color .2s',
                  bgcolor: elegido ? 'primary.dark' : 'background.paper',
                  borderColor: elegido ? 'secondary.main' : 'grey.400',
                  color: elegido ? 'primary.contrastText' : 'text.primary',
                  '&:hover': { borderColor: 'secondary.main' },
                  '&.Mui-focusVisible': { outline: '3px solid', outlineColor: 'secondary.main', outlineOffset: 2 },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box component="span" aria-hidden="true" sx={{ fontSize: '2.5rem', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.03em', color: elegido ? 'secondary.main' : 'secondary.dark' }}>
                    0{i + 1}
                  </Box>
                  <Box component="span" sx={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em' }}>{t.cuestionario}</Box>
                </Box>
                <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box component="span" sx={{ fontWeight: 800, fontSize: '1.125rem', lineHeight: 1.3 }}>{t.nombre}</Box>
                  <Box component="span" sx={{ fontSize: '0.875rem', lineHeight: 1.5 }}>{t.ejemplos}</Box>
                </Box>
              </ButtonBase>
            );
          })}
        </Box>
      </Box>

      {tipo && (
        <Box component="fieldset" sx={{ border: 0, p: 0, m: 0, pt: 3, minWidth: 0, borderTop: 1, borderColor: 'primary.light' }}>
          <Typography component="legend" sx={leyendaSx}>2 · ¿Cuál es tu giro?</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {tipo.giros.map((g) => {
              const elegido = giroId === g.id;
              return (
                <Button
                  key={g.id}
                  aria-pressed={elegido}
                  onClick={() => onElegirGiro(g.id)}
                  sx={{
                    minHeight: 48, px: 2.75, borderRadius: 9999, border: 1, textAlign: 'left', fontSize: '0.9375rem', fontWeight: 600,
                    bgcolor: elegido ? 'primary.dark' : 'background.paper',
                    borderColor: elegido ? 'secondary.main' : 'grey.400',
                    color: elegido ? 'primary.contrastText' : 'text.primary',
                    '&:hover': { bgcolor: elegido ? 'primary.dark' : 'background.paper', borderColor: 'secondary.main' },
                  }}
                >
                  {g.nombre}
                </Button>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}
