import React, { useState, useRef, useCallback } from 'react';
import { Dialog, Box, useMediaQuery, useTheme } from '@mui/material';
import { PdfControls } from './PdfControls';
import { PdfDocument, type PdfDocumentRef } from './PdfDocument';

interface PdfViewerProps {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
}

const PdfViewerSession: React.FC<PdfViewerProps> = ({ open, onClose, pdfUrl }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(() => (
    typeof window !== 'undefined' && window.innerWidth < 900 ? 0.25 : 1.0
  ));

  const documentRef = useRef<PdfDocumentRef>(null);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.25));

  const handlePageChange = (page: number) => {
    if (documentRef.current) {
      documentRef.current.scrollToPage(page);
    }
  };

  const handlePageVisible = useCallback((visiblePage: number) => {
    setPageNumber(visiblePage);
  }, []);

  const handleClose = () => {
    // Reset state on close
    setPageNumber(1);
    setScale(1.0);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={isMobile}
      maxWidth="lg"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'grey.200',
            overflow: 'hidden',
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: isMobile ? '100vh' : '90vh', width: '100%' }}>
        <PdfControls
          numPages={numPages}
          pageNumber={pageNumber}
          scale={scale}
          onPageChange={handlePageChange}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onClose={handleClose}
        />

        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <PdfDocument
            ref={documentRef}
            url={pdfUrl}
            scale={scale}
            onLoadSuccess={setNumPages}
            onPageVisible={handlePageVisible}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export const PdfViewer: React.FC<PdfViewerProps> = (props) => (
  <PdfViewerSession key={`${props.pdfUrl}:${props.open}`} {...props} />
);
