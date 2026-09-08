import { useMemo, useState } from 'react';
import { Alert, Box, Grid, Skeleton, Snackbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useSearchParams } from 'react-router';
import { useEjercicios, useSecciones, useDetalleSeccion } from '../../hooks/useFinancialData';
import { filtrarDocumentos, filtrarPeriodosCatalogo } from '../../utils/transparencia';
import { apiUrl } from '../../lib/api';
import { PdfViewer } from '../pdfviewer/PdfViewer';
import { FinancialFilters } from './FinancialFilters';
import { FinancialTableView } from './FinancialTableView';
import { FinancialCardView } from './FinancialCardView';
import type { ClavePeriodo, Documento, PublicacionPeriodo } from '../../types/transparencia';

export function FinancialPortal() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams, setSearchParams] = useSearchParams();

  const { ejercicios, isLoading: isLoadingEjercicios, error: errorEjercicios } = useEjercicios();

  const ejercicioParam = searchParams.get('ejercicio');
  const ejercicioActivo = ejercicioParam ? Number(ejercicioParam) : (ejercicios[0]?.ejercicio ?? null);

  const { secciones, isLoading: isLoadingSecciones, error: errorSecciones } = useSecciones(ejercicioActivo);
  const seccionesOrdenadas = useMemo(() => [...secciones].sort((a, b) => a.orden - b.orden), [secciones]);

  const seccionParam = searchParams.get('seccion');
  const seccionActivaId = secciones.some((s) => s.id === seccionParam) ? seccionParam : (seccionesOrdenadas[0]?.id ?? null);
  const seccionActiva = seccionesOrdenadas.find((s) => s.id === seccionActivaId) ?? null;

  const { detalle, isLoading: isLoadingDetalle, error: errorDetalle } = useDetalleSeccion(ejercicioActivo, seccionActivaId);

  const buscar = searchParams.get('buscar') ?? '';
  const periodoActivo = searchParams.get('periodo') as ClavePeriodo | null;
  const archivoAbierto = searchParams.get('archivo');

  const documentosFiltrados = useMemo(
    () => (detalle ? filtrarDocumentos(detalle.documentos, buscar, periodoActivo) : []),
    [detalle, buscar, periodoActivo]
  );
  const periodosColumnas = useMemo(
    () => (detalle ? filtrarPeriodosCatalogo(detalle.periodos, periodoActivo) : []),
    [detalle, periodoActivo]
  );

  const errorGeneral = errorEjercicios || errorSecciones || errorDetalle;

  // Ajuste de estado durante el render (patrón recomendado por React en vez de useEffect+setState):
  // cada vez que aparece un error nuevo, se reabre el snackbar; el usuario puede cerrarlo sin que
  // vuelva a abrirse mientras el mismo error siga presente.
  const [ultimoErrorMostrado, setUltimoErrorMostrado] = useState<unknown>(null);
  const [snackbarAbierto, setSnackbarAbierto] = useState(false);
  if (errorGeneral && errorGeneral !== ultimoErrorMostrado) {
    setUltimoErrorMostrado(errorGeneral);
    setSnackbarAbierto(true);
  }

  const handleEjercicioChange = (nuevo: number) => {
    setSearchParams({ ejercicio: String(nuevo) });
  };

  const handleSeccionChange = (nuevaSeccionId: string) => {
    const next = new URLSearchParams(searchParams);
    next.set('seccion', nuevaSeccionId);
    next.delete('periodo');
    next.delete('archivo');
    setSearchParams(next);
  };

  const handleBuscarChange = (valor: string) => {
    const next = new URLSearchParams(searchParams);
    if (valor) next.set('buscar', valor);
    else next.delete('buscar');
    setSearchParams(next, { replace: true });
  };

  const handlePeriodoChange = (periodo: ClavePeriodo | null) => {
    const next = new URLSearchParams(searchParams);
    if (periodo) next.set('periodo', periodo);
    else next.delete('periodo');
    setSearchParams(next);
  };

  const handleSeleccionarArchivo = (documento: Documento, publicacion: PublicacionPeriodo) => {
    if (!publicacion.archivo) return;

    if (documento.accionPreferida === 'descargar') {
      window.open(apiUrl(publicacion.archivo.urlDescarga), '_blank', 'noopener,noreferrer');
      return;
    }

    const next = new URLSearchParams(searchParams);
    next.set('archivo', publicacion.archivo.id);
    setSearchParams(next);
  };

  const handleCerrarPdf = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('archivo');
    setSearchParams(next);
  };

  const cargando = isLoadingSecciones || isLoadingDetalle;
  const pdfUrl = archivoAbierto ? apiUrl(`api/v1/archivos/${archivoAbierto}/ver`) : '';

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <FinancialFilters
            ejercicios={ejercicios}
            ejercicioActivo={ejercicioActivo}
            onEjercicioChange={handleEjercicioChange}
            isLoadingEjercicios={isLoadingEjercicios}
            secciones={secciones}
            seccionActivaId={seccionActivaId}
            onSeccionChange={handleSeccionChange}
            isLoadingSecciones={isLoadingSecciones}
            seccionActiva={seccionActiva}
            periodosCatalogo={detalle?.periodos ?? []}
            periodoActivo={periodoActivo}
            onPeriodoChange={handlePeriodoChange}
            isLoadingDetalle={isLoadingDetalle}
            buscar={buscar}
            onBuscarChange={handleBuscarChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          {cargando ? (
            <Box>
              {[1, 2, 3].map((item) => (
                <Skeleton key={item} variant="rounded" width="100%" height={60} sx={{ mb: 2 }} />
              ))}
            </Box>
          ) : !seccionActiva ? (
            <Box sx={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">No hay categorías disponibles para este ejercicio.</Typography>
            </Box>
          ) : seccionActiva.totalDocumentos === 0 ? (
            <Box sx={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">Esta sección no tiene documentos publicados.</Typography>
            </Box>
          ) : documentosFiltrados.length === 0 ? (
            <Box sx={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">No se encontraron documentos para los filtros seleccionados.</Typography>
            </Box>
          ) : isMobile ? (
            <FinancialCardView
              seccion={seccionActiva}
              periodosCatalogo={periodosColumnas}
              documentos={documentosFiltrados}
              onSeleccionarArchivo={handleSeleccionarArchivo}
            />
          ) : (
            <FinancialTableView
              seccion={seccionActiva}
              periodosCatalogo={periodosColumnas}
              documentos={documentosFiltrados}
              onSeleccionarArchivo={handleSeleccionarArchivo}
            />
          )}
        </Grid>
      </Grid>

      <PdfViewer open={Boolean(archivoAbierto)} onClose={handleCerrarPdf} pdfUrl={pdfUrl} />

      <Snackbar
        open={snackbarAbierto}
        autoHideDuration={5000}
        onClose={(_event, reason) => {
          if (reason === 'clickaway') return;
          setSnackbarAbierto(false);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }} onClose={() => setSnackbarAbierto(false)}>
          Ocurrió un error al cargar la información financiera. Intenta de nuevo más tarde.
        </Alert>
      </Snackbar>
    </>
  );
}
