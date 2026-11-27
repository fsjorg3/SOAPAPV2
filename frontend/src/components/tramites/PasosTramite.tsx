import { Box, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import type { PasoTramite } from '../../config/tramites/tipos';
import { FLYER, subtituloSx } from './flyer';

const NODO = 46;
const ETIQUETA_ACTOR: Record<PasoTramite['actor'], string> = { tu: 'Tú', soapap: 'SOAPAP' };
const MOVIL = '@media (max-width:720px)';

// Línea de tiempo "¿Cómo lo tramito?" del flyer (.linea): horizontal con flechas;
// vertical en móvil. El último nodo va en verde.
export default function PasosTramite({ pasos }: { pasos: PasoTramite[] }) {
  return (
    <>
      <Typography component="h3" sx={subtituloSx}>
        ¿Cómo lo tramito?
      </Typography>
      <Box
        component="ol"
        sx={{
          listStyle: 'none',
          m: 0,
          mt: '1.4rem',
          p: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${pasos.length}, 1fr)`,
          [MOVIL]: { gridTemplateColumns: '1fr' },
        }}
      >
        {pasos.map((paso, i) => {
          const ultimo = i === pasos.length - 1;
          return (
            <Box
              component="li"
              key={paso.texto}
              sx={{
                position: 'relative',
                textAlign: 'center',
                px: '.35rem',
                // Conector y punta de flecha hacia el siguiente paso.
                ...(!ultimo && {
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '22px',
                    left: `calc(50% + 30px)`,
                    right: `calc(-50% + 30px)`,
                    height: '3px',
                    backgroundColor: FLYER.durazno,
                    borderRadius: '3px',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '17.5px',
                    right: 'calc(-50% + 24px)',
                    borderLeft: `10px solid ${FLYER.durazno}`,
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                  },
                }),
                [MOVIL]: {
                  display: 'grid',
                  gridTemplateColumns: `${NODO}px 1fr`,
                  gap: '.9rem',
                  textAlign: 'left',
                  p: 0,
                  pb: '1.1rem',
                  ...(!ultimo && {
                    '&::after': { top: '52px', bottom: '12px', left: '21.5px', right: 'auto', width: '3px', height: 'auto' },
                    '&::before': {
                      top: 'auto',
                      bottom: '4px',
                      right: 'auto',
                      left: '17px',
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderTop: `10px solid ${FLYER.durazno}`,
                      borderBottom: 0,
                    },
                  }),
                },
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  width: NODO,
                  height: NODO,
                  mx: 'auto',
                  mb: '.8rem',
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 900,
                  fontSize: '1.15rem',
                  backgroundColor: ultimo ? FLYER.verde : FLYER.durazno,
                  color: ultimo ? FLYER.blanco : FLYER.guinda,
                  boxShadow: ultimo ? '0 0 0 6px rgba(91,170,60,.25)' : '0 0 0 6px rgba(248,198,172,.2)',
                  [MOVIL]: { m: 0 },
                }}
              >
                {i + 1}
              </Box>
              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,.08)',
                  border: '1.5px solid rgba(248,198,172,.45)',
                  borderRadius: '14px',
                  px: '.7rem',
                  pt: '.75rem',
                  pb: '.85rem',
                  height: `calc(100% - ${NODO}px - .8rem)`,
                  [MOVIL]: { height: 'auto' },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    mb: '.45rem',
                    px: '.6rem',
                    py: '.15rem',
                    borderRadius: '999px',
                    // El flyer usa .68rem; se sube a .75rem para legibilidad.
                    fontSize: '.75rem',
                    fontWeight: 800,
                    letterSpacing: '.07em',
                    textTransform: 'uppercase',
                    backgroundColor: paso.actor === 'tu' ? FLYER.durazno : FLYER.blanco,
                    color: FLYER.guinda,
                  }}
                >
                  {/* El número del nodo es decorativo: se anuncia aquí. */}
                  <Box component="span" sx={visuallyHidden}>
                    Paso {i + 1}:{' '}
                  </Box>
                  {ETIQUETA_ACTOR[paso.actor]}
                </Box>
                <Typography component="p" sx={{ m: 0, fontSize: '.9rem', fontWeight: 500, lineHeight: 1.4 }}>
                  {paso.texto}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
