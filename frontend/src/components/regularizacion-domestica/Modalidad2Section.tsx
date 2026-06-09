import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import img_contratacion_unifamiliar from "../../assets/regularizacion_domestica/contratacion_unifamiliar.webp";

export default function Modalidad2Section() {
    return (
        <>
            {/* ========================================================================= */}
            {/* SECTION: CONTRATACIÓN DE SERVICIOS DE CARÁCTER UNIFAMILIAR IRREGULAR (MODALIDAD 2) */}
            {/* ========================================================================= */}
            <Grid container spacing={4} sx={{ mt: 8, mb: 6 }}>
                {/* Header row */}
                <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Box sx={{
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        px: 2,
                        py: 0.5,
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        mb: 2
                    }}>
                        Modalidad 2
                    </Box>
                    <Typography sx={{ color: 'info.main', fontWeight: '900', fontSize: { xs: "28px", md: "40px" }, textTransform: 'uppercase', mb: 1, lineHeight: 1.15 }}>
                        Contratación de Servicios de Carácter Unifamiliar Irregular
                    </Typography>
                    <Box sx={{ width: '60px', height: '4px', backgroundColor: 'primary.main', mb: 3 }} />
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.6 }}>
                        Regularización y contratación de servicios hídricos para usuarios que actualmente no se encuentran registrados en el padrón de usuarios.
                    </Typography>
                </Grid>

                {/* Right Illustration */}
                <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box component="img" src={img_contratacion_unifamiliar} alt="Contratación de Servicios"
                        sx={{
                            width: '100%',
                            maxWidth: '380px',
                            height: 'auto',
                            objectFit: 'contain',
                            borderRadius: '12px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                        }}
                    />
                </Grid>

                {/* Left Card: ¿Quiénes pueden acceder? */}
                <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 2 }}>
                    <Card variant="outlined" sx={{
                        p: 4,
                        height: '100%',
                        borderRadius: '12px',
                        border: 1, borderColor: 'divider',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <Box sx={{
                            backgroundColor: 'info.main',
                            color: 'primary.contrastText',
                            borderRadius: '8px',
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3
                        }}>
                            <HomeIcon sx={{ fontSize: '1.8rem' }} />
                        </Box>
                        <Typography sx={{ color: 'info.main', fontWeight: 'bold', fontSize: '1.25rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            ¿Quiénes pueden acceder?
                        </Typography>
                        <Box sx={{ width: '40px', height: '2px', backgroundColor: 'divider', mb: 3 }} />

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <PeopleIcon sx={{ color: 'info.main', fontSize: '2rem', flexShrink: 0, mt: 0.5 }} />
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                Usuarios que actualmente reciben servicios de agua potable, drenaje y saneamiento y que no se encuentran registrados en el padrón de usuarios.
                            </Typography>
                        </Box>
                    </Card>
                </Grid>

                {/* Right Card: Beneficio del Programa */}
                <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 2 }}>
                    <Card variant="outlined" sx={{
                        p: 4,
                        height: '100%',
                        borderRadius: '12px',
                        border: 1, borderColor: 'divider',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            borderRadius: '8px',
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3
                        }}>
                            <StarIcon sx={{ fontSize: '1.8rem' }} />
                        </Box>
                        <Typography sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.25rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Beneficio del Programa
                        </Typography>
                        <Box sx={{ width: '40px', height: '2px', backgroundColor: 'divider', mb: 3 }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            {/* Benefit 1 */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <Box sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    mt: 0.5
                                }}>
                                    <CheckIcon sx={{ fontSize: '0.8rem', stroke: 'currentColor', strokeWidth: 1.5 }} />
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    Regularización de adeudos.
                                </Typography>
                            </Box>

                            {/* Benefit 2 */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <Box sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    mt: 0.5
                                }}>
                                    <CheckIcon sx={{ fontSize: '0.8rem', stroke: 'currentColor', strokeWidth: 1.5 }} />
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    Contratación del suministro de los Servicios Hídricos mediante el pago de una tarifa especial.
                                </Typography>
                            </Box>
                        </Box>

                        {/* Faint droplet watermark */}
                        <Box sx={{
                            position: 'absolute',
                            bottom: -10,
                            right: 10,
                            opacity: 0.04,
                            color: 'primary.main',
                            transform: 'scale(4.5) rotate(15deg)',
                            pointerEvents: 'none'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                            </svg>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
