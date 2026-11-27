import { Box, Typography } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import type { TramiteConfig } from '../../config/tramites/tipos';
import { FLYER } from './flyer';
import RequisitosLista from './RequisitosLista';
import TextoEnriquecido from './TextoEnriquecido';

interface PanelRequisitosProps {
  tramite: Pick<TramiteConfig, 'ilustracion' | 'notaCotejo' | 'requisitos'>;
  idTitulo: string;
}

// Hero del panel guinda: ilustración + aviso de cotejo a la izquierda, requisitos a la derecha.
// La persona de la ilustración se apoya en el aviso: sin espacio entre ambos y el aviso por encima
// del corte inferior de la imagen. En móvil (≤720 px) se conservan juntos y los requisitos van debajo.
export default function PanelRequisitos({ tramite, idTitulo }: PanelRequisitosProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        gap: 'clamp(1rem, 3vw, 2rem)',
        alignItems: 'stretch',
        '@media (max-width:720px)': { gridTemplateColumns: '1fr' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box
          component="img"
          src={tramite.ilustracion.src}
          alt={tramite.ilustracion.alt}
          width={868}
          height={744}
          sx={{
            width: '100%',
            maxWidth: 380,
            height: 'auto',
            display: 'block',
            mx: 'auto',
            mt: '-.5rem',
            // El aviso tapa estos píxeles para que no quede una línea entre la imagen y el recuadro.
            mb: '-2px',
            filter: 'drop-shadow(0 -6px 14px rgba(0,0,0,.2))',
            '@media (max-width:720px)': { maxWidth: 260, mt: '-1rem' },
          }}
        />
        <Box
          role="note"
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            gap: '.8rem',
            alignItems: 'center',
            backgroundColor: FLYER.durazno,
            color: FLYER.guinda,
            borderRadius: '14px',
            px: '1.1rem',
            py: '.85rem',
            boxShadow: '0 8px 18px rgba(0,0,0,.18)',
          }}
        >
          <FactCheckIcon aria-hidden="true" sx={{ fontSize: 30, flex: '0 0 auto' }} />
          <Typography component="p" sx={{ m: 0, fontWeight: 600, fontSize: 'clamp(.95rem, 2.3vw, 1.08rem)', lineHeight: 1.5 }}>
            <TextoEnriquecido texto={tramite.notaCotejo} />
          </Typography>
        </Box>
      </Box>

      <RequisitosLista idTitulo={idTitulo} requisitos={tramite.requisitos} />
    </Box>
  );
}
