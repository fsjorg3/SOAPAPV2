import { Box, Divider, Typography } from '@mui/material';
import { useSearchParams } from 'react-router';
import { apiUrl } from '../../lib/api';
import { PdfViewer } from '../pdfviewer/PdfViewer';
import { NormatividadCatalogo } from './NormatividadCatalogo';
import { TituloConcesionCatalogo } from './TituloConcesionCatalogo';
import type { DocumentoNormativo } from '../../types/normatividad';

export function NormatividadPortal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const archivoAbierto = searchParams.get('archivo');

  const handleAbrirDocumento = (documento: DocumentoNormativo) => {
    if (!documento.archivo) return;
    const next = new URLSearchParams(searchParams);
    next.set('archivo', documento.archivo.id);
    setSearchParams(next);
  };

  const handleCerrarPdf = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('archivo');
    setSearchParams(next);
  };

  const pdfUrl = archivoAbierto ? apiUrl(`api/v1/archivos/${archivoAbierto}/ver`) : '';

  return (
    <Box>
      <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700, mb: 2 }}>
        Normatividad
      </Typography>
      <NormatividadCatalogo onAbrirDocumento={handleAbrirDocumento} />

      <Divider sx={{ my: { xs: 4, md: 6 } }} />

      <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700, mb: 2 }}>
        Título de concesión
      </Typography>
      <TituloConcesionCatalogo onAbrirDocumento={handleAbrirDocumento} />

      <PdfViewer open={Boolean(archivoAbierto)} onClose={handleCerrarPdf} pdfUrl={pdfUrl} />
    </Box>
  );
}
