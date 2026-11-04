import { Box, Typography } from '@mui/material';
import { FUNDAMENTO_LEGAL, PREGUNTAS_FRECUENTES } from '../../config/permisoDescarga';
import TituloSeccion from './TituloSeccion';
import { panelClaroSx, rellenoPanelSx } from './estilos';

export default function PreguntasFrecuentes() {
  return (
    <Box
      component="section"
      aria-labelledby="pd-preguntas"
      sx={{ ...panelClaroSx, ...rellenoPanelSx, display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 5fr) minmax(0, 7fr)' }, gap: { xs: 3, md: 8 } }}
    >
      <TituloSeccion id="pd-preguntas" antetitulo="Preguntas frecuentes" titulo="Lo que más se pregunta." />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {PREGUNTAS_FRECUENTES.map(({ pregunta, respuesta }) => (
            <Box
              component="details"
              key={pregunta}
              sx={{
                borderTop: 1, borderColor: 'divider',
                '& summary': {
                  listStyle: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3,
                  py: 2.75, fontSize: '1.125rem', fontWeight: 700, color: 'primary.main',
                },
                '& summary::-webkit-details-marker': { display: 'none' },
                '& summary:focus-visible': { outline: '3px solid', outlineColor: 'secondary.main', outlineOffset: 2 },
                '&[open] .signo': { transform: 'rotate(45deg)' },
              }}
            >
              <summary>
                {pregunta}
                <Box component="span" className="signo" aria-hidden="true" sx={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1, color: 'secondary.dark', flex: 'none', transition: 'transform .2s' }}>+</Box>
              </summary>
              <Typography sx={{ pb: 2.75, maxWidth: 760, color: 'text.secondary' }}>{respuesta}</Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{FUNDAMENTO_LEGAL}</Typography>
      </Box>
    </Box>
  );
}
