import { Box, Button, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhoneIcon from '@mui/icons-material/Phone';
import type { OficinaAtencion } from '../../config/tramites/tipos';
import { direccionEnUnaLinea, urlComoLlegar } from '../../utils/tramites';
import MapaUbicacionDiferido from '../media/MapaUbicacionDiferido';
import { bandaSx, botonSx, FLYER, FUENTE_RALEWAY } from './flyer';

interface LugarAtencionProps {
  id: string;
  oficina: OficinaAtencion;
}

// Banda crema "Lugar de atención" del flyer, con el mapa de Leaflet.
export default function LugarAtencion({ id, oficina }: LugarAtencionProps) {
  const telefonoPrincipal = oficina.telefonos[0];

  return (
    <Box component="section" id={id} aria-labelledby={`${id}-titulo`} sx={bandaSx}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 'clamp(1rem, 3vw, 2.5rem)',
          alignItems: 'center',
          maxWidth: 760,
          mx: 'auto',
          '@media (max-width:720px)': { gridTemplateColumns: '1fr', textAlign: 'center' },
        }}
      >
        <PlaceIcon
          aria-hidden="true"
          sx={{
            fontSize: 'clamp(70px, 12vw, 110px)',
            color: FLYER.guindaPin,
            '@media (max-width:720px)': { mx: 'auto' },
          }}
        />
        <Box>
          <Typography
            id={`${id}-titulo`}
            component="h2"
            sx={{ m: 0, mb: '.4rem', color: FLYER.guindaTexto, fontFamily: FUENTE_RALEWAY, fontWeight: 700, fontSize: 'clamp(1.35rem, 3.4vw, 1.9rem)', lineHeight: 1.25 }}
          >
            Lugar de atención
          </Typography>
          <Typography component="address" sx={{ fontStyle: 'normal', fontWeight: 500, fontSize: 'clamp(1rem, 2.3vw, 1.15rem)', lineHeight: 1.5 }}>
            {oficina.calle},
            <br />
            colonia {oficina.colonia}, {oficina.ciudad}.
          </Typography>
          <Typography component="p" sx={{ m: 0, mt: '.6rem', fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)', lineHeight: 1.5 }}>
            <Box component="b" sx={{ color: FLYER.guindaTexto, fontWeight: 800 }}>
              Horario:
            </Box>{' '}
            {oficina.horario}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '.6rem',
              mt: '.9rem',
              '@media (max-width:720px)': { justifyContent: 'center' },
            }}
          >
            <Button
              href={urlComoLlegar(oficina)}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<DirectionsIcon />}
              sx={botonSx()}
            >
              Cómo llegar
            </Button>
            {telefonoPrincipal && (
              <Button
                href={`tel:${telefonoPrincipal.e164}`}
                startIcon={<PhoneIcon />}
                aria-label={`Llamar al ${telefonoPrincipal.texto}`}
                sx={botonSx(true)}
              >
                Llamar
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <MapaUbicacionDiferido
        etiqueta={`Mapa de ${oficina.nombre}`}
        marcadores={[
          {
            lat: oficina.coordenadas.lat,
            lng: oficina.coordenadas.lng,
            titulo: oficina.nombre,
            descripcion: direccionEnUnaLinea(oficina),
          },
        ]}
        sx={{
          mt: '1.2rem',
          borderRadius: '12px',
          border: `2px solid ${FLYER.durazno}`,
          aspectRatio: '16 / 7',
          height: 'auto',
          backgroundColor: '#EEEEEE',
          '@media (max-width:720px)': { aspectRatio: '4 / 3' },
          '@media print': { display: 'none' },
        }}
      />
    </Box>
  );
}
