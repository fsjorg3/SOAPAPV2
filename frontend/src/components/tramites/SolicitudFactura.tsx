import { Box, Link, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import type { SolicitudFactura as SolicitudFacturaDatos } from '../../config/tramites/tipos';
import BotonCopiar from './BotonCopiar';
import { encabezadoTarjetaSx, FLYER, subtituloSx, tarjetaSx } from './flyer';
import TextoEnriquecido from './TextoEnriquecido';

const subtituloTarjetaSx = { m: 0, mb: '.35rem', color: FLYER.guindaTexto, fontSize: '.95rem', fontWeight: 800 } as const;

// Tarjeta "¿Necesitas factura?" del flyer.
export default function SolicitudFactura({ factura }: { factura?: SolicitudFacturaDatos }) {
  if (!factura) return null;

  const mailto = `mailto:${factura.correo}?subject=${encodeURIComponent(factura.asuntoCorreo)}`;

  return (
    <>
      <Typography component="h3" sx={subtituloSx}>
        ¿Necesitas factura?
      </Typography>
      <Box component="article" sx={{ ...tarjetaSx, mt: '.9rem' }}>
        <Typography component="h4" sx={encabezadoTarjetaSx}>
          <EmailIcon aria-hidden="true" />
          Solicítala por correo
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.6rem', mb: '1rem' }}>
          <Link
            href={mailto}
            sx={{ fontWeight: 800, fontSize: 'clamp(1.05rem, 3vw, 1.3rem)', color: FLYER.guinda, wordBreak: 'break-all', textDecorationColor: 'currentcolor' }}
          >
            {factura.correo}
          </Link>
          <BotonCopiar valor={factura.correo} descripcion="correo de facturación" />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.2rem',
            borderTop: `1px dashed ${FLYER.lineaPunteada}`,
            pt: '.9rem',
            '@media (max-width:720px)': { gridTemplateColumns: '1fr' },
          }}
        >
          <Box>
            <Typography component="h5" sx={subtituloTarjetaSx}>
              Plazo
            </Typography>
            <Typography component="p" sx={{ m: 0, fontSize: '.92rem', lineHeight: 1.5 }}>
              <TextoEnriquecido texto={factura.plazo} />
            </Typography>
          </Box>
          <Box>
            <Typography component="h5" sx={subtituloTarjetaSx}>
              Envía en tu correo
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: '1.1rem', '& li': { fontSize: '.92rem', lineHeight: 1.5 } }}>
              {factura.datos.map((dato) => (
                <li key={dato}>{dato}</li>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
