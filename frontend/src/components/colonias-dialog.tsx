import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box
} from '@mui/material';

interface ColoniasDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ColoniasDialog({ open, onClose }: ColoniasDialogProps) {
  const [colonias, setColonias] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (open) {
      fetch('/colonias.json')
        .then((response) => response.json())
        .then((data) => setColonias(data))
        .catch((error) => console.error('Error fetching colonias:', error));
    }
  }, [open]);

  const filteredColonias = colonias.filter(colonia => 
    colonia.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}>
        Colonias Participantes
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2, mt: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Buscar colonia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 400 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: 'primary.main' }}>
                  Nombre de la Colonia
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredColonias.length > 0 ? (
                filteredColonias.map((colonia, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{colonia}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" sx={{ py: 3, color: 'text.secondary' }}>
                    No se encontraron resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
