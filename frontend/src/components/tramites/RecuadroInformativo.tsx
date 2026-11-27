import { Box, Typography } from '@mui/material';
import type { RecuadroInformativo as RecuadroInformativoConfig } from '../../config/tramites/tipos';
import { FLYER } from './flyer';
import TextoEnriquecido from './TextoEnriquecido';

// Tarjeta crema con información adicional (.direccion del flyer de Predio No Registrado).
// Los bloques con leyenda: true se muestran como el texto a citar, en un recuadro punteado.
export default function RecuadroInformativo({ recuadro }: { recuadro: RecuadroInformativoConfig }) {
  return (
    <Box
      sx={{
        mt: '1rem',
        backgroundColor: FLYER.crema,
        color: FLYER.texto,
        borderRadius: FLYER.radio,
        px: '1.3rem',
        py: '1rem',
      }}
    >
      <Typography component="h4" sx={{ m: 0, mb: '.4rem', color: FLYER.guindaTexto, fontSize: '1.02rem', fontWeight: 800, lineHeight: 1.4 }}>
        {recuadro.titulo}
      </Typography>
      {recuadro.bloques.map((bloque) => (
        <Typography
          key={bloque.texto}
          component="p"
          sx={{
            my: '.35rem',
            fontSize: '.93rem',
            lineHeight: 1.5,
            ...(bloque.leyenda && {
              display: 'inline-block',
              backgroundColor: FLYER.blanco,
              border: `1.5px dashed ${FLYER.guinda}`,
              borderRadius: '10px',
              px: '.8rem',
              py: '.4rem',
              fontWeight: 700,
              fontStyle: 'italic',
              color: FLYER.guindaTexto,
            }),
          }}
        >
          <TextoEnriquecido texto={bloque.texto} />
        </Typography>
      ))}
    </Box>
  );
}
