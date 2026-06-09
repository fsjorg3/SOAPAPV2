import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import img_gota_regularizacion from "../../assets/mascota/gota.webp";
import { Card, CardContent } from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EastIcon from '@mui/icons-material/East';

export default function HeroSection({ setOpenColoniasDialog }: { setOpenColoniasDialog: (v: boolean) => void }) {
    return (
        <Box sx={{ position: 'relatisve', pb: { xs: 4, md: 8 }, maxHeight: { md: '100vh' } }}>
            <Grid container spacing={{ xs: 3, md: 4 }} sx={{ alignItems: 'center', mb: { xs: "20px", md: "40px" }, mt: 2 }}>
                <Grid size={{ xs: 12, md: 6 }}
                    sx={{
                        display: 'flex', height: '100%', flexDirection: 'column',
                        justifyContent: 'center', alignItems: 'flex-start',
                        px: { xs: 2, sm: 4, md: 6 }
                    }}>

                    {/* Title */}
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: { xs: 'center', md: 'start' },
                            textAlign: { xs: 'center', md: 'left' },
                            mb: { xs: 4, md: 6 },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: '2rem', sm: '3.5rem', md: "4rem" },
                                color: "primary.main",
                                fontWeight: 300,
                                lineHeight: 1.1,
                                mb: 1
                            }}
                        >
                            PROGRAMA DE <br />
                            <Box component='span' sx={{ fontWeight: 900, color: 'primary.main' }}>REGULARIZACIÓN</Box>
                        </Typography>
                        <Box
                            sx={{
                                width: { xs: "80px", md: "120px" },
                                height: "6px",
                                backgroundColor: "secondary.main",
                                borderRadius: '3px'
                            }}
                        />
                    </Box>

                    {/* Info items */}
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5, alignItems: { xs: 'center', md: 'flex-start' } }}>
                        <Box sx={{
                            width: { xs: '100%', sm: '80%', md: '90%', lg: '85%' },
                            backgroundColor: 'secondary.main',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            borderRadius: '16px',
                            gap: { xs: 2, md: 3 },
                            p: { xs: 2, md: 2.5 },
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'translateX(8px)' }
                        }}>
                            <AccountCircleIcon sx={{ fontSize: { xs: '2.5rem', md: '3rem' }, color: 'secondary.contrastText' }} />
                            <Typography
                                sx={{
                                    textAlign: "left",
                                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                                    color: "primary.contrastText",
                                    fontWeight: 700,
                                    lineHeight: 1.3
                                }}
                            >
                                Para usuarios en situación vulnerable
                            </Typography>
                        </Box>
                        <Box sx={{
                            width: { xs: '100%', sm: '80%', md: '90%', lg: '85%' },
                            backgroundColor: 'secondary.main',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            borderRadius: '16px',
                            gap: { xs: 2, md: 3 },
                            p: { xs: 2, md: 2.5 },
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'translateX(8px)' }
                        }}>
                            <ArticleIcon sx={{ fontSize: { xs: '2.5rem', md: '3rem' }, color: 'secondary.contrastText' }} />
                            <Typography
                                sx={{
                                    textAlign: "left",
                                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                                    color: "primary.contrastText",
                                    fontWeight: 700,
                                    lineHeight: 1.3
                                }}
                            >
                                Contratación de servicios de carácter unifamiliar irregular.
                            </Typography>
                        </Box>
                        <Box sx={{
                            width: { xs: '100%', sm: '80%', md: '90%', lg: '85%' },
                            backgroundColor: 'secondary.main',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            borderRadius: '16px',
                            gap: { xs: 2, md: 3 },
                            p: { xs: 2, md: 2.5 },
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'translateX(8px)' }
                        }}>
                            <CalendarMonthIcon sx={{ fontSize: { xs: '2.5rem', md: '3rem' }, color: 'secondary.contrastText' }} />
                            <Typography
                                sx={{
                                    textAlign: "left",
                                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                                    color: "primary.contrastText",
                                    fontWeight: 700,
                                    lineHeight: 1.3
                                }}
                            >
                                Vigencia del 1 de 4 de Mayo al 31 de diciembre del 2026.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: { xs: 4, md: 0 }, px: { xs: 2, md: 0 } }}>
                    <Box component='img' src={img_gota_regularizacion}
                        sx={{
                            display: 'block',
                            width: { xs: '72%', sm: '54%', md: '67%' },
                            maxWidth: '495px',
                            height: 'auto',
                            transform: { xs: 'none', md: 'translateY(20px)', lg: 'translateY(50px)' },
                            filter: 'drop-shadow(0px 15px 25px rgba(0,0,0,0.15))'
                        }} />
                </Grid>

                <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 4 } }}>
                    <Card variant="outlined"
                        onClick={() => setOpenColoniasDialog(true)}
                        sx={{
                            width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
                            display: 'flex',
                            borderRadius: '16px',
                            borderColor: 'primary.main',
                            borderWidth: 2,
                            backgroundColor: 'primary.main',
                            color: "primary.contrastText",
                            cursor: 'pointer',
                            overflow: 'visible',
                            transition: 'all 0.3s ease-in-out',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                                backgroundColor: 'primary.dark',
                                borderColor: 'primary.dark',
                            }
                        }}>
                        <CardContent sx={{ padding: { xs: '12px', md: '16px' }, '&:last-child': { paddingBottom: { xs: '12px', md: '16px' } }, display: 'flex', flexGrow: 1 }}>
                            <Box sx={{
                                display: 'flex', flexDirection: { xs: 'row', sm: 'row' },
                                justifyContent: 'center', alignItems: 'center', flexGrow: 1, gap: { xs: 1.5, md: 2 }
                            }}>
                                <Box sx={{
                                    backgroundColor: 'secondary.main',
                                    borderRadius: '50%',
                                    padding: '8px',
                                    display: 'flex',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                }}>
                                    <MapIcon sx={{ fontSize: { xs: '1.8rem', md: '2rem' }, color: 'secondary.contrastText' }} />
                                </Box>

                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 800,
                                        color: 'primary.contrastText',
                                        textAlign: { xs: 'center', sm: 'left' },
                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                        lineHeight: 1.2,
                                        flex: 1
                                    }}>
                                    CONSULTA SI TU COLONIA PARTICIPA EN EL PROGRAMA
                                </Typography>

                                <EastIcon sx={{
                                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                                    fontWeight: '700',
                                    color: 'secondary.main',

                                }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Decorative bottom border */}
                <Grid size={12} sx={{ mt: { xs: 3, md: 4 }, px: { xs: 2, md: 6 } }}>
                    <Box sx={{ height: '8px', width: '100%', backgroundColor: 'primary.light', borderRadius: '4px' }} />
                </Grid>
            </Grid>
        </Box>
    );
}
