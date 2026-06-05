import { Box, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Radio, RadioGroup, FormControlLabel, Accordion, AccordionSummary, AccordionDetails, Card, Skeleton, Snackbar, Alert, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import useSWR from "swr";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LaunchIcon from '@mui/icons-material/Launch';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { PdfViewer } from '../components/pdfviewer/PdfViewer';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function InformacionFinanciera() {
    const { data: dataAnios, error: errorAnios, isLoading: isLoadingAnios } = useSWR('/4backend/anios.json', fetcher);
    const [searchParams, setSearchParams] = useSearchParams();
    const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
    const [currentPdfUrl, setCurrentPdfUrl] = useState("");
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "warning" | "error" | "success" | "info" }>({
        open: false,
        message: "",
        severity: "warning"
    });

    const aniosList: string[] = Array.isArray(dataAnios)
        ? dataAnios
        : (dataAnios?.anios || []);

    const activeAnio = searchParams.get("anio") || (aniosList.length > 0 ? aniosList[0] : "");
    const activeCategoria = searchParams.get("categoria") || "todos";

    const { data: dataDetalle, error: errorDetalle, isLoading: isLoadingDetalle } = useSWR(
        activeAnio ? `/4backend/${activeAnio}.json` : null,
        fetcher
    );

    useEffect(() => {
        if (!isLoadingDetalle && activeAnio) {
            if (errorDetalle) {
                setSnackbar({
                    open: true,
                    message: `Error al cargar la información del año ${activeAnio}.`,
                    severity: 'error',
                });
            } else if (dataDetalle && (!dataDetalle.secciones || dataDetalle.secciones.length === 0)) {
                setSnackbar({
                    open: true,
                    message: `No hay información disponible para el año ${activeAnio}.`,
                    severity: 'warning'
                });
            }
        }
    }, [dataDetalle, errorDetalle, isLoadingDetalle, activeAnio]);

    const handleAnioChange = (newAnio: string) => {
        setSearchParams({ anio: newAnio, categoria: "todos" });
    };

    const handleCategoriaChange = (newCategoria: string) => {
        setSearchParams({ anio: activeAnio, categoria: newCategoria });
    };

    const handlePdfClick = async (linkString: string) => {
        const targetUrl = `/pdfs/${linkString}.pdf`;
        try {
            const response = await fetch(targetUrl, { method: 'HEAD' });
            if (response.ok) {
                //setCurrentPdfUrl(targetUrl);
                setCurrentPdfUrl('/pdfs/test.pdf'); //temporalmente mientras esta en primeras pruebas

            } else {
                setCurrentPdfUrl('/pdfs/test.pdf');
                setSnackbar({ open: true, message: 'El documento original no está disponible, abriendo versión de prueba.', severity: 'warning' });
            }
        } catch (error) {
            setCurrentPdfUrl('/pdfs/test.pdf');
            setSnackbar({ open: true, message: 'El documento original no está disponible, abriendo versión de prueba.', severity: 'warning' });
        }
        setPdfViewerOpen(true);
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const filteredSecciones = activeCategoria === "todos"
        ? (dataDetalle?.secciones || [])
        : (dataDetalle?.secciones || []).filter((seccion: any) => seccion.titulo === activeCategoria);

    return (<>

        <Container maxWidth='lg' >


            {/* Title */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    marginBottom: { xs: "20px", md: "40px" },
                }}
            >
                <Typography
                    sx={{
                        textAlign: "left",
                        fontSize: "40px",
                        fontWeight: "900",
                        color: "primary.main",
                        borderBottom: "2px solid secondary.main",
                    }}
                >
                    Información financiera
                </Typography>
                <Box
                    sx={{
                        width: { xs: "25%", md: "15%" },
                        height: "5px",
                        backgroundColor: "secondary.main",
                    }}
                />
                <Typography
                    variant="body1"
                    sx={{
                        color: "text.secondary",
                        marginTop: "16px",
                        textAlign: "left",
                        maxWidth: "800px",
                    }}
                >
                    Consulta la información financiera, contable, presupuestal y programática del Sistema Operador de los Servicios de Agua Potable y Alcantarillado del Municipio de Puebla por periodo fiscal.
                </Typography>
            </Box>



            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3, lg: 4 }}>
                    <Card variant="outlined" sx={{ p: 3, height: 'fit-content', mb: { xs: 2, md: 0 }, position: { md: 'sticky' }, top: { md: '20px' } }}>
                        <FormControl fullWidth sx={{ mt: 1.5 }}>
                            <InputLabel id="select-anio-label">Año</InputLabel>
                            <Select
                                labelId="select-anio-label"
                                id="select-anio"
                                value={activeAnio}
                                label="Año"
                                onChange={(e) => handleAnioChange(e.target.value)}
                                disabled={isLoadingAnios}
                            >
                                {aniosList.map((anio: string) => (
                                    <MenuItem key={anio} value={anio} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CalendarTodayIcon sx={{ fontSize: '1.1rem', color: 'action.active', marginRight: "8px" }} />
                                        {anio}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {dataDetalle?.secciones && (
                            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, textTransform: 'capitalize' }}>
                                    categorías
                                </Typography>
                                <Button
                                    variant="text"
                                    onClick={() => handleCategoriaChange("todos")}
                                    sx={{
                                        justifyContent: "flex-start",
                                        textAlign: "left",
                                        width: "100%",
                                        pr: "5%",
                                        borderRadius: "0px",
                                        color: activeCategoria === "todos" ? "primary.main" : "text.secondary",
                                        fontWeight: activeCategoria === "todos" ? 700 : 500,
                                        borderRight: "4px solid",
                                        borderColor: activeCategoria === "todos" ? "primary.main" : "transparent",
                                        backgroundColor: activeCategoria === "todos" ? "rgba(97, 103, 57, 0.03)" : "transparent",
                                        "&:hover": {
                                            backgroundColor: "rgba(97, 103, 57, 0.03)",
                                        },
                                        textTransform: "capitalize",
                                    }}
                                >
                                    todos
                                </Button>
                                {dataDetalle.secciones.map((seccion: any, index: number) => (
                                    <Button
                                        key={index}
                                        variant="text"
                                        onClick={() => handleCategoriaChange(seccion.titulo)}
                                        sx={{
                                            justifyContent: "flex-start",
                                            textAlign: "left",
                                            width: "100%",
                                            pr: "5%",
                                            borderRadius: "0px",
                                            color: activeCategoria === seccion.titulo ? "primary.main" : "text.secondary",
                                            fontWeight: activeCategoria === seccion.titulo ? 700 : 500,
                                            borderRight: "4px solid",
                                            borderColor: activeCategoria === seccion.titulo ? "primary.main" : "transparent",
                                            backgroundColor: activeCategoria === seccion.titulo ? "rgba(97, 103, 57, 0.03)" : "transparent",
                                            "&:hover": {
                                                backgroundColor: "rgba(97, 103, 57, 0.03)",
                                            },
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {seccion.titulo}
                                    </Button>
                                ))}
                            </Box>
                        )}
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 9, lg: 8 }} sx={{ p: { xs: 0, md: 3 } }}>

                    {isLoadingDetalle ? (
                        <Box sx={{ width: '100%' }}>
                            {[1, 2, 3].map((item) => (
                                <Skeleton key={item} variant="rounded" width="100%" height={60} sx={{ mb: 2 }} />
                            ))}
                        </Box>
                    ) : filteredSecciones.length === 0 ? (
                        <>
                            <Box sx={{ height: '80vh' }}>
                                <Typography>No se encontró información para el año y categoría seleccionados.</Typography>
                            </Box>
                        </>
                    ) : (
                        filteredSecciones.map((seccion: any, secIdx: number) => (
                            <Accordion key={`${secIdx}-${activeCategoria}`} defaultExpanded={activeCategoria !== "todos"} elevation={0} disableGutters sx={{ mb: 2, backgroundColor: 'transparent', '&:before': { display: 'none' } }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#F8F9FB', borderRadius: '8px' }}>
                                    <Typography variant="h4" sx={{ color: 'primary.main' }}>
                                        {seccion.titulo}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: { xs: 1, md: 2 } }}>
                                    {seccion.periodos?.map((periodo: any, perIdx: number) => (
                                        <Accordion key={`${perIdx}-${activeCategoria}`} defaultExpanded={activeCategoria !== "todos"} elevation={0} disableGutters sx={{ mb: 1.5, backgroundColor: 'transparent', '&:before': { display: 'none' } }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ borderBottom: '1px solid #E9ECEF' }}>
                                                <Typography variant="h4" sx={{ color: 'text.secondary', fontSize: '18px' }}>
                                                    {periodo.periodo === seccion.titulo ? "Enlaces" : periodo.periodo}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ p: { xs: 1, md: 2 } }}>
                                                {periodo.documentos?.map((doc: any, docIdx: number) => (
                                                    <Box
                                                        key={docIdx}
                                                        onClick={doc.link ? () => handlePdfClick(doc.link) : undefined}
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            py: 1.5,
                                                            px: 2,
                                                            borderBottom: '1px solid #E9ECEF',
                                                            '&:last-child': { borderBottom: 'none' },
                                                            transition: 'all 0.2s ease',
                                                            cursor: doc.link ? 'pointer' : 'default',
                                                            '&:hover': doc.link ? {
                                                                backgroundColor: '#F2F4F6',
                                                                borderRadius: '8px',
                                                                color: 'primary.main',
                                                                pl: 3
                                                            } : {}
                                                        }}
                                                    >
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <DocumentScannerIcon sx={{ fontSize: '1rem', color: 'primary.main', mr: 1 }} />
                                                            <Typography variant="body1" sx={{ fontSize: '0.8rem', color: 'inherit', fontWeight: 400 }}>
                                                                {doc.titulo}
                                                            </Typography>
                                                        </Box>
                                                        {doc.link ? <LaunchIcon sx={{ fontSize: '1.2rem', color: 'primary.main' }} /> : null}
                                                    </Box>
                                                ))}
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        ))
                    )}

                </Grid>
            </Grid>

            <PdfViewer open={pdfViewerOpen} onClose={() => setPdfViewerOpen(false)} pdfUrl={currentPdfUrl} />

            <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </Container>

    </>)
}