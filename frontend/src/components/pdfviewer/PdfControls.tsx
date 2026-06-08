import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, TextField, Tooltip } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CloseIcon from '@mui/icons-material/Close';

interface PdfControlsProps {
  numPages: number | null;
  pageNumber: number;
  scale: number;
  onPageChange: (page: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onClose: () => void;
}

export const PdfControls: React.FC<PdfControlsProps> = ({
  numPages,
  pageNumber,
  scale,
  onPageChange,
  onZoomIn,
  onZoomOut,
  onClose,
}) => {
  const [inputPage, setInputPage] = useState<string>(pageNumber.toString());

  useEffect(() => {
    setInputPage(pageNumber.toString());
  }, [pageNumber]);

  const handlePageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = parseInt(inputPage, 10);
    if (!isNaN(parsed) && numPages && parsed >= 1 && parsed <= numPages) {
      onPageChange(parsed);
    } else {
      setInputPage(pageNumber.toString()); // reset if invalid
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1,
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Zoom Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Disminuir Zoom">
          <span>
            <IconButton onClick={onZoomOut} disabled={scale <= 0.25}>
              <ZoomOutIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Typography variant="body2" sx={{ minWidth: '45px', textAlign: 'center' }}>
          {Math.round(scale * 100)}%
        </Typography>
        <Tooltip title="Aumentar Zoom">
          <span>
            <IconButton onClick={onZoomIn} disabled={scale >= 3}>
              <ZoomInIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      {/* Page Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <form onSubmit={handlePageSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TextField
            size="small"
            variant="outlined"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            onBlur={() => setInputPage(pageNumber.toString())}
            slotProps={{
              htmlInput: {
                inputMode: 'numeric',
                style: { textAlign: 'center', width: '40px', padding: '4px 8px' },
              },
            }}
          />
          <Typography variant="body2">
            de {numPages || '--'}
          </Typography>
        </form>
      </Box>

      {/* Close Control */}
      <Tooltip title="Cerrar">
        <IconButton onClick={onClose} color="error">
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
