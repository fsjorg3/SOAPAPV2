import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import DevicesIcon from '@mui/icons-material/Devices';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

export default function ComoAccederSection() {
    return (
        <>
            {/* ========================================================================= */}
            {/* SECTION: ¿CÓMO ACCEDER AL BENEFICIO? */}
            {/* ========================================================================= */}
            <Grid container spacing={4} sx={{ mt: 6, mb: 6 }}>
                <Grid size={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                        <PersonIcon sx={{ color: 'primary.main', fontSize: '2.5rem', mt: 0.5 }} />
                        <Box>
                            <Typography sx={{ color: 'primary.main', fontWeight: '900', fontSize: { xs: "28px", md: "40px" }, textTransform: 'uppercase', lineHeight: 1.1 }}>
                                ¿CÓMO ACCEDER AL BENEFICIO?
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, fontSize: '1.05rem' }}>
                                Sigue estos pasos para gozar de los beneficios del Programa:
                            </Typography>
                            <Box sx={{ width: '60px', height: '4px', backgroundColor: 'primary.main', mt: 2 }} />
                        </Box>
                    </Box>
                </Grid>

                {/* Step 1: Realiza tu pago */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{ position: 'relative', height: '100%', pt: 2 }}>
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 20,
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            fontWeight: 'bold',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                        }}>
                            1
                        </Box>
                        <Card variant="outlined" sx={{
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            borderRadius: '12px',
                            border: 1, borderColor: 'divider',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.04)'
                            }
                        }}>
                            <Box sx={{ color: 'info.main', mb: 3, mt: 1 }}>
                                <PaymentsOutlinedIcon sx={{ fontSize: '3rem' }} />
                            </Box>
                            <Typography sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1.5, fontSize: '0.95rem', letterSpacing: '0.5px' }}>
                                REALIZA TU PAGO
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.85rem' }}>
                                Realiza el pago correspondiente a la tarifa especial en una sola exhibición.
                            </Typography>
                        </Card>
                    </Box>
                </Grid>

                {/* Step 2: Elige tu modalidad */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{ position: 'relative', height: '100%', pt: 2 }}>
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 20,
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            fontWeight: 'bold',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                        }}>
                            2
                        </Box>
                        <Card variant="outlined" sx={{
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            borderRadius: '12px',
                            border: 1, borderColor: 'divider',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.04)'
                            }
                        }}>
                            <Box sx={{ color: 'info.main', mb: 3, mt: 1 }}>
                                <DevicesIcon sx={{ fontSize: '3rem' }} />
                            </Box>
                            <Typography sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1.5, fontSize: '0.95rem', letterSpacing: '0.5px' }}>
                                ELIGE TU MODALIDAD
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.85rem' }}>
                                Realiza tu pago a través del portal de pagos en línea o en los módulos de atención del Prestador de Servicios.
                            </Typography>
                        </Card>
                    </Box>
                </Grid>

                {/* Step 3: Presenta tu NIS */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{ position: 'relative', height: '100%', pt: 2 }}>
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 20,
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            fontWeight: 'bold',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                        }}>
                            3
                        </Box>
                        <Card variant="outlined" sx={{
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            borderRadius: '12px',
                            border: 1, borderColor: 'divider',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.04)'
                            }
                        }}>
                            <Box sx={{ color: 'info.main', mb: 3, mt: 1 }}>
                                <BadgeIcon sx={{ fontSize: '3rem' }} />
                            </Box>
                            <Typography sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1.5, fontSize: '0.95rem', letterSpacing: '0.5px' }}>
                                PRESENTA TU NIS
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.85rem' }}>
                                Si acudes a los módulos de atención, únicamente deberás proporcionar tu Número de Identificación de Servicio (NIS).
                            </Typography>
                        </Card>
                    </Box>
                </Grid>

                {/* Step 4: Sin solicitud por escrito */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{ position: 'relative', height: '100%', pt: 2 }}>
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 20,
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            fontWeight: 'bold',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                        }}>
                            4
                        </Box>
                        <Card variant="outlined" sx={{
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            borderRadius: '12px',
                            border: 1, borderColor: 'divider',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.04)'
                            }
                        }}>
                            <Box sx={{ color: 'info.main', mb: 3, mt: 1 }}>
                                <DescriptionOutlinedIcon sx={{ fontSize: '3rem' }} />
                            </Box>
                            <Typography sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1.5, fontSize: '0.95rem', letterSpacing: '0.5px' }}>
                                SIN SOLICITUD POR ESCRITO
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.85rem' }}>
                                No será necesario que presentes solicitud por escrito para gozar de los beneficios del Programa.
                            </Typography>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
