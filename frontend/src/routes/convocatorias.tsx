import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useSWR from 'swr';
import { Box, Button, Card, CardActions, CardContent, Container, Typography, Chip } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import { PdfViewer } from '../components/pdfviewer/PdfViewer';
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { seoMetadata } from "../config/seo-metadata";

export interface Convocatoria {
    id: string;
    expediente: string;
    year: number;
    category: string;
    description: string;
    filename: string;
    path?: string;
}

export default function Convocatorias() {
    useDocumentMeta(seoMetadata.convocatorias);
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const fileParam = searchParams.get('file');

    useEffect(() => {
        if (fileParam) {
            setSelectedPdf(`${import.meta.env.VITE_API_URL}soapapv2/api/transparency/file/${encodeURIComponent(fileParam)}`);
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

    const fetcher = (url: string) => fetch(url).then(res => res.json());

    // Solicitamos la información usando el backend API
    const { data: convocatorias, error: convocatoriasError } =
        useSWR<Convocatoria[]>(`${import.meta.env.VITE_API_URL}soapapv2/api/transparency/files/convocatorias`, fetcher);

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
                        textTransform: "uppercase"
                    }}
                >
                    Convocatorias de Obra Pública y Adquisiciones
                </Typography>
                <Box
                    sx={{
                        width: { xs: "25%", md: "15%" },
                        height: "5px",
                        backgroundColor: "secondary.main",
                    }}
                />
                <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
                    Mostrando {convocatorias ? convocatorias.length : 0} convocatorias registradas
                </Typography>
            </Box>


            {/* Lista de convocatorias */}
            {convocatoriasError && <Typography color="error">Error al cargar las convocatorias. {convocatoriasError.message}</Typography>}
            {!convocatorias && !convocatoriasError && <Typography>Cargando convocatorias...</Typography>}

            {convocatorias && (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, marginBottom: { xs: "40px", md: "80px" } }}>
                    {convocatorias.map((convocatoria) => (
                        <Card key={convocatoria.id} variant="outlined" sx={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }, borderRadius: '12px' }}>
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                                    <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Año {convocatoria.year}
                                    </Typography>
                                    <Chip label={convocatoria.category} size="small" color="primary" variant="outlined" />
                                </Box>

                                <Typography variant="h6" component="h3" color="primary.main" sx={{ fontWeight: "bold", mb: 1.5, lineHeight: 1.3 }}>
                                    {convocatoria.expediente}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {convocatoria.description}
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ p: 2, pt: 0, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    endIcon={<LaunchIcon />}
                                    onClick={() => handleOpenPdf(convocatoria.filename)}
                                    sx={{
                                        borderRadius: 2,
                                        '&:hover, &:active': {
                                            backgroundColor: 'secondary.main'
                                        }
                                    }}
                                >
                                    Ver Convocatoria
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
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
