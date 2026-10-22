import { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, Chip, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { PdfViewer } from '../pdfviewer/PdfViewer';
import { normativeDocuments, sesiones } from './eticaData';
import type { SesionId } from './eticaData';

// Etiqueta del origen del documento: la sesión que lo generó o, si no tiene, normativa externa.
const etiquetaOrigen = (sesion?: SesionId) =>
    sesiones.find((s) => s.id === sesion)?.etiqueta ?? 'Normativa estatal';

export default function NormativeDocumentsPanel() {
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

    const handleOpenPdf = (pdfUrl: string) => {
        setSelectedPdf(pdfUrl);
    };

    const handleClosePdf = () => {
        setSelectedPdf(null);
    };

    return (
        <>
            <Typography component="p" variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                Consulta la documentación que rige a organismo en la ética pública y la prevención de conflictos de interés
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
                    gap: 2,
                }}
            >
                {normativeDocuments.map(({ Icon, title, description, pdfUrl, descargable, sesion }) => (
                    <Card
                        key={title}
                        variant="outlined"
                        sx={{
                            height: '100%',
                            transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                            '&:hover': {
                                transform: 'translateY(-3px)',
                                borderColor: 'secondary.main',
                                boxShadow: 2,
                            },
                            '&:active': {
                                transform: 'translateY(-1px) scale(0.995)',
                            },
                        }}
                    >
                        {/* Los documentos descargables (formatos para llenar) se descargan directamente sin pasar por el visor */}
                        <CardActionArea
                            {...(descargable
                                ? { component: 'a', href: pdfUrl, download: true, 'aria-label': `Descargar documento: ${title} (${etiquetaOrigen(sesion)})` }
                                : { onClick: () => handleOpenPdf(pdfUrl), 'aria-label': `Abrir documento: ${title} (${etiquetaOrigen(sesion)})` })}
                            sx={{
                                height: '100%',
                                cursor: 'pointer',
                                '&:focus-visible': {
                                    outline: '3px solid',
                                    outlineColor: 'secondary.main',
                                    outlineOffset: '-3px',
                                },
                            }}
                        >
                            <CardContent sx={{ height: '100%' }}>
                                <Chip
                                    label={etiquetaOrigen(sesion)}
                                    size="small"
                                    variant="outlined"
                                    color={sesion ? 'secondary' : 'default'}
                                    sx={{ display: 'flex', width: 'fit-content', mb: 1.5 }}
                                />
                                <Icon sx={{ color: 'secondary.main', fontSize: 38, mb: 1 }} />
                                <Typography component="h3" variant="h4" sx={{ color: 'primary.main', mb: 1 }}>
                                    {title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {description}
                                </Typography>
                                {descargable && (
                                    <Typography
                                        component="span"
                                        variant="button"
                                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 2, color: 'primary.main' }}
                                    >
                                        <DownloadIcon fontSize="small" aria-hidden="true" />
                                        Descargar PDF
                                    </Typography>
                                )}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
            <PdfViewer
                open={selectedPdf !== null}
                onClose={handleClosePdf}
                pdfUrl={selectedPdf ?? ''}
            />
        </>
    );
}
