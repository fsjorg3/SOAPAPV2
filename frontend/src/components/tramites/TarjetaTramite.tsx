import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router';
import type { TramiteConfig } from '../../config/tramites/tipos';
import { rutaTramite, textoCosto } from '../../utils/tramites';

// Tarjeta genérica (tema institucional) que enlaza a la página de un trámite.
// La imagen va en 16:9: es la proporción de las imágenes que entregará Comunicación Social.
// Mientras no exista imagenTarjeta, se muestra la ilustración del trámite completa sobre fondo claro.
export default function TarjetaTramite({ tramite }: { tramite: TramiteConfig }) {
  const imagen = tramite.imagenTarjeta ?? tramite.ilustracion.src;
  const esProvisional = !tramite.imagenTarjeta;

  return (
    <Card sx={{ p: 0, height: '100%', display: 'flex', '&:hover .tarjeta-tramite-accion': { gap: 1.25 } }}>
      <CardActionArea
        component={Link}
        to={rutaTramite(tramite)}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start', height: '100%' }}
      >
        <Box
          component="img"
          src={imagen}
          // La imagen es decorativa: el nombre del trámite ya da el texto del enlace.
          alt=""
          loading="lazy"
          sx={{
            display: 'block',
            width: '100%',
            aspectRatio: '16 / 9',
            objectFit: esProvisional ? 'contain' : 'cover',
            backgroundColor: esProvisional ? 'grey.100' : 'transparent',
            p: esProvisional ? 2 : 0,
          }}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
          <Typography component="h3" variant="h6" sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1.25 }}>
            {tramite.nombre}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1 }}>
            {tramite.resumen}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Costo: {textoCosto(tramite)}
          </Typography>
          <Box
            className="tarjeta-tramite-accion"
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              mt: 0.5,
              fontWeight: 700,
              color: 'primary.main',
              transition: 'gap .15s ease',
              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
            }}
          >
            Ver requisitos
            <ArrowForwardIcon fontSize="small" aria-hidden="true" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
