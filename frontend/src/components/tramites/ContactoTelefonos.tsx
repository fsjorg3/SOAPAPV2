import { Box, Link, Typography } from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import type { Telefono } from '../../config/tramites/tipos';
import { FLYER, FUENTE_RALEWAY } from './flyer';

// Bloque "Solicita más información al:" al pie del panel guinda (.contacto del flyer).
export default function ContactoTelefonos({ telefonos }: { telefonos: Telefono[] }) {
  if (telefonos.length === 0) return null;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '1.2rem',
        alignItems: 'center',
        mt: '2.2rem',
        pt: '1.6rem',
        borderTop: '2px solid rgba(255,255,255,.25)',
        '@media (max-width:420px)': { gridTemplateColumns: '1fr', textAlign: 'center' },
      }}
    >
      <PhoneInTalkIcon
        aria-hidden="true"
        sx={{ fontSize: 'clamp(64px, 11vw, 96px)', color: FLYER.blanco, '@media (max-width:420px)': { mx: 'auto' } }}
      />
      <Box>
        <Typography
          component="h2"
          sx={{ m: 0, mb: '.4rem', color: FLYER.durazno, fontFamily: FUENTE_RALEWAY, fontWeight: 700, fontSize: 'clamp(1.15rem, 2.8vw, 1.5rem)', lineHeight: 1.3 }}
        >
          Solicita más información al:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '.4rem 2.2rem',
            '@media (max-width:420px)': { justifyContent: 'center' },
          }}
        >
          {telefonos.map((tel) => (
            <Link
              key={tel.e164}
              href={`tel:${tel.e164}`}
              aria-label={`Llamar al ${tel.texto}`}
              underline="none"
              sx={{
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 4.6vw, 2.3rem)',
                color: FLYER.blanco,
                lineHeight: 1.15,
                fontVariantNumeric: 'tabular-nums',
                '&:hover': { color: FLYER.durazno, textDecoration: 'underline', textUnderlineOffset: '4px' },
              }}
            >
              {tel.texto}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
