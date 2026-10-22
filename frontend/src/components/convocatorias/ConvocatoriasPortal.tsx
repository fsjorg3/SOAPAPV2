import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Alert, Box, Button, Card, CardActions, CardContent, Chip, Skeleton, Snackbar, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useConvocatorias } from '../../hooks/useConvocatoriasData';
import { apiUrl } from '../../lib/api';
import { PdfViewer } from '../pdfviewer/PdfViewer';
import { ETIQUETA_CATEGORIA } from './convocatoriasCategorias';
import type { Convocatoria } from '../../types/convocatorias';

export function ConvocatoriasPortal() {
  const { convocatorias, error, isLoading } = useConvocatorias();
  const [searchParams, setSearchParams] = useSearchParams();
  const archivoAbierto = searchParams.get('archivo');

  const [ultimoErrorMostrado, setUltimoErrorMostrado] = useState<unknown>(null);
  const [snackbarAbierto, setSnackbarAbierto] = useState(false);
  if (error && error !== ultimoErrorMostrado) {
    setUltimoErrorMostrado(error);
    setSnackbarAbierto(true);
  }

  const handleAbrirDocumento = (convocatoria: Convocatoria) => {
    if (!convocatoria.archivo) return;
    const next = new URLSearchParams(searchParams);
    next.set('archivo', convocatoria.archivo.id);
    setSearchParams(next);
  };

  const handleCerrarPdf = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('archivo');
    setSearchParams(next);
  };

  const pdfUrl = archivoAbierto ? apiUrl(`api/v1/archivos/${archivoAbierto}/ver`) : '';

  return (
    <>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2, mb: 3 }}>
        Mostrando {convocatorias.length} convocatorias registradas
      </Typography>

      {isLoading ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, marginBottom: { xs: '40px', md: '80px' } }}>
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} variant="rounded" width="100%" height={180} />
          ))}
        </Box>
      ) : convocatorias.length === 0 ? (
        <Typography color="text.secondary">No hay convocatorias registradas por el momento.</Typography>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, marginBottom: { xs: '40px', md: '80px' } }}>
          {convocatorias.map((convocatoria) => (
            <Card
              key={convocatoria.id}
              variant="outlined"
              sx={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }, borderRadius: '12px' }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                    Año {convocatoria.anio}
                  </Typography>
                  <Chip label={ETIQUETA_CATEGORIA[convocatoria.categoria]} size="small" color="primary" variant="outlined" />
                </Box>

                <Typography variant="h6" component="h3" color="primary.main" sx={{ fontWeight: 'bold', mb: 1.5, lineHeight: 1.3 }}>
                  {convocatoria.expediente}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {convocatoria.descripcion}
                </Typography>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0, justifyContent: 'flex-end' }}>
                {convocatoria.archivo && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    endIcon={<LaunchIcon />}
                    onClick={() => handleAbrirDocumento(convocatoria)}
                    sx={{
                      borderRadius: 2,
                      '&:hover, &:active': {
                        backgroundColor: 'secondary.main',
                      },
                    }}
                  >
                    Ver Convocatoria
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      <PdfViewer open={Boolean(archivoAbierto)} onClose={handleCerrarPdf} pdfUrl={pdfUrl} />

      <Snackbar
        open={snackbarAbierto}
        autoHideDuration={5000}
        onClose={(_event, reason) => {
          if (reason === 'clickaway') return;
          setSnackbarAbierto(false);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }} onClose={() => setSnackbarAbierto(false)}>
          Ocurrió un error al cargar las convocatorias. Intenta de nuevo más tarde.
        </Alert>
      </Snackbar>
    </>
  );
}
