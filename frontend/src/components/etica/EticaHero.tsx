import { Box, Button, Typography } from '@mui/material';
import logoEtica from '/eticaGalery/logo.png';

interface EticaHeroProps {
    onCommitteeClick: () => void;
    onNormativeClick: () => void;
}

export default function EticaHero({ onCommitteeClick, onNormativeClick }: EticaHeroProps) {
    return (
        <Box
            component="section"
            aria-labelledby="etica-hero-title"
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
                    id="etica-hero-title"
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
                    Comité de Ética y Prevención de Conflictos de Interés
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
                    Promovemos una cultura de integridad, valores y servicio público para fortalecer la confianza ciudadana y prevenir situaciones que puedan generar conflictos de interés dentro de nuestra institución.
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
                        onClick={onNormativeClick}
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
                        Consulta los lineamientos
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    component="img"
                    src={logoEtica}
                    alt="Ilustración del Comité de Ética con un escudo, personas y una balanza"
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
