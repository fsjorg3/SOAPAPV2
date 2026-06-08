import { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import { List, type ListImperativeAPI, type RowComponentProps } from 'react-window';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configurar el worker para Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfDocumentProps {
  url: string;
  scale: number;
  onLoadSuccess: (numPages: number) => void;
  onPageVisible: (pageNumber: number) => void;
  targetPage: number | null;
}

export interface PdfDocumentRef {
  scrollToPage: (page: number) => void;
}

// Extraemos los datos (scale) desde rowProps de acuerdo a la firma de react-window v2
const Row = ({ index, style, scale }: RowComponentProps<{ scale: number }>) => {
  const basePageHeight = 800;
  const pageMargin = 20;

  return (
    <div style={{ ...style, display: 'flex', justifyContent: 'center', paddingBottom: pageMargin }}>
      <Box
        sx={{
          boxShadow: 3,
          backgroundColor: 'white',
          display: 'inline-block',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          pointerEvents: 'none', // Evita arrastre o clic profundo en el contenido renderizado
        }}
      >
        <Page
          pageNumber={index + 1}
          scale={scale}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          loading={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: basePageHeight * scale, width: (basePageHeight * 0.7) * scale }}>
              <CircularProgress />
            </Box>
          }
        />
      </Box>
    </div>
  );
};

export const PdfDocument = forwardRef<PdfDocumentRef, PdfDocumentProps>(({
  url,
  scale,
  onLoadSuccess,
  onPageVisible,
  targetPage
}, ref) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 1. Reemplazo del Componente por la nueva firma
  const listRef = useRef<ListImperativeAPI>(null);

  const basePageHeight = 800;
  const pageMargin = 20;

  const onDocumentLoadSuccess = (pdf: { numPages: number }) => {
    setNumPages(pdf.numPages);
    onLoadSuccess(pdf.numPages);
    setError(null);
  };

  const onDocumentLoadError = (err: Error) => {
    console.error("Error al cargar PDF:", err);
    setError("No se pudo cargar el documento.");
  };

  const getRowHeight = () => {
    return (basePageHeight * scale) + pageMargin;
  };

  useImperativeHandle(ref, () => ({
    scrollToPage: (page: number) => {
      if (listRef.current && page >= 1 && numPages && page <= numPages) {
        listRef.current.scrollToRow({ index: page - 1, align: "start" });
      }
    }
  }));

  useEffect(() => {
    if (targetPage && numPages) {
      if (listRef.current) {
        listRef.current.scrollToRow({ index: targetPage - 1, align: "start" });
      }
    }
  }, [targetPage, numPages]);

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
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p: 5 }}>
              <CircularProgress />
            </Box>
          }
        >
          {error && <Typography color="error" sx={{ p: 2 }}>{error}</Typography>}
          {numPages && (
            <List
              listRef={listRef}
              style={{ width: '100%', height: 'calc(100vh - 100px)' }}
            rowCount={numPages}       // 2. Propiedad renombrada
            rowHeight={getRowHeight}  // 2. Propiedad renombrada
            onRowsRendered={({ startIndex }) => {
              onPageVisible(startIndex + 1);
            }}
            rowComponent={Row}        // 3. Ya no es children
            rowProps={{ scale }}      // 3. Datos inyectados a través de rowProps
            />
          )}
        </Document>
      </Box>
    </Box>
  );
});

PdfDocument.displayName = "PdfDocument";