import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { DocumentoNormativo } from '../../types/normatividad';
import type { IconComponent } from './normatividadIconos';

interface AccordionGrupoDocumentosProps {
  id: string;
  titulo: string;
  descripcion?: string | null;
  icon: IconComponent;
  documentos: DocumentoNormativo[];
  expanded: boolean;
  onToggle: (id: string, isExpanded: boolean) => void;
  onAbrirDocumento: (documento: DocumentoNormativo) => void;
}

export function AccordionGrupoDocumentos({
  id,
  titulo,
  descripcion,
  icon: Icon,
  documentos,
  expanded,
  onToggle,
  onAbrirDocumento,
}: AccordionGrupoDocumentosProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const documentosOrdenados = [...documentos].sort((a, b) => a.orden - b.orden);

  return (
    <Accordion
      disableGutters
      elevation={0}
      expanded={expanded}
      onChange={(_event, isExpanded) => onToggle(id, isExpanded)}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        '&:before': { display: 'none' },
        mb: 2,
        borderRadius: '8px !important',
        overflow: 'hidden',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', flexWrap: 'wrap' }}>
          <Icon sx={{ color: 'primary.main' }} />
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="h6" color="primary.main" sx={{ lineHeight: 1.3 }}>
              {titulo}
            </Typography>
            {descripcion && (
              <Typography variant="body2" color="text.secondary">
                {descripcion}
              </Typography>
            )}
          </Box>
          <Chip label={`${documentos.length} documento${documentos.length === 1 ? '' : 's'}`} size="small" color="primary" variant="outlined" />
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 0 }}>
        {isMobile ? (
          <Stack divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />}>
            {documentosOrdenados.map((documento) => (
              <Box key={documento.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, p: 2 }}>
                <Typography variant="body1">{documento.titulo}</Typography>
                {documento.archivo && (
                  <Button size="small" variant="contained" color="secondary" endIcon={<OpenInNewIcon />} onClick={() => onAbrirDocumento(documento)}>
                    Ver
                  </Button>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Documento</TableCell>
                  <TableCell align="right"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documentosOrdenados.map((documento) => (
                  <TableRow key={documento.id}>
                    <TableCell>{documento.titulo}</TableCell>
                    <TableCell align="right">
                      {documento.archivo ? (
                        <Button size="small" variant="contained" color="secondary" endIcon={<OpenInNewIcon />} onClick={() => onAbrirDocumento(documento)}>
                          Ver documento
                        </Button>
                      ) : (
                        <Typography variant="body2" sx={{ color: 'text.disabled' }} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
