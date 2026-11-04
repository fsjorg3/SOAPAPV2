import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router';
import { TINTE_CLARO, panelOscuroSx, rellenoPanelSx, tituloGrandeSx } from './estilos';

// Cierre de la ruta. Domicilio, horario y teléfonos se agregan cuando la Gerencia los confirme;
// mientras tanto se envía a la página de contacto del sitio.
export default function Cierre() {
  return (
    <Box sx={{ ...panelOscuroSx, ...rellenoPanelSx, display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 5fr) minmax(0, 7fr)' }, gap: { xs: 3, md: 8 }, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography component="p" sx={{ fontSize: '0.875rem', fontWeight: 700, color: 'secondary.main' }}>Cuando tengas todo</Typography>
        <Typography component="h3" sx={{ ...tituloGrandeSx, fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)' }}>
          Entrega en la Oficialía de Partes del SOAPAP.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start' }}>
        <Typography sx={{ color: TINTE_CLARO }}>
          La Oficialía turna tu solicitud a la Gerencia de Saneamiento y Medio Ambiente, que revisa tu cuestionario y tus documentos.
          Para dudas antes de entregar, consulta los medios de contacto del SOAPAP.
        </Typography>
        <Button
          component={Link}
          to="/contacto"
          sx={{ minHeight: 48, px: 3, bgcolor: 'secondary.main', color: 'primary.dark', '&:hover': { bgcolor: 'secondary.light' } }}
        >
          Ver medios de contacto
        </Button>
      </Box>
    </Box>
  );
}
