import { Box } from '@mui/material';
import { FLYER } from './flyer';

// Aviso legal con el estilo .aviso que define el CSS del flyer.
export default function AvisoLegal({ texto }: { texto: string }) {
  return (
    <Box
      component="aside"
      aria-label="Aviso legal"
      sx={{
        m: '1.4rem clamp(0rem, 4vw, 3.5rem) 0',
        backgroundColor: FLYER.blanco,
        borderLeft: `5px solid ${FLYER.guinda}`,
        borderRadius: '10px',
        px: '1.1rem',
        py: '.9rem',
        fontSize: '.9rem',
        lineHeight: 1.5,
        color: FLYER.gris,
        boxShadow: '0 4px 14px rgba(82,18,38,.08)',
      }}
    >
      {texto}
    </Box>
  );
}
