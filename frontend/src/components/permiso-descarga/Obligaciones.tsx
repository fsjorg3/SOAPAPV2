import { Box, Typography } from '@mui/material';
import { OBLIGACIONES } from '../../config/permisoDescarga';
import TituloSeccion from './TituloSeccion';

export default function Obligaciones() {
  return (
    <Box
      component="section"
      aria-labelledby="pd-obligaciones"
      sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 5fr) minmax(0, 7fr)' }, gap: { xs: 3, md: 8 }, alignItems: 'start', py: { xs: 2, md: 6 } }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TituloSeccion id="pd-obligaciones" antetitulo="07 · Tus obligaciones" titulo="Seis cosas que no se negocian." />
        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 420 }}>
          El SOAPAP puede verificar con visitas aleatorias a los establecimientos registrados. No son un paso del trámite.
        </Typography>
      </Box>
      <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 2 }}>
        {OBLIGACIONES.map((obligacion, i) => (
          <Box component="li" key={obligacion.titulo} sx={{ bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            <Typography aria-hidden="true" sx={{ fontSize: '2rem', fontWeight: 800, color: 'secondary.dark', lineHeight: 1 }}>0{i + 1}</Typography>
            <Typography component="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>{obligacion.titulo}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{obligacion.texto}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
