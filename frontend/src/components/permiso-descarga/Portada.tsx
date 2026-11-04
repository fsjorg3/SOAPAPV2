import { Box, Button, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useReducedMotion } from 'motion/react';
import { PASOS, TIPOS_ESTABLECIMIENTO } from '../../config/permisoDescarga';
import { TINTE_CLARO, entradillaSx, irASeccion, panelOscuroSx, rellenoPanelSx } from './estilos';

const CIFRAS = [
  { etiqueta: 'Vigencia', valor: '1 año' },
  { etiqueta: 'Tipos de establecimiento', valor: String(TIPOS_ESTABLECIMIENTO.length) },
  { etiqueta: 'Pasos hoy', valor: String(PASOS.length) },
];

export default function Portada() {
  const suave = !useReducedMotion();

  return (
    <Box
      component="section"
      aria-labelledby="pd-titulo"
      sx={{ ...panelOscuroSx, ...rellenoPanelSx, position: 'relative', overflow: 'hidden', pt: { xs: 6, md: 12 } }}
    >
      <Box
        component="svg"
        aria-hidden="true"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        sx={{ position: 'absolute', inset: 'auto 0 0 0', width: '100%', height: '60%', pointerEvents: 'none' }}
      >
        <path d="M0 420 C 240 360, 420 480, 720 420 S 1200 360, 1440 420" fill="none" stroke="#5B132B" strokeWidth="1.5" />
        <path d="M0 470 C 260 410, 460 530, 760 470 S 1220 410, 1440 470" fill="none" stroke="#5B132B" strokeWidth="1.5" />
        <path d="M0 520 C 280 460, 500 580, 800 520 S 1240 460, 1440 520" fill="none" stroke="#B8822A" strokeWidth="1.5" />
      </Box>

      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
        <Typography component="p" sx={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.02em', color: 'secondary.main' }}>
          Trámites · Gerencia de Saneamiento y Medio Ambiente
        </Typography>

        <Box>
          <Typography component="h1" id="pd-titulo" sx={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', fontWeight: 700, color: TINTE_CLARO, mb: 1.5 }}>
            Permiso de descarga de aguas residuales
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: 'clamp(2.5rem, 6.4vw, 6rem)', lineHeight: 1.02, fontWeight: 800, letterSpacing: '-0.035em', maxWidth: 1180 }}
          >
            Todo lo que sale por tu drenaje{' '}
            <Box component="span" sx={{ color: 'secondary.main' }}>llega a algún lugar.</Box>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 4, md: 6 }, alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 640 }}>
            <Typography sx={{ ...entradillaSx, color: TINTE_CLARO }}>
              El <strong style={{ color: '#FFFFFF' }}>permiso de descarga de aguas residuales</strong> es la autorización del SOAPAP para que
              negocios, empresas e instituciones descarguen al drenaje municipal. Recorre lo que aplica a todos y, al final, elige tu giro
              para ver lo que te toca.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {/* Dorado con texto vino oscuro: el texto blanco sobre dorado no alcanza 4.5:1. */}
              <Button
                href="#recorrido"
                onClick={(e) => { e.preventDefault(); irASeccion('pd-recorrido', suave); }}
                endIcon={<ArrowDownwardIcon />}
                sx={{ minHeight: 48, px: 3, bgcolor: 'secondary.main', color: 'primary.dark', '&:hover': { bgcolor: 'secondary.light' } }}
              >
                Empezar el recorrido
              </Button>
              <Button
                href="#tu-giro"
                onClick={(e) => { e.preventDefault(); irASeccion('pd-tu-giro', suave); }}
                variant="outlined"
                sx={{ minHeight: 48, px: 3, color: 'primary.contrastText', borderColor: TINTE_CLARO, '&:hover': { bgcolor: 'primary.light', borderColor: TINTE_CLARO } }}
              >
                Ir directo a mi giro
              </Button>
            </Box>
          </Box>

          <Box
            component="dl"
            sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: { xs: 2, md: 4 }, m: 0, minWidth: 'min(520px, 100%)' }}
          >
            {CIFRAS.map(({ etiqueta, valor }) => (
              <Box key={etiqueta} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, borderTop: 2, borderColor: 'secondary.main', pt: 1.75 }}>
                <Typography component="dt" variant="body2" sx={{ color: TINTE_CLARO }}>{etiqueta}</Typography>
                <Typography component="dd" sx={{ m: 0, fontSize: { xs: '1.5rem', md: '2rem' }, lineHeight: 1.1, fontWeight: 800 }}>{valor}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ borderTop: 1, borderColor: 'primary.light', pt: 2, maxWidth: 820, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" sx={{ color: TINTE_CLARO }}>
            Esta guía describe el trámite <strong style={{ color: '#FFFFFF' }}>como se hace hoy, en papel</strong>: cuestionario, copias de
            documentos y entrega en la Oficialía de Partes. Cuando opere la ventanilla digital, se actualizará.
          </Typography>
          <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 700 }}>
            Versión de demostración. Contenido sujeto a validación de la Gerencia de Saneamiento y Medio Ambiente.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
