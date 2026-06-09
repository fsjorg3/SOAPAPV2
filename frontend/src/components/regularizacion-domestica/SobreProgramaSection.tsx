import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PaymentIcon from '@mui/icons-material/Payment';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import gota from '/assets/regularizate_2026/gota.png';

export default function SobreProgramaSection() {
    return (
        <>
            <Grid container spacing={4} sx={{ alignItems: 'center', mt: 4, mb: 6 }}>
                <Grid size={12}>
                    {/* Title */}
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginBottom: { xs: "20px", md: "30px" },
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: "center",
                                fontSize: { xs: "28px", md: "40px" },
                                fontWeight: "900",
                                color: "primary.main",
                                textTransform: "uppercase"
                            }}
                        >
                            SOBRE EL PROGRAMA
                        </Typography>
                        <Box
                            sx={{
                                width: { xs: "25%", md: "15%" },
                                height: "5px",
                                backgroundColor: "secondary.main",
                                mt: 1
                            }}
                        />
                    </Box>

                    {/* Parrafo 1 */}
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            maxWidth: '800px',
                            mx: 'auto',
                            color: 'text.secondary',
                            lineHeight: 1.6
                        }}
                    >
                        Este programa tiene como objetivo apoyar la regularización de adeudos de usuarios en
                        situación vulnerable, así como la contratación de servicios de carácter
                        unifamiliar irregular, mediante beneficios y facilidades administrativas.
                    </Typography>
                </Grid>

                {/* Left Column: Gota Image */}
                <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box component="img" src={gota} alt="Gota Regularízate"
                        sx={{
                            width: { xs: '65%', sm: '55%', md: '80%' },
                            maxWidth: '320px',
                            height: 'auto',
                            objectFit: 'contain',
                            display: 'block'
                        }} />
                </Grid>

                {/* Right Column: Benefits list */}
                <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {/* Beneficios Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Box sx={{
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            p: 1.5,
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '50px',
                            height: '50px',
                            boxShadow: '0 4px 10px rgba(91, 19, 43, 0.2)'
                        }}>
                            <PaymentIcon sx={{ fontSize: '1.8rem' }} />
                        </Box>
                        <Box>
                            <Typography sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1.25rem' }, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                BENEFICIOS DEL PROGRAMA
                            </Typography>
                            <Box sx={{ width: '40px', height: '2px', backgroundColor: 'primary.main', mt: 0.5 }} />
                        </Box>
                    </Box>

                    {/* Benefits List */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        {/* Benefit 1 */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                mt: 0.5
                            }}>
                                <CheckIcon sx={{ fontSize: '0.9rem', stroke: 'currentColor', strokeWidth: 1.5 }} />
                            </Box>
                            <Typography variant="body1" sx={{ color: 'text.primary', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                <strong>Regularización de adeudos y recargos causados</strong> hasta el ejercicio fiscal 2023.
                            </Typography>
                        </Box>

                        {/* Benefit 2 */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                mt: 0.5
                            }}>
                                <CheckIcon sx={{ fontSize: '0.9rem', stroke: 'currentColor', strokeWidth: 1.5 }} />
                            </Box>
                            <Typography variant="body1" sx={{ color: 'text.primary', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                <strong>Pago mediante tarifa especial</strong> que incluye los ejercicios fiscales 2024, 2025 y 2026, considerando todo el año para el último caso, de acuerdo con los servicios recibidos.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Full Width Bottom: Important Considerations */}
                <Grid size={12}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        backgroundColor: 'background.paper',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                        border: 1, borderColor: 'divider',
                        mt: 4,
                        mb: 2,
                        width: '100%'
                    }}>
                        {/* Left accent block with Warning icon */}
                        <Box sx={{
                            backgroundColor: 'warning.main', // Gold color matching the image
                            color: 'primary.contrastText',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: { xs: '100%', sm: '80px', md: '100px' },
                            py: { xs: 2, sm: 0 },
                            flexShrink: 0
                        }}>
                            <WarningIcon sx={{ fontSize: '2.5rem' }} />
                        </Box>

                        {/* Right details block */}
                        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.1rem', mb: 1, letterSpacing: '0.5px' }}>
                                CONSIDERACIONES IMPORTANTES
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                Los usuarios que gocen de cualquier otro beneficio, cualquiera que sea su denominación, no podrán acceder a los beneficios del presente Programa.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
