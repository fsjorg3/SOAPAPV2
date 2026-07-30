import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Box, CircularProgress, Alert, AlertTitle, Typography } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import { List, type ListImperativeAPI, type RowComponentProps } from 'react-window';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configurar el worker para Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const pdfOptions = {
  wasmUrl: `${import.meta.env.BASE_URL}wasm/`,
};

interface PdfDocumentProps {
  url: string;
  scale: number;
  onLoadSuccess: (numPages: number) => void;
  onPageVisible: (pageNumber: number) => void;
}

export interface PdfDocumentRef {
  scrollToPage: (page: number) => void;
}

const PAGE_MARGIN = 32;

// Extraemos los datos (scale, pageSize) desde rowProps de acuerdo a la firma de react-window v2
const Row = ({ index, style, scale, pageSize, numPages }: RowComponentProps<any> & { scale: number, pageSize: { width: number, height: number }, numPages: number }) => {
  const pageWidth = pageSize.width * scale;
  const isFirstPage = index === 0;
  const isLastPage = index === numPages - 1;

  return (
    <div 
      style={{ 
        ...style, 
        display: 'flex', 
        paddingBottom: PAGE_MARGIN + (isLastPage ? PAGE_MARGIN * 3 : 0),
        paddingTop: isFirstPage ? PAGE_MARGIN : 0, // Extra top margin for first page
      }}
    >
      {/* Spacer izquierdo: empuja al centro si hay espacio, pero no colapsa a negativo si no lo hay */}
      <div style={{ flex: '1 0 auto' }} />

      <Box
        sx={{
          boxShadow: 4,
          backgroundColor: 'white',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          pointerEvents: 'none', // Evita arrastre o clic profundo en el contenido renderizado
          borderRadius: 1, // Bordes redondeados para que luzca mejor
          width: pageWidth,
          height: pageSize.height * scale,
          flexShrink: 0, // ¡CRUCIAL! Evita que el contenedor se encoja y rompa el scroll horizontal
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        <Page
          pageNumber={index + 1}
          scale={scale}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          loading={<CircularProgress />}
        />
      </Box>

      {/* Spacer derecho */}
      <div style={{ flex: '1 0 auto' }} />
    </div>
  );
};

export const PdfDocument = forwardRef<PdfDocumentRef, PdfDocumentProps>(({
  url,
  scale,
  onLoadSuccess,
  onPageVisible,
}, ref) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<{ width: number, height: number } | null>(null);

  // 1. Reemplazo del Componente por la nueva firma
  const listRef = useRef<ListImperativeAPI>(null);

  const onDocumentLoadSuccess = async (pdf: any) => {
    setNumPages(pdf.numPages);
    onLoadSuccess(pdf.numPages);
    setError(null);

    try {
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      if (viewport.height && viewport.width) {
        setPageSize({ width: viewport.width, height: viewport.height });
      } else {
        // Fallback robusto en caso de fallo de obtener medidas
        setPageSize({ width: 600, height: 800 });
      }
    } catch (err) {
      console.error("Error al obtener las medidas de la primera página", err);
      setPageSize({ width: 600, height: 800 }); // fallback
    }
  };

  const onDocumentLoadError = (err: Error) => {
    console.error("Error al cargar PDF:", err);
    setError("No se pudo cargar el documento.");
  };

  const getRowHeight = (index: number) => {
    if (!pageSize) return 800; // default height before load
    const height = pageSize.height * scale;
    const isFirstPage = index === 0;
    const isLastPage = numPages ? index === numPages - 1 : false;
    return height + PAGE_MARGIN + (isFirstPage ? PAGE_MARGIN : 0) + (isLastPage ? PAGE_MARGIN * 3 : 0);
  };

  useImperativeHandle(ref, () => ({
    scrollToPage: (page: number) => {
      if (listRef.current && page >= 1 && numPages && page <= numPages) {
        listRef.current.scrollToRow({ index: page - 1, align: "start" });
      }
    }
  }));

  return (
    <Box 
      onContextMenu={(e) => e.preventDefault()}
      sx={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'grey.200', 
        display: 'flex', 
        flexDirection: 'column',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      <Box sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
        <Document
          file={url}
          options={pdfOptions}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p: 5 }}>
              <CircularProgress />
            </Box>
          }
        >
          {error && (
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
              <Alert severity="error" variant="filled" sx={{ width: '100%', maxWidth: 500 }}>
                <AlertTitle>Error al abrir el PDF</AlertTitle>
                {error}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Verifica que la URL del documento sea correcta o inténtalo más tarde.
                </Typography>
              </Alert>
            </Box>
          )}
          {numPages && pageSize && (
            <List
              listRef={listRef}
              style={{ width: '100%', height: 'calc(100vh - 100px)', overflowX: 'auto' }}
              rowCount={numPages}
              rowHeight={getRowHeight}
              onRowsRendered={({ startIndex }) => {
                onPageVisible(startIndex + 1);
              }}
              rowComponent={Row}
              rowProps={{ scale, pageSize, numPages }}
            />
          )}
        </Document>
      </Box>
    </Box>
  );
});

PdfDocument.displayName = "PdfDocument";
