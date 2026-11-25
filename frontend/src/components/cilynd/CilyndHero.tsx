import { Box, Button, Typography } from '@mui/material';

interface CilyndHeroProps {
    onCommitteeClick: () => void;
    onDocumentsClick: () => void;
}

export default function CilyndHero({ onCommitteeClick, onDocumentsClick }: CilyndHeroProps) {
    return (
        <Box
            component="section"
            aria-labelledby="cilynd-hero-title"
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.05fr) minmax(320px, 0.95fr)' },
                alignItems: 'center',
                gap: { xs: 4, md: 2 },
                mb: { xs: 5, md: 8 },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    textAlign: { xs: 'center', md: 'left' },
                }}
            >
                <Typography
                    id="cilynd-hero-title"
                    component="h1"
                    sx={{
                        color: 'primary.main',
                        fontSize: { xs: '2.35rem', sm: '3.2rem', md: '3.5rem' },
                        fontWeight: 800,
                        lineHeight: 1.08,
                        letterSpacing: '-0.03em',
                        maxWidth: '720px',
                    }}
                >
                    Comité de Igualdad Laboral y No Discriminación
                </Typography>
                <Box
                    aria-hidden="true"
                    sx={{
                        width: { xs: 80, md: 120 },
                        height: 5,
                        backgroundColor: 'secondary.main',
                        borderRadius: 2,
                        mt: 2,
                        mb: 3,
                    }}
                />
                <Typography
                    component="p"
                    variant="body1"
                    sx={{ color: 'text.secondary', maxWidth: '650px', mb: 4 }}
                >
                    Promovemos un ambiente de trabajo basado en el respeto a los derechos humanos, la igualdad y la no discriminación entre todas las personas servidoras públicas del SOAPAP.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        gap: 2,
                        width: '100%',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={onCommitteeClick}
                        sx={{ width: { xs: '100%', sm: 'auto' } }}
                    >
                        Conocer el Comité
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onDocumentsClick}
                        sx={{
                            width: { xs: '100%', sm: 'auto' },
                            borderColor: 'secondary.main',
                            color: 'secondary.main',
                            '&:hover': {
                                borderColor: 'secondary.dark',
                                backgroundColor: 'rgba(184, 130, 42, 0.08)',
                            },
                        }}
                    >
                        Consulta los documentos
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    component="img"
                    src="/cilyndImg/logo.webp"
                    alt="Logotipo del Comité de Igualdad Laboral y No Discriminación: personas de colores unidas en torno a una gota de agua"
                    sx={{
                        display: 'block',
                        width: { xs: '78%', sm: '65%', md: '90%' },
                        maxWidth: 500,
                        height: 'auto',
                    }}
                />
            </Box>
        </Box>
    );
}
