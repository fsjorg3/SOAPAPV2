import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Container, Divider, Typography } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import { PdfViewer } from '../components/pdfviewer/PdfViewer';

export default function Normatividad() {
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

    const normatividad = [
        {
            titulo: "DECRETO DE CREACIÓN",
            link: "/pdfs/test.pdf",
            actualizacion: '01/ene/2014'
        },
        {
            titulo: "LEY DEL AGUA PARA EL ESTADO DE PUEBLA",
            link: "/pdfs/test.pdf",
            actualizacion: '01/ene/2014'
        },
        {
            titulo: "REGLAMENTO INTERNO",
            link: "/pdfs/test.pdf",
            actualizacion: '01/ene/2014'
        },
        {
            titulo: "REFORMAS AL REGLAMENTO INTERNO",
            link: "/pdfs/test.pdf",
            actualizacion: '01/ene/2014'
        },
        {
            titulo: "CÓDIGO DE CONDUCTA",
            link: "/pdfs/test.pdf",
            actualizacion: '01/ene/2014'
        },
        {
            titulo: "CÓDIGO DE ÉTICA",
            link: "/pdfs/test.pdf",
            actualizacion: '01/ene/2014'
        },
        {
            titulo: "ACUERDO GENERAL",
            link: "/pdfs/test.pdf",
            actualizacion: '01/ene/2014'
        }
    ]


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
                    Directorio Institucional
                </Typography>
                <Box
                    sx={{
                        width: { xs: "25%", md: "15%" },
                        height: "5px",
                        backgroundColor: "secondary.main",
                    }}
                />
                <Typography variant="subtitle1" color="text.secondary">
                    Mostrando {normatividad.length - 1} resultados
                </Typography>
            </Box>



            {/* Grid de tarjetas */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                {normatividad.map((norma, index) => (
                    <Card key={index} variant="outlined" sx={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" component="h3" color="primary.main" fontWeight="medium" gutterBottom>
                                {norma.titulo}
                            </Typography>

                            <Divider sx={{ my: 1.5 }} />

                            <Typography variant="body2" color="text.secondary">
                                Actualizado: {norma.actualizacion}
                            </Typography>
                        </CardContent>

                        <CardActions sx={{ p: 2, pt: 0 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<LaunchIcon />}
                                onClick={() => setSelectedPdf(norma.link)}
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

            {/* Visor de PDF Modal */}
            <PdfViewer
                open={selectedPdf !== null}
                onClose={() => setSelectedPdf(null)}
                pdfUrl={selectedPdf || ''}
            />
        </Container>
    </>)
}