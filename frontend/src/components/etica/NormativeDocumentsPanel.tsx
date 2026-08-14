import { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { PdfViewer } from '../pdfviewer/PdfViewer';
import { normativeDocuments } from './eticaData';

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
                {normativeDocuments.map(({ Icon, title, description, pdfUrl }) => (
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
                        <CardActionArea
                            onClick={() => handleOpenPdf(pdfUrl)}
                            aria-label={`Abrir documento: ${title}`}
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
                                <Icon sx={{ color: 'secondary.main', fontSize: 38, mb: 1 }} />
                                <Typography component="h3" variant="h4" sx={{ color: 'primary.main', mb: 1 }}>
                                    {title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {description}
                                </Typography>
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
