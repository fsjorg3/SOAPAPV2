import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Box, CircularProgress, Alert, AlertTitle, Typography } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { List, type ListImperativeAPI, type RowComponentProps } from 'react-window';
import { measurePages, pageRowHeight, widestPage, PAGE_MARGIN, type PageSize } from './pdfLayout';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url,
).toString();

const pdfOptions = { wasmUrl: `${import.meta.env.BASE_URL}wasm/` };

interface PdfDocumentProps {
  url: string;
  scale: number;
  onLoadSuccess: (numPages: number) => void;
  onPageVisible: (pageNumber: number) => void;
}

export interface PdfDocumentRef {
  scrollToPage: (page: number) => void;
}

interface PdfRowProps {
  scale: number;
  pageSizes: PageSize[];
  contentWidth: string;
}

const Row = ({ index, style, ariaAttributes, scale, pageSizes, contentWidth }: RowComponentProps<PdfRowProps>) => {
  const pageSize = pageSizes[index];
  return (
    <div {...ariaAttributes} style={{
      ...style,
      width: contentWidth,
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: PAGE_MARGIN + (index === pageSizes.length - 1 ? PAGE_MARGIN * 3 : 0),
      paddingTop: index === 0 ? PAGE_MARGIN : 0,
    }}>
      <Box sx={{
        boxShadow: 4,
        backgroundColor: 'white',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        pointerEvents: 'none',
        width: pageSize.width * scale,
        height: pageSize.height * scale,
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Page pageNumber={index + 1} scale={scale}
          renderTextLayer={false} renderAnnotationLayer={false}
          loading={<CircularProgress />} />
      </Box>
    </div>
  );
};

const Preparation = () => (
  <Box role="status" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, p: 5 }}>
    <CircularProgress />
    <Typography>Preparando páginas…</Typography>
  </Box>
);

const DocumentSession = forwardRef<PdfDocumentRef, PdfDocumentProps>(({ url, scale, onLoadSuccess, onPageVisible }, ref) => {
  const [pageSizes, setPageSizes] = useState<PageSize[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<ListImperativeAPI>(null);
  const preparationRef = useRef<AbortController | null>(null);

  useEffect(() => () => preparationRef.current?.abort(), []);

  const onDocumentLoadSuccess = async (pdf: PDFDocumentProxy) => {
    preparationRef.current?.abort();
    const controller = new AbortController();
    preparationRef.current = controller;
    setPageSizes(null);
    setError(null);
    try {
      const sizes = await measurePages(pdf, controller.signal);
      if (controller.signal.aborted) return;
      setPageSizes(sizes);
      onLoadSuccess(sizes.length);
    } catch (cause) {
      if (controller.signal.aborted) return;
      console.error('Error al preparar las páginas del PDF:', cause);
      setError('No se pudieron obtener las dimensiones de todas las páginas. Inténtalo de nuevo.');
    }
  };

  useImperativeHandle(ref, () => ({
    scrollToPage: (page: number) => {
      if (pageSizes && Number.isInteger(page) && page >= 1 && page <= pageSizes.length) {
        listRef.current?.scrollToRow({ index: page - 1, align: 'start' });
      }
    },
  }));

  const contentWidth = `max(100%, ${pageSizes ? widestPage(pageSizes) * scale : 0}px)`;
  const errorMessage = (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Alert severity="error" variant="filled" sx={{ width: '100%', maxWidth: 500 }}>
        <AlertTitle>Error al abrir el PDF</AlertTitle>
        {error ?? 'No se pudo cargar el documento. Verifica la URL o inténtalo de nuevo.'}
      </Alert>
    </Box>
  );

  return (
    <Box onContextMenu={(event) => event.preventDefault()} sx={{
      width: '100%', height: '100%', backgroundColor: 'grey.200',
      display: 'flex', flexDirection: 'column', userSelect: 'none', WebkitUserSelect: 'none',
    }}>
      <Box sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
        <Document file={url} options={pdfOptions} onLoadSuccess={onDocumentLoadSuccess}
          loading={<Preparation />} error={errorMessage}>
          {error ? errorMessage : pageSizes ? (
            <Box sx={{
              // react-window owns this spacer; its width must survive row unmounts.
              '& > .pdf-page-list > div[aria-hidden="true"]': { width: `${contentWidth} !important` },
            }}>
              <List className="pdf-page-list" listRef={listRef}
                style={{ width: '100%', height: 'calc(100vh - 100px)', overflowX: 'auto' }}
                rowCount={pageSizes.length} rowHeight={pageRowHeight}
                onRowsRendered={({ startIndex }) => onPageVisible(startIndex + 1)}
                rowComponent={Row} rowProps={{ scale, pageSizes, contentWidth }} />
            </Box>
          ) : <Preparation />}
        </Document>
      </Box>
    </Box>
  );
});
DocumentSession.displayName = 'PdfDocumentSession';

export const PdfDocument = forwardRef<PdfDocumentRef, PdfDocumentProps>((props, ref) => (
  <DocumentSession key={props.url} {...props} ref={ref} />
));
PdfDocument.displayName = 'PdfDocument';
