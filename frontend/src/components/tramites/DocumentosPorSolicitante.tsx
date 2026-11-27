import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import type { PerfilSolicitante } from '../../config/tramites/tipos';
import { FLYER, subtituloSx } from './flyer';

interface DocumentosPorSolicitanteProps {
  id: string;
  perfiles: PerfilSolicitante[];
}

// Pestañas tipo píldora del flyer ("¿Quién realiza el trámite?").
// Se usan MUI Tabs para conservar el manejo de teclado (flechas, Inicio y Fin) y los roles ARIA.
export default function DocumentosPorSolicitante({ id, perfiles }: DocumentosPorSolicitanteProps) {
  const [activo, setActivo] = useState(0);

  return (
    <Box sx={{ scrollMarginTop: { xs: 88, md: 104 } }} id={id}>
      <Typography component="h3" sx={subtituloSx}>
        Documentos según quién realiza el trámite
      </Typography>

      <Box sx={{ backgroundColor: FLYER.blanco, color: FLYER.texto, borderRadius: FLYER.radio, overflow: 'hidden', mt: '.9rem' }}>
        <Tabs
          value={activo}
          onChange={(_e, valor: number) => setActivo(valor)}
          aria-label="Quién realiza el trámite"
          sx={{
            minHeight: 0,
            p: '.6rem',
            backgroundColor: FLYER.crema,
            borderBottom: `2px solid ${FLYER.duraznoSuave}`,
            '& .MuiTabs-indicator': { display: 'none' },
            '& .MuiTabs-scroller': { overflow: 'visible !important' },
            '& .MuiTabs-list, & .MuiTabs-flexContainer': { flexWrap: 'wrap', gap: '.35rem' },
            '@media print': { display: 'none' },
          }}
        >
          {perfiles.map((perfil, i) => (
            <Tab
              key={perfil.id}
              id={`${id}-tab-${perfil.id}`}
              aria-controls={`${id}-panel-${perfil.id}`}
              label={perfil.etiqueta}
              value={i}
              disableRipple
              sx={{
                minHeight: 0,
                minWidth: 0,
                px: '1rem',
                py: '.5rem',
                borderRadius: '999px',
                fontFamily: 'inherit',
                fontSize: '.9rem',
                fontWeight: 700,
                lineHeight: 1.5,
                letterSpacing: 0,
                textTransform: 'none',
                color: FLYER.guindaTexto,
                '&:hover': { backgroundColor: FLYER.duraznoSuave },
                '&.Mui-selected': { backgroundColor: FLYER.guinda, color: FLYER.blanco },
              }}
            />
          ))}
        </Tabs>

        {perfiles.map((perfil, i) => (
          <Box
            key={perfil.id}
            role="tabpanel"
            id={`${id}-panel-${perfil.id}`}
            aria-labelledby={`${id}-tab-${perfil.id}`}
            hidden={activo !== i}
            tabIndex={0}
            sx={{
              px: '1.3rem',
              pt: '1.1rem',
              pb: '1.2rem',
              // Al imprimir se muestran todos los perfiles.
              '@media print': { display: 'block !important' },
            }}
          >
            <Typography component="h4" sx={{ m: 0, mb: '.5rem', color: FLYER.guindaTexto, fontSize: '1.02rem', fontWeight: 800, lineHeight: 1.4 }}>
              {perfil.titulo}
            </Typography>
            <Box
              component="ul"
              sx={{ m: 0, pl: '1.2rem', '& li': { my: '.3rem', fontWeight: 500 }, '& li::marker': { color: FLYER.guinda } }}
            >
              {perfil.documentos.map((documento) => (
                <li key={documento}>{documento}</li>
              ))}
            </Box>
            {perfil.aclaracion && (
              <Typography
                component="p"
                sx={{
                  m: 0,
                  mt: '.8rem',
                  fontSize: '.9rem',
                  backgroundColor: FLYER.crema,
                  borderRadius: '10px',
                  px: '.75rem',
                  py: '.5rem',
                  color: FLYER.guindaTexto,
                  fontWeight: 600,
                }}
              >
                {perfil.aclaracion}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
