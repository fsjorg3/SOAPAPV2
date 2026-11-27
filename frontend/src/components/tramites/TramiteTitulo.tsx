import { Fragment } from 'react';
import { Box, Typography } from '@mui/material';
import type { TramiteConfig } from '../../config/tramites/tipos';
import { FLYER, hojaSx } from './flyer';

// Hoja de papel con el título del trámite (header.titulo del flyer).
export default function TramiteTitulo({ tramite }: { tramite: Pick<TramiteConfig, 'nombre' | 'nombreLineas' | 'subtitulo'> }) {
  const lineas = tramite.nombreLineas ?? [tramite.nombre];

  return (
    <Box component="header" sx={hojaSx}>
      <Typography
        component="h1"
        aria-label={tramite.nombre}
        sx={{
          m: 0,
          fontWeight: 900,
          color: FLYER.guinda,
          fontSize: 'clamp(2.1rem, 7vw, 4.2rem)',
          lineHeight: 0.98,
          letterSpacing: '-.01em',
          textTransform: 'uppercase',
        }}
      >
        {lineas.map((linea, i) => (
          <Fragment key={linea}>
            {i > 0 && <br />}
            {linea}
          </Fragment>
        ))}
      </Typography>
      <Typography
        component="p"
        sx={{ m: 0, mt: '.6rem', color: FLYER.gris, fontWeight: 500, fontSize: 'clamp(.95rem, 2.2vw, 1.05rem)', lineHeight: 1.5 }}
      >
        {tramite.subtitulo}
      </Typography>
    </Box>
  );
}
