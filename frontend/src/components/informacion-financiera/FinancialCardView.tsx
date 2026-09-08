import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { claveCorta } from '../../utils/transparencia';
import type { Documento, PeriodoCatalogo, PublicacionPeriodo, SeccionResumen } from '../../types/transparencia';

interface FinancialCardViewProps {
  seccion: SeccionResumen;
  periodosCatalogo: PeriodoCatalogo[];
  documentos: Documento[];
  onSeleccionarArchivo: (documento: Documento, publicacion: PublicacionPeriodo) => void;
}

function textoAccion(documento: Documento): string {
  return documento.accionPreferida === 'descargar' ? 'Descargar PDF' : 'Ver PDF';
}

export function FinancialCardView({ seccion, periodosCatalogo, documentos, onSeleccionarArchivo }: FinancialCardViewProps) {
  const documentosOrdenados = [...documentos].sort((a, b) => a.orden - b.orden);
  const esMatriz = seccion.presentacion.tipo === 'matriz_periodos';
  const nombreCortoPorClave = new Map(periodosCatalogo.map((p) => [p.clave, p.nombreCorto]));

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
        <Box>
          <Typography variant="subtitle1" sx={{ color: 'inherit', fontWeight: 700, lineHeight: 1.3 }}>
            {seccion.titulo}
          </Typography>
          <Typography variant="body2" sx={{ color: 'inherit', opacity: 0.85 }}>
            {documentos.length} documentos
          </Typography>
        </Box>
      </Box>

      <Stack spacing={1.5} sx={{ mt: 1.5 }}>
        {documentosOrdenados.map((documento) => (
          <Card key={documento.id} variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {documento.titulo}
                </Typography>
              </Box>
              {esMatriz ? <ChevronRightIcon sx={{ color: 'action.active', flexShrink: 0 }} /> : null}
            </Stack>

            {esMatriz ? (
              <Stack sx={{ mt: 1.5 }} divider={<Divider />}>
                {documento.periodos.map((publicacion) => (
                  <Stack
                    key={publicacion.clave}
                    direction="row"
                    spacing={1}
                    sx={{ minHeight: 44, py: 0.5, alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, width: 32, flexShrink: 0 }}>
                        {claveCorta(publicacion.clave)}
                      </Typography>
                      <Typography variant="body2">{nombreCortoPorClave.get(publicacion.clave) ?? publicacion.nombre}</Typography>
                    </Stack>
                    {publicacion.archivo ? (
                      <Button size="small" color="secondary" onClick={() => onSeleccionarArchivo(documento, publicacion)}>
                        {textoAccion(documento)}
                      </Button>
                    ) : (
                      <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                        <>{/*Estado pendiente si conteniodo, visualmente mas actractivo*/}</>
                      </Typography>
                    )}
                  </Stack>
                ))}
              </Stack>
            ) : (
              <Box sx={{ mt: 1.5, minHeight: 44, display: 'flex', alignItems: 'center' }}>
                {documento.periodos[0]?.archivo ? (
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => onSeleccionarArchivo(documento, documento.periodos[0])}
                  >
                    {textoAccion(documento)}
                  </Button>
                ) : (
                  <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                    <>{/*Estado pendiente si conteniodo, visualmente mas actractivo*/}</>
                  </Typography>
                )}
              </Box>
            )}
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
