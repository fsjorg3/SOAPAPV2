import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import img_regularizacion_domestica from "../../assets/regularizacion_domestica/regularizar.webp";
import { Card, CardContent } from "@mui/material";
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
import BadgeIcon from '@mui/icons-material/Badge';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function HeroSection({ setOpenColoniasDialog }: { setOpenColoniasDialog: (v: boolean) => void }) {
    return (
        <>
            <Grid container spacing={2} sx={{ alignItems: 'center', marginBottom: { xs: "20px", md: "40px" } }}
                className='grid-padre-1'>
                <Grid size={{ xs: 12, md: 6 }}
                    sx={{
                        display: 'flex', height: '100%', flexDirection: 'column',
                        justifyContent: 'flex-start', alignItems: 'flex-start'
                    }}
                    className='grid-padre-2'>
                    <Box sx={{
                        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                        justifyContent: 'flex-start', alignItems: 'flex-start'
                    }} className='contenedor-1'>
                        <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
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
                                        fontSize: { xs: '38px', md: "60px" },
                                        color: "primary.main",
                                        borderBottom: "2px solid secondary.main",
                                    }}
                                >
                                    PROGRAMA DE <Box component='em' sx={{ fontWeight: "900", }}>REGULARIZACIÓN</Box>
                                </Typography>
                                <Box
                                    sx={{
                                        width: { xs: "50%", md: "45%" },
                                        height: "5px",
                                        backgroundColor: "secondary.main",
                                    }}
                                />

                            </Box>
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', gap: '20px' }}>
                            <Box sx={{
                                width: { xs: '100%', md: '75%' }, backgroundColor: 'secondary.main', display: 'flex',
                                justifyContent: 'center', alignItems: 'center', borderRadius: '20px',
                                gap: 3, p: 2
                            }}>
                                <AccountCircleIcon sx={{ fontSize: '7vh', color: 'secondary.contrastText' }} />
                                <Typography
                                    sx={{
                                        textAlign: "left",
                                        fontSize: "1rem",
                                        color: "primary.contrastText",
                                        borderBottom: "2px solid secondary.main",
                                        fontWeight: 800,
                                    }}
                                >
                                    Para usuarios en situación vulnerable
                                </Typography>
                            </Box>
                            <Box sx={{
                                width: { xs: '100%', md: '75%' }, backgroundColor: 'secondary.main', display: 'flex',
                                justifyContent: 'center', alignItems: 'center', borderRadius: '20px',
                                gap: 3, p: 2
                            }}>
                                <ArticleIcon sx={{ fontSize: '7vh', color: 'secondary.contrastText' }} />
                                <Typography
                                    sx={{
                                        textAlign: "left",
                                        fontSize: "1rem",
                                        color: "primary.contrastText",
                                        borderBottom: "2px solid secondary.main",
                                        fontWeight: 800,
                                    }}
                                >
                                    Contratación de servicios de carácter unifamiliar irregular.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 0 } }}>
                    <Box component='img' src={img_regularizacion_domestica} sx={{ display: 'block', width: { xs: '100%', md: '75%' }, maxWidth: '500px', height: 'auto' }} />
                </Grid>
                <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 0 } }}>
                    <Box
                        sx={{
                            width: '100%', display: 'flex', justifyContent: 'center',
                            flexDirection: { xs: 'column-reverse', md: 'row' }

                        }}>

                        <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', textAlign: 'center', padding: 3, gap: 2, flexWrap: { xs: 'wrap', md: 'nowrap' }, justifyContent: 'center', alignItems: 'stretch' }}>
                            <Card variant="outlined" sx={{ width: { xs: '100%', md: '33%' }, display: 'flex', flexDirection: 'column', border: 2, borderColor: 'primary.light' }}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: '100%' }}>
                                        <InsertPageBreakIcon
                                            sx={{
                                                fontSize: '7vh', color: 'primary.contrastText',
                                                backgroundColor: 'primary.main', padding: '10px', borderRadius: '35%'
                                            }} />
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', marginTop: '20px', color: 'primary.main' }}>
                                            SIN SOLICITUD POR ESCRITO
                                        </Typography>
                                        <Box sx={{ marginTop: 'auto', pt: 1, width: { xs: '50%' }, height: '5px', backgroundColor: 'secondary.main' }}></Box>
                                    </Box>
                                </CardContent>
                            </Card>
                            <Card variant="outlined" sx={{ width: { xs: '100%', md: '33%' }, display: 'flex', flexDirection: 'column', border: 2, borderColor: 'primary.light' }}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: '100%' }}>
                                        <PointOfSaleIcon
                                            sx={{
                                                fontSize: '7vh', color: 'secondary.contrastText',
                                                backgroundColor: 'primary.main', padding: '10px', borderRadius: '35%'
                                            }} />
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', marginTop: '20px', color: 'primary.main' }}>
                                            PAGO ÚNICO
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontSize: '0.7rem' }}>
                                            EN UNA SOLA EXHIBICIÓN
                                        </Typography>
                                        <Box
                                            sx={{
                                                marginTop: 'auto', pt: 1, width: { xs: '50%' },
                                                height: '5px', backgroundColor: 'secondary.main'
                                            }} />
                                    </Box>
                                </CardContent>
                            </Card>
                            <Card variant="outlined" sx={{ width: { xs: '100%', md: '33%' }, display: 'flex', flexDirection: 'column', border: 2, borderColor: 'primary.light' }}>
                                <CardContent sx={{ paddingBottom: 0, paddingInline: 0, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <Box sx={{
                                        paddingBottom: 0, paddingInline: 0, display: 'flex', flexDirection: 'column',
                                        justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: '100%'
                                    }}>
                                        <BadgeIcon
                                            sx={{
                                                fontSize: '7vh', color: 'primary.contrastText',
                                                backgroundColor: 'primary.main', padding: '10px', borderRadius: '35%'
                                            }} />
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', marginTop: '20px', color: 'primary.main' }}>
                                            TRAMITE CON NIS
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontSize: '0.7rem' }}>
                                            PRESENTA ÚNICAMENTE TU NÚMERO DE IDENTIFICACIÓN DE SERVICIO
                                        </Typography>
                                        <Box
                                            sx={{
                                                marginTop: 'auto', pt: 1, width: { xs: '50%' },
                                                height: '5px', backgroundColor: 'secondary.main',
                                                alignItems: 'flex-end', justifyItems: 'flex-end'
                                            }} />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', textAlign: 'center', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'stretch', gap: 3 }}>
                            <Card
                                variant="outlined"
                                onClick={() => setOpenColoniasDialog(true)}
                                sx={{
                                    width: { xs: '100%', md: '45%' },
                                    height: { xs: 'auto', md: '50%' },
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                                        borderColor: 'primary.main'
                                    }
                                }}
                            >
                                <CardContent sx={{ padding: 0 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <MapIcon sx={{ fontSize: '7vh', color: 'primary.contrastText', backgroundColor: 'primary.main', padding: '10px', borderRadius: '50%' }} />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500, marginTop: '20px',
                                                color: 'primary.main', textAlign: 'left',
                                                paddingLeft: '5px',
                                                fontSize: '0.875rem'
                                            }}>
                                            CONSULTA SI TU COLONIA PARTICIPA EN EL PROGRAMA
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                            <Card variant="outlined" sx={{ width: { xs: '100%', md: '45%' }, height: { xs: 'auto', md: '50%' }, justifyContent: 'center', alignContent: 'center' }} >
                                <CardContent sx={{ padding: 0 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <CalendarMonthIcon sx={{ fontSize: '7vh', color: 'primary.contrastText', backgroundColor: 'primary.main', padding: '10px', borderRadius: '50%' }} />
                                        <Box>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontWeight: 500, marginTop: '20px',
                                                    color: 'primary.main', textAlign: 'left',
                                                    paddingLeft: '5px',
                                                }}>
                                                VIGENCIA:

                                            </Typography>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontWeight: 400, marginTop: '20px',
                                                    color: 'primary.main', textAlign: 'left',
                                                    paddingLeft: '5px',
                                                }}>

                                                Del 4 de mayo al 31 de diciembre de 2026
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>

                        </Box>

                    </Box>
                </Grid>
                <Grid size={12} sx={{ border: 4, borderColor: 'primary.light' }}></Grid>
            </Grid>
        </>
    );
}
