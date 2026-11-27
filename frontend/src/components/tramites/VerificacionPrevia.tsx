import { Typography } from '@mui/material';
import { FLYER } from './flyer';
import TextoEnriquecido from './TextoEnriquecido';

// Recuadro punteado "Antes de pagar" (.verifica del flyer).
export default function VerificacionPrevia({ texto }: { texto: string }) {
  return (
    <Typography
      component="p"
      sx={{
        m: 0,
        mt: '1rem',
        fontSize: '.95rem',
        lineHeight: 1.5,
        backgroundColor: 'rgba(255,255,255,.08)',
        border: '1.5px dashed rgba(248,198,172,.6)',
        borderRadius: '12px',
        px: '1rem',
        py: '.75rem',
        '& strong': { color: FLYER.durazno },
      }}
    >
      <TextoEnriquecido texto={texto} />
    </Typography>
  );
}
