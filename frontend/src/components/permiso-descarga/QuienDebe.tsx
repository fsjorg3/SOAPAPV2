import { Box, Typography } from '@mui/material';
import { TIPOS_ESTABLECIMIENTO } from '../../config/permisoDescarga';
import TituloSeccion from './TituloSeccion';

export default function QuienDebe() {
  return (
    <Box
      component="section"
      aria-labelledby="pd-quien"
      sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 5fr) minmax(0, 7fr)' }, gap: { xs: 3, md: 8 }, py: { xs: 2, md: 6 } }}
    >
      <TituloSeccion id="pd-quien" antetitulo="02 · Quién debe tramitarlo" titulo="Si descargas al drenaje, te toca." />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, pt: 1 }}>
        <Typography sx={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', lineHeight: 1.5, fontWeight: 600 }}>
          Establecimientos de{' '}
          <Box component="span" sx={{ color: 'primary.main', fontWeight: 800 }}>industria, comercio y servicios</Box>{' '}
          que descargan agua residual al drenaje municipal, y empresas que{' '}
          <Box component="span" sx={{ color: 'primary.main', fontWeight: 800 }}>transportan aguas residuales en pipas</Box>{' '}
          hacia una planta de tratamiento.
        </Typography>
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 1.5 }}>
          {TIPOS_ESTABLECIMIENTO.map((tipo) => (
            <Box component="li" key={tipo.id} sx={{ bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.light' }}>{tipo.cuestionario}</Typography>
              <Typography sx={{ fontWeight: 700 }}>{tipo.nombre}</Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Cada tipo usa un cuestionario distinto. Al final del recorrido eliges el tuyo.
        </Typography>
      </Box>
    </Box>
  );
}
