import { Box, Typography } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupsIcon from '@mui/icons-material/Groups';
import type { TramiteConfig } from '../../config/tramites/tipos';
import { formatearMonto } from '../../utils/tramites';
import { FLYER } from './flyer';
import TextoEnriquecido from './TextoEnriquecido';

interface CostoVigenciaProps {
  tramite: Pick<TramiteConfig, 'costo' | 'ivaIncluido' | 'notaCosto' | 'vigenciaDias' | 'notaVigencia' | 'notaAtencion'>;
}

// Caja durazno con icono guinda (.icono-d del flyer).
function IconoDato({ Icono }: { Icono: React.ElementType }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        width: 'clamp(62px, 10vw, 84px)',
        height: 'clamp(54px, 8.5vw, 70px)',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: FLYER.durazno,
        borderRadius: '16px',
        color: FLYER.guinda,
        '& .MuiSvgIcon-root': { fontSize: 'clamp(32px, 5vw, 42px)' },
      }}
    >
      <Icono />
    </Box>
  );
}

const textoDatoSx = {
  m: 0,
  fontSize: 'clamp(1rem, 2.4vw, 1.2rem)',
  fontWeight: 500,
  lineHeight: 1.35,
  '& b, & strong': { fontWeight: 800 },
} as const;

// Lista de datos del trámite: costo, vigencia y atención (.datos del flyer).
export default function CostoVigencia({ tramite }: CostoVigenciaProps) {
  return (
    <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: '1.1rem' }}>
      <Box component="li" sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.1rem', alignItems: 'center' }}>
        <IconoDato Icono={PaymentsIcon} />
        <Typography component="p" sx={textoDatoSx}>
          <Box
            component="span"
            sx={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', fontWeight: 900, color: FLYER.durazno, lineHeight: 1, display: 'inline-block', mr: '.35rem' }}
          >
            {formatearMonto(tramite.costo)}
          </Box>
          <b>MXN</b>
          {tramite.ivaIncluido && <b> · IVA incluido</b>}
          <br />
          {tramite.notaCosto}
        </Typography>
      </Box>

      <Box component="li" sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.1rem', alignItems: 'center' }}>
        <IconoDato Icono={EventAvailableIcon} />
        <Typography component="p" sx={textoDatoSx}>
          <b>Vigencia del documento:</b> {tramite.vigenciaDias} días a partir de su expedición.
          <br />
          <Box component="span" sx={{ fontSize: '.88em', opacity: 0.85 }}>
            {tramite.notaVigencia}
          </Box>
        </Typography>
      </Box>

      <Box component="li" sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.1rem', alignItems: 'center' }}>
        <IconoDato Icono={GroupsIcon} />
        <Typography component="p" sx={textoDatoSx}>
          <TextoEnriquecido texto={tramite.notaAtencion} />
        </Typography>
      </Box>
    </Box>
  );
}
