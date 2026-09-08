import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import type { Documento, PeriodoCatalogo, PublicacionPeriodo, SeccionResumen } from '../../types/transparencia';

interface FinancialTableViewProps {
  seccion: SeccionResumen;
  periodosCatalogo: PeriodoCatalogo[];
  documentos: Documento[];
  onSeleccionarArchivo: (documento: Documento, publicacion: PublicacionPeriodo) => void;
}

function textoAccion(documento: Documento): string {
  return documento.accionPreferida === 'descargar' ? 'Descargar PDF' : 'Ver PDF';
}

export function FinancialTableView({ seccion, periodosCatalogo, documentos, onSeleccionarArchivo }: FinancialTableViewProps) {
  const columnasPeriodo = [...periodosCatalogo].sort((a, b) => a.orden - b.orden);
  const documentosOrdenados = [...documentos].sort((a, b) => a.orden - b.orden);
  const esMatriz = seccion.presentacion.tipo === 'matriz_periodos';

  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          p: 2,
          borderRadius: '8px 8px 0 0',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <DescriptionIcon />
        <Typography variant="h6" component="span" sx={{ color: 'inherit', fontWeight: 700 }}>
          {seccion.titulo}
        </Typography>
      </Box>

      <TableContainer sx={{ borderRadius: '0 0 8px 8px', borderTop: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Documento</TableCell>
              
              {esMatriz ? (
                columnasPeriodo.map((periodo) => <TableCell key={periodo.clave}>{periodo.nombreCorto}</TableCell>)
              ) : (
                <TableCell>Archivo</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {documentosOrdenados.map((documento) => (
              <TableRow key={documento.id}>
                <TableCell>{documento.titulo}</TableCell>
                
                {esMatriz ? (
                  columnasPeriodo.map((periodo) => {
                    const publicacion = documento.periodos.find((p) => p.clave === periodo.clave);
                    return (
                      <TableCell key={periodo.clave}>
                        {publicacion?.archivo ? (
                          <Button size="small" color="secondary" variant="contained" onClick={() => onSeleccionarArchivo(documento, publicacion)}>
                            {textoAccion(documento)}
                          </Button>
                        ) : (
                          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                            <>{/*Estado pendiente si conteniodo, visualmente mas actractivo*/}</>
                          </Typography>
                        )}
                      </TableCell>
                    );
                  })
                ) : (
                  <TableCell>
                    {documento.periodos[0]?.archivo ? (
                      <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={() => onSeleccionarArchivo(documento, documento.periodos[0])}
                      >
                        {textoAccion(documento)}
                      </Button>
                    ) : (
                      <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                        <>{/*Estado pendiente si conteniodo, visualmente mas actractivo*/}</>
                      </Typography>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
