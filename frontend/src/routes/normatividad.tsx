import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useSWR from 'swr';
import { Box, Button, Card, CardActions, CardContent, Container, Divider, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { PdfViewer } from '../components/pdfviewer/PdfViewer';


export interface DocumentoConcesion {
    titulo: string;
    link: string;
}

export interface SeccionConcesion {
    titulo: string;
    documentos: DocumentoConcesion[];
}

export default function Normatividad() {
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const fileParam = searchParams.get('file');

    useEffect(() => {
        if (fileParam) {
            setSelectedPdf(`${import.meta.env.VITE_API_URL}soapapv2/api/transparency/file/${fileParam}`);
        } else {
            setSelectedPdf(null);
        }
    }, [fileParam]);

    const handleOpenPdf = (fileName: string) => {
        setSearchParams({ file: fileName });
    };

    const handleClosePdf = () => {
        setSearchParams({});
    };

    const [expandedPanels, setExpandedPanels] = useState<number[]>([]);

    const handleAccordionChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanels(prev =>
            isExpanded ? [...prev, panel] : prev.filter(p => p !== panel)
        );
    };

    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data: normatividad, error: normatividadError } =
        useSWR(`${import.meta.env.VITE_API_URL}soapapv2/api/transparency/files/normatividad`, fetcher);

    const { data: tituloConcesionData, error: tituloError } =
        useSWR(`${import.meta.env.VITE_API_URL}soapapv2/api/transparency/files/titulo`, fetcher);

    return (<>
        <Container sx={{ py: 4, minHeight: '80vh' }}>

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
                    Normatividad
                </Typography>
                <Box
                    sx={{
                        width: { xs: "25%", md: "15%" },
                        height: "5px",
                        backgroundColor: "secondary.main",
                    }}
                />
                <Typography variant="subtitle1" color="text.secondary">
                    Mostrando {normatividad ? normatividad.length : 0} resultados
                </Typography>
            </Box>



            {/* Grid de tarjetas */}
            {normatividadError && <Typography color="error">Error al cargar la normatividad. {normatividadError.message}</Typography>}
            {!normatividad && !normatividadError && <Typography>Cargando normatividad...</Typography>}
            {normatividad && (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, marginBottom: { xs: "40px", md: "80px" }, }}>
                    {normatividad.map((norma: any, index: number) => (
                        <Card key={index} variant="outlined" sx={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                <Typography variant="subtitle1" component="h3" color="primary.main" sx={{ fontWeight: "medium", lineHeight: 1.2 }} gutterBottom>
                                    {norma.titulo}
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ p: 1.5, pt: 0 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    endIcon={<LaunchIcon />}
                                    onClick={() => handleOpenPdf(norma.filename)}
                                    fullWidth
                                    sx={{
                                        borderRadius: 2,
                                        '&:hover, &:active': {
                                            backgroundColor: 'secondary.main'
                                        }
                                    }}
                                >
                                    Explorar
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}


            {/* Title 2 */}
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
                    TITULO DE CONCESIÓN
                </Typography>
                <Box
                    sx={{
                        width: { xs: "25%", md: "15%" },
                        height: "5px",
                        backgroundColor: "secondary.main",
                    }}
                />
                <Typography variant="subtitle1" color="text.secondary">
                    Mostrando {tituloConcesionData ? tituloConcesionData.reduce((acc: number, seccion: SeccionConcesion) => acc + seccion.documentos.length, 0) : 0} documentos en {tituloConcesionData ? tituloConcesionData.length : 0} secciones
                </Typography>
            </Box>


            {tituloError && <Typography color="error">Error al cargar los documentos de la concesión.</Typography>}
            {!tituloConcesionData && !tituloError ? (
                <Typography>Cargando documentos...</Typography>
            ) : (
                <Box sx={{ width: '100%', mb: 8 }}>
                    {tituloConcesionData && tituloConcesionData.map((seccion: SeccionConcesion, index: number) => {
                        const isOpen = expandedPanels.includes(index);
                        return (
                            <Accordion
                                key={index}
                                disableGutters
                                elevation={0}
                                expanded={isOpen}
                                onChange={handleAccordionChange(index)}
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    '&:before': { display: 'none' },
                                    mb: 2,
                                    borderRadius: '8px !important',
                                    overflow: 'hidden'
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {isOpen ? <FolderOpenIcon sx={{ mr: 1.5, color: 'primary.main' }} /> : <FolderIcon sx={{ mr: 1.5, color: 'primary.main' }} />}
                                        <Typography variant="h6" color="primary.main">{seccion.titulo}</Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        {seccion.documentos.map((doc, docIndex) => (
                                            <Box
                                                component="a"
                                                key={docIndex}
                                                onClick={() => handleOpenPdf(doc.link.split('/').pop() || '')}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    cursor: 'pointer',
                                                    textDecoration: 'none',
                                                    color: 'inherit',
                                                    padding: '8px',
                                                    borderRadius: '4px',
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0,0,0,0.04)',
                                                        color: 'primary.main',
                                                    }
                                                }}
                                            >
                                                <Typography variant="body1">{doc.titulo}</Typography>
                                                <OpenInNewIcon sx={{ fontSize: '1.2rem', color: 'text.secondary' }} />
                                            </Box>
                                        ))}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </Box>
            )}

            {/* Visor de PDF Modal */}
            <PdfViewer
                open={selectedPdf !== null}
                onClose={handleClosePdf}
                pdfUrl={selectedPdf || ''}
            />
        </Container>
    </>)
}