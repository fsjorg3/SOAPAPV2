import { Box, Link, Typography } from '@mui/material';
import type { Requisito } from '../../config/tramites/tipos';
import { FLYER, pastillaSx } from './flyer';
import { ICONOS_TRAMITE } from './iconos';
import TextoEnriquecido from './TextoEnriquecido';

interface RequisitosListaProps {
  // id del encabezado "Requisitos" (lo usa el panel en aria-labelledby).
  idTitulo: string;
  requisitos: Requisito[];
}

// Pastilla "Requisitos" + lista numerada con cajas blancas de icono (.requisitos del flyer).
export default function RequisitosLista({ idTitulo, requisitos }: RequisitosListaProps) {
  return (
    <Box>
      <Typography id={idTitulo} component="h2" sx={pastillaSx}>
        Requisitos
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {requisitos.map((requisito, i) => {
          const Icono = ICONOS_TRAMITE[requisito.icono];
          const esCuentaActiva = requisito.icono === 'cuentaActiva';
          return (
            <Box
              component="li"
              key={requisito.titulo}
              sx={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                py: '.65rem',
                '& + &': { borderTop: '2px solid rgba(255,255,255,.55)' },
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  flex: '0 0 auto',
                  width: 54,
                  height: 54,
                  display: 'grid',
                  placeItems: 'center',
                  backgroundColor: FLYER.blanco,
                  borderRadius: '14px',
                  boxShadow: '0 3px 0 rgba(0,0,0,.12)',
                  // La palomita de "cuenta activa" va en verde, como en el flyer.
                  color: esCuentaActiva ? FLYER.verde : FLYER.gris,
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                }}
              >
                <Icono />
              </Box>
              <Typography
                component="p"
                sx={{
                  m: 0,
                  fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
                  fontWeight: 600,
                  lineHeight: 1.25,
                  '& strong': { fontWeight: 800 },
                }}
              >
                <strong>{i + 1}.</strong> <TextoEnriquecido texto={requisito.titulo} />
                {(requisito.detalle || requisito.enlace) && (
                  <Box
                    component="small"
                    sx={{ display: 'block', fontWeight: 500, fontSize: '.85rem', opacity: 0.85, mt: '.2rem' }}
                  >
                    {requisito.detalle && <TextoEnriquecido texto={requisito.detalle} />}
                    {requisito.enlace && (
                      <Link href={`#${requisito.enlace.ancla}`} sx={{ color: FLYER.durazno, textDecorationColor: 'currentcolor' }}>
                        {requisito.enlace.texto}
                      </Link>
                    )}
                  </Box>
                )}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
