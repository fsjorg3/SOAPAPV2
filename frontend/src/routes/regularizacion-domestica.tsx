import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import ColoniasDialog from "../components/colonias-dialog";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import img_regularizacion_domestica from "../assets/regularizacion_domestica/regularizar.webp";
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
import PaymentIcon from '@mui/icons-material/Payment';
import BadgeIcon from '@mui/icons-material/Badge';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import DevicesIcon from '@mui/icons-material/Devices';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BalanceIcon from '@mui/icons-material/Balance';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import img_contratacion_unifamiliar from "../assets/regularizacion_domestica/contratacion_unifamiliar.webp";
import pipeImg from "../assets/pipe.png";
import gota from '/assets/regularizate_2026/gota.png';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BlockIcon from '@mui/icons-material/Block';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import StarsIcon from '@mui/icons-material/Stars';
import DescriptionIcon from '@mui/icons-material/Description';
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';

export default function RegularizacionDomestica() {
    const [openColoniasDialog, setOpenColoniasDialog] = useState(false);

    return (<>
        <Container maxWidth='lg'>

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
                            <Card variant="outlined" sx={{ width: { xs: '100%', md: '33%' }, display: 'flex', flexDirection: 'column', border: '2px solid #5B132B' }}>
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
                            <Card variant="outlined" sx={{ width: { xs: '100%', md: '33%' }, display: 'flex', flexDirection: 'column', border: '2px solid #5B132B' }}>
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
                            <Card variant="outlined" sx={{ width: { xs: '100%', md: '33%' }, display: 'flex', flexDirection: 'column', border: '2px solid #5B132B' }}>
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

                                                01 de Agosto a 31 de Octubre de 2026
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>

                        </Box>

                    </Box>
                </Grid>
                <Grid size={12} sx={{ border: '4px solid #5B132B' }}></Grid>
            </Grid>
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
                            color: '#ffffff',
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
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                mt: 0.5
                            }}>
                                <CheckIcon sx={{ fontSize: '0.9rem', stroke: 'white', strokeWidth: 1.5 }} />
                            </Box>
                            <Typography variant="body1" sx={{ color: 'text.primary', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                <strong>Regularización de adeudos y recargos causados</strong> hasta el ejercicio fiscal 2023.
                            </Typography>
                        </Box>

                        {/* Benefit 2 */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Box sx={{
                                backgroundColor: 'primary.main',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                mt: 0.5
                            }}>
                                <CheckIcon sx={{ fontSize: '0.9rem', stroke: 'white', strokeWidth: 1.5 }} />
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
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        mt: 4,
                        mb: 2,
                        width: '100%'
                    }}>
                        {/* Left accent block with Warning icon */}
                        <Box sx={{
                            backgroundColor: '#D58B29', // Gold color matching the image
                            color: '#ffffff',
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
                            color: '#ffffff',
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
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.04)'
                            }
                        }}>
                            <Box sx={{ color: '#1E50A2', mb: 3, mt: 1 }}>
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
                            color: '#ffffff',
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
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.04)'
                            }
                        }}>
                            <Box sx={{ color: '#1E50A2', mb: 3, mt: 1 }}>
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
                            color: '#ffffff',
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
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.04)'
                            }
                        }}>
                            <Box sx={{ color: '#1E50A2', mb: 3, mt: 1 }}>
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
                            color: '#ffffff',
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
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.04)'
                            }
                        }}>
                            <Box sx={{ color: '#1E50A2', mb: 3, mt: 1 }}>
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


            {/* ========================================================================= */}
            {/* SECTION: PAGO ÚNICO POR SERVICIOS (TABLA) */}
            {/* ========================================================================= */}
            <Grid container spacing={3} sx={{ mt: 4, mb: 6, alignItems: "center" }}>
                <Grid size={12}>
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: { xs: "24px", md: "34px" },
                            fontWeight: "900",
                            color: "#1E50A2",
                            textTransform: "uppercase",
                            mb: 4
                        }}
                    >
                        PAGO ÚNICO POR SERVICIOS
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, lg: 8 }} sx={{ pt: '50px' }}>
                    <TableContainer component={Paper} variant="outlined" sx={{
                        borderRadius: '12px',
                        overflowX: 'auto',
                        borderColor: 'rgba(0, 0, 0, 0.08)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                        mb: 2
                    }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.main' } }}>
                                    <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1rem', py: 2.5 }}>
                                        Año
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.95rem', py: 2.5, maxWidth: '220px', lineHeight: 1.3 }}>
                                        Pago Único por Tres Servicios (Agua, Drenaje y Saneamiento)
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.95rem', py: 2.5, maxWidth: '220px', lineHeight: 1.3 }}>
                                        Pago Único por Dos Servicios (Drenaje y Saneamiento)
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.95rem', py: 2.5, maxWidth: '220px', lineHeight: 1.3 }}>
                                        Pago Único por un Servicio (Agua)
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Row 2024 */}
                                <TableRow sx={{ backgroundColor: '#ffffff', '&:hover': { backgroundColor: 'rgba(0,0,0,0.01)' } }}>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1rem', borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                        2024
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem', borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                        $1,650.00
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem', borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                        $693.00
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem' }}>
                                        $957.00
                                    </TableCell>
                                </TableRow>

                                {/* Row 2025 */}
                                <TableRow sx={{ backgroundColor: '#ffffff', '&:hover': { backgroundColor: 'rgba(0,0,0,0.01)' } }}>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1rem', borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                        2025
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem', borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                        $2,400.00
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem', borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                        $972.00
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem' }}>
                                        $1,428.00
                                    </TableCell>
                                </TableRow>

                                {/* Row 2026 */}
                                <TableRow sx={{ backgroundColor: '#ffffff', '&:hover': { backgroundColor: 'rgba(0,0,0,0.01)' } }}>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1rem', borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                        2026
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem', borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                        $2,500.00
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem', borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                        $1,000.00
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem' }}>
                                        $1,490.00
                                    </TableCell>
                                </TableRow>

                                {/* Total Row */}
                                <TableRow sx={{

                                    borderTop: '2px solid #D58B29',
                                    borderBottom: '2px solid #D58B29',
                                    backgroundColor: 'secondary.main',
                                    color: 'secondary.contrastText',

                                }}>
                                    <TableCell align="center" sx={{
                                        fontWeight: '900',
                                        fontSize: '1.05rem', borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                                        borderTop: '2px solid #D58B29',
                                        borderBottom: '2px solid #D58B29',
                                        backgroundColor: 'secondary.light',
                                        color: 'secondary.contrastText',

                                    }}>
                                        Total
                                    </TableCell>
                                    <TableCell align="center" sx={{
                                        fontWeight: '900',
                                        fontSize: '1.05rem', borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                                        borderTop: '2px solid #D58B29',
                                        borderBottom: '2px solid #D58B29',
                                        backgroundColor: 'secondary.light',
                                        color: 'secondary.contrastText',
                                    }}>
                                        $6,550.00
                                    </TableCell>
                                    <TableCell align="center" sx={{
                                        fontWeight: '900',
                                        fontSize: '1.05rem', borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                                        borderTop: '2px solid #D58B29',
                                        borderBottom: '2px solid #D58B29',
                                        backgroundColor: 'secondary.light',
                                        color: 'secondary.contrastText',
                                    }}>
                                        $2,665.00
                                    </TableCell>
                                    <TableCell align="center" sx={{
                                        fontWeight: '900',
                                        fontSize: '1.05rem', borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                                        borderTop: '2px solid #D58B29',
                                        borderBottom: '2px solid #D58B29',
                                        backgroundColor: 'secondary.light',
                                        color: 'secondary.contrastText',
                                    }}>
                                        $3,875.00
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: { md: '-25px' } }}>
                    <Box component="img" src="/assets/regularizate_2026/gota2.png" alt="gota explicativa" sx={{ width: '90%', maxWidth: '250px', mb: '-2rem', zIndex: 1, filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.1))' }} />
                    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: '3rem 2rem 2rem', borderRadius: '15px', width: '100%', boxShadow: '0 10px 20px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                        <Box>
                            <Typography sx={{ color: 'secondary.main', fontSize: '1rem', mb: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold' }}>PUNTOS DE ATENCIÓN</Typography>
                            <Box component="a" href="/contacto" sx={{ display: 'block', textDecoration: 'none', color: 'white', fontSize: '1.1rem', fontWeight: 'bold', mb: '0.5rem' }}>Oficinas de SOAPAP</Box>
                            <Box component="a" href="https://www.aguapuebla.mx/lugares-de-pago-y-centros-de-atencion/" target="_blank" rel="noreferrer" sx={{ display: 'block', textDecoration: 'none', color: 'white', fontSize: '1.1rem', fontWeight: 'bold' }}>Agua De Puebla</Box>
                        </Box>
                        <Box>
                            <Typography sx={{ color: 'secondary.main', fontSize: '1rem', mb: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold' }}>OPCIONES DE PAGO</Typography>
                            <Typography sx={{ display: 'block', color: 'white', fontSize: '1.1rem', fontWeight: 'bold', mb: '0.5rem' }}>Ventanilla</Typography>
                            <Box component="a" href="https://www.aguapuebla.mx/donde-pagar/" target="_blank" rel="noreferrer" sx={{ display: 'block', textDecoration: 'none', color: 'white', fontSize: '1.1rem', fontWeight: 'bold' }}>Plataforma digital</Box>
                        </Box>
                        <Box>
                            <Typography sx={{ color: 'secondary.main', fontSize: '1rem', mb: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold' }}>REQUISITOS</Typography>
                            <Typography sx={{ display: 'block', color: 'white', fontSize: '1.1rem', fontWeight: 'bold' }}>NIS</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {/* ========================================================================= */}
            {/* SECTION: CONSIDERACIONES IMPORTANTES & USUARIOS EXCEPTUADOS */}
            {/* ========================================================================= */}
            <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
                <Grid size={12}>
                    <Typography sx={{ color: 'primary.main', fontWeight: '900', fontSize: '24px', textTransform: 'uppercase', mb: 1 }}>
                        CONSIDERACIONES IMPORTANTES
                    </Typography>
                    <Box sx={{ width: '100%', height: '3px', backgroundColor: 'primary.main', mb: 3 }} />
                </Grid>

                {/* Card 1: Non-compliance */}
                <Grid size={12}>
                    <Card variant="outlined" sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        p: 3,
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                        gap: 3
                    }}>
                        {/* Left Badge: Warning Sign */}
                        <Box sx={{
                            backgroundColor: 'primary.main',
                            color: '#ffffff',
                            borderRadius: '10px',
                            width: '56px',
                            height: '56px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <WarningIcon sx={{ fontSize: '2rem' }} />
                        </Box>

                        {/* Center Text */}
                        <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.95rem', lineHeight: 1.6, flexGrow: 1 }}>
                            En el supuesto de que los usuarios no presenten o no cumplan con alguno de los requisitos establecidos en el Programa o no encuadren en las diferentes condiciones para considerarse sujetos del presente Acuerdo, no podrán gozar de los beneficios antes mencionados.
                        </Typography>

                        {/* Right Icon: Clipboard/document late */}
                        <Box sx={{ color: '#B8822A', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                            <AssignmentLateIcon sx={{ fontSize: '2.5rem' }} />
                        </Box>
                    </Card>
                </Grid>

                {/* Card 2: Retroactivity */}
                <Grid size={12}>
                    <Card variant="outlined" sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        p: 3,
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                        gap: 3
                    }}>
                        {/* Left Badge: Document with Dollar Sign */}
                        <Box sx={{
                            backgroundColor: '#1E50A2',
                            color: '#ffffff',
                            borderRadius: '10px',
                            width: '56px',
                            height: '56px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="12" y1="18" x2="12" y2="12" />
                                <path d="M10 14h3a1 1 0 0 0 0-2h-2a1 1 0 0 1 0-2h3" />
                            </svg>
                        </Box>

                        {/* Center Text */}
                        <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.95rem', lineHeight: 1.6, flexGrow: 1 }}>
                            El presente Programa no tendrá efectos retroactivos, ni dará lugar a devolución o compensación alguna, por pagos realizados con anterioridad a la entrada en vigor del presente Acuerdo.
                        </Typography>

                        {/* Right Icon: Credit Card */}
                        <Box sx={{ color: '#B8822A', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                            <CreditCardIcon sx={{ fontSize: '2.5rem' }} />
                        </Box>
                    </Card>
                </Grid>
            </Grid>



            {/* ========================================================================= */}
            {/* SECTION: CONTRATACIÓN DE SERVICIOS DE CARÁCTER UNIFAMILIAR IRREGULAR (MODALIDAD 2) */}
            {/* ========================================================================= */}
            <Grid container spacing={4} sx={{ mt: 8, mb: 6 }}>
                {/* Header row */}
                <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Box sx={{
                        backgroundColor: 'primary.main',
                        color: '#ffffff',
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
                    <Typography sx={{ color: '#1E50A2', fontWeight: '900', fontSize: { xs: "28px", md: "40px" }, textTransform: 'uppercase', mb: 1, lineHeight: 1.15 }}>
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
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <Box sx={{
                            backgroundColor: '#1E50A2',
                            color: '#ffffff',
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
                        <Typography sx={{ color: '#1E50A2', fontWeight: 'bold', fontSize: '1.25rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            ¿Quiénes pueden acceder?
                        </Typography>
                        <Box sx={{ width: '40px', height: '2px', backgroundColor: 'rgba(0,0,0,0.1)', mb: 3 }} />

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <PeopleIcon sx={{ color: '#1E50A2', fontSize: '2rem', flexShrink: 0, mt: 0.5 }} />
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
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{
                            backgroundColor: 'primary.main',
                            color: '#ffffff',
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
                        <Box sx={{ width: '40px', height: '2px', backgroundColor: 'rgba(0,0,0,0.1)', mb: 3 }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            {/* Benefit 1 */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <Box sx={{
                                    backgroundColor: 'primary.main',
                                    color: '#ffffff',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    mt: 0.5
                                }}>
                                    <CheckIcon sx={{ fontSize: '0.8rem', stroke: 'white', strokeWidth: 1.5 }} />
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    Regularización de adeudos.
                                </Typography>
                            </Box>

                            {/* Benefit 2 */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <Box sx={{
                                    backgroundColor: 'primary.main',
                                    color: '#ffffff',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    mt: 0.5
                                }}>
                                    <CheckIcon sx={{ fontSize: '0.8rem', stroke: 'white', strokeWidth: 1.5 }} />
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

            {/* ========================================================================= */}
            {/* SECTION: COSTO DE CONTRATACIÓN */}
            {/* ========================================================================= */}
            <Grid container spacing={4} sx={{ mt: 8, mb: 6 }}>
                <Grid size={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                        <Box sx={{
                            backgroundColor: 'primary.main',
                            color: '#ffffff',
                            borderRadius: '6px',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '900',
                            fontSize: '1.3rem',
                            flexShrink: 0
                        }}>
                            $
                        </Box>
                        <Typography sx={{ color: 'text.primary', fontWeight: '900', fontSize: { xs: "24px", md: "32px" }, textTransform: 'uppercase' }}>
                            COSTO DE CONTRATACIÓN
                        </Typography>
                    </Box>
                    <Box sx={{ width: '80px', height: '4px', backgroundColor: 'primary.main', mt: 1, mb: 2 }} />
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1rem', mb: 2 }}>
                        Los costos varían según el estrato en el que se ubique el usuario y el tipo de servicio que se contrate.
                    </Typography>
                </Grid>

                {/* Column 1: Prestación Conjunta */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <TableContainer component={Paper} variant="outlined" sx={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        borderColor: 'rgba(0, 0, 0, 0.08)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                        height: '100%'
                    }}>
                        <Box sx={{
                            backgroundColor: '#1E50A2',
                            color: '#ffffff',
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            <Box sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#1E50A2',
                                flexShrink: 0
                            }}>
                                <WaterDropIcon sx={{ fontSize: '1.2rem' }} />
                            </Box>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
                                PRESTACIÓN CONJUNTA DE AGUA Y DRENAJE
                            </Typography>
                        </Box>

                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.main' } }}>
                                    <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.8rem', py: 1.5, textTransform: 'uppercase' }}>
                                        Estrato
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.8rem', py: 1.5, textTransform: 'uppercase' }}>
                                        Costo del Contrato
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{ backgroundColor: '#ffffff', '&:hover': { backgroundColor: 'rgba(0,0,0,0.01)' } }}>
                                    <TableCell align="center" sx={{ py: 2, borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, color: '#1E50A2' }}>
                                            <PeopleIcon sx={{ fontSize: '1.4rem' }} />
                                            <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>1, 2 y 3</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" sx={{ py: 2 }}>
                                        <Typography sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1.2rem' }}>
                                            $2,572.00
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ backgroundColor: '#ffffff', '&:hover': { backgroundColor: 'rgba(0,0,0,0.01)' } }}>
                                    <TableCell align="center" sx={{ py: 2, borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, color: '#1E50A2' }}>
                                            <PersonIcon sx={{ fontSize: '1.4rem' }} />
                                            <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>4</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" sx={{ py: 2 }}>
                                        <Typography sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1.2rem' }}>
                                            $3,656.00
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ backgroundColor: '#ffffff', '&:hover': { backgroundColor: 'rgba(0,0,0,0.01)' } }}>
                                    <TableCell align="center" sx={{ py: 2, borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, color: '#1E50A2' }}>
                                            <PeopleIcon sx={{ fontSize: '1.4rem' }} />
                                            <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>5 y 6</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" sx={{ py: 2 }}>
                                        <Typography sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1.2rem' }}>
                                            $4,236.00
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Column 2: Prestación de un Solo Servicio */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                        <TableContainer component={Paper} variant="outlined" sx={{
                            borderRadius: '12px',
                            overflow: 'hidden',
                            borderColor: 'rgba(0, 0, 0, 0.08)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                        }}>
                            <Box sx={{
                                backgroundColor: '#1E50A2',
                                color: '#ffffff',
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            }}>
                                <Box sx={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#1E50A2',
                                    flexShrink: 0
                                }}>
                                    <WaterDropIcon sx={{ fontSize: '1.2rem' }} />
                                </Box>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
                                    PRESTACIÓN DE UN SOLO SERVICIO (AGUA O DRENAJE)
                                </Typography>
                            </Box>

                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.main' } }}>
                                        <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.8rem', py: 1.5, textTransform: 'uppercase' }}>
                                            Estrato
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.8rem', py: 1.5, textTransform: 'uppercase' }}>
                                            Costo del Contrato
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow sx={{ backgroundColor: '#ffffff', '&:hover': { backgroundColor: 'rgba(0,0,0,0.01)' } }}>
                                        <TableCell align="center" sx={{ py: 2, borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, color: '#1E50A2' }}>
                                                <PeopleIcon sx={{ fontSize: '1.4rem' }} />
                                                <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>1, 2 y 3</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ py: 2 }}>
                                            <Typography sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1.2rem' }}>
                                                $1,371.00
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Info Card Note */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#EAF2FD',
                            border: '1px solid #C9DDF8',
                            borderRadius: '8px',
                            p: 2,
                            gap: 2,
                            flexGrow: 1
                        }}>
                            <InfoIcon sx={{ color: '#1E50A2', fontSize: '2rem', flexShrink: 0 }} />
                            <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                Para poder gozar de los beneficios referidos en este apartado los usuarios deberán realizar el pago anual del ejercicio fiscal 2026.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* ========================================================================= */}
            {/* SECTION: VIGENCIA */}
            {/* ========================================================================= */}
            <Grid container spacing={3} sx={{ mt: 2, mb: 6 }}>
                <Grid size={12}>
                    <Typography sx={{ color: '#1E50A2', fontWeight: '900', fontSize: '24px', textTransform: 'uppercase', mb: 1 }}>
                        VIGENCIA
                    </Typography>
                    <Box sx={{ width: '40px', height: '4px', backgroundColor: '#1E50A2', mb: 3 }} />
                </Grid>

                <Grid size={12}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        gap: 4
                    }}>
                        {/* Calendar Illustration */}
                        <Box sx={{
                            width: '100px',
                            height: '100px',
                            position: 'relative',
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            border: '2px solid #E6E8EA',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'visible',
                            flexShrink: 0
                        }}>
                            {/* Blue Header */}
                            <Box sx={{
                                backgroundColor: '#1E50A2',
                                height: '24px',
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                px: 2
                            }}>
                                {/* Binder Rings */}
                                <Box sx={{ width: '8px', height: '14px', backgroundColor: '#F8F9FB', borderRadius: '4px', position: 'absolute', top: '-6px', left: '20px', border: '1px solid #A7ADB3' }} />
                                <Box sx={{ width: '8px', height: '14px', backgroundColor: '#F8F9FB', borderRadius: '4px', position: 'absolute', top: '-6px', right: '20px', border: '1px solid #A7ADB3' }} />
                            </Box>

                            {/* Calendar Grid Days */}
                            <Box sx={{
                                p: 1.5,
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '6px',
                                flexGrow: 1,
                                alignContent: 'center'
                            }}>
                                {[...Array(8)].map((_, i) => (
                                    <Box key={i} sx={{ width: '12px', height: '8px', backgroundColor: '#E6E8EA', borderRadius: '2px' }} />
                                ))}
                            </Box>

                            {/* Checkmark Badge */}
                            <Box sx={{
                                position: 'absolute',
                                bottom: '-10px',
                                right: '-10px',
                                width: '32px',
                                height: '32px',
                                backgroundColor: 'primary.main',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                boxShadow: '0 2px 8px rgba(61, 0, 23, 0.3)',
                                border: '2px solid #ffffff'
                            }}>
                                <CheckIcon sx={{ fontSize: '1rem', stroke: 'white', strokeWidth: 1.5 }} />
                            </Box>
                        </Box>

                        {/* Text Box */}
                        <Box sx={{
                            backgroundColor: '#F1F3F5',
                            borderRadius: '12px',
                            p: 3,
                            flexGrow: 1,
                            border: '1px solid rgba(0, 0, 0, 0.03)',
                            width: '100%'
                        }}>
                            <Typography variant="body1" sx={{ color: 'text.primary', fontSize: '1rem', mb: 1, fontWeight: '500' }}>
                                Los presentes beneficios estarán vigentes a partir del
                            </Typography>
                            <Typography sx={{ color: 'primary.main', fontWeight: '900', fontSize: '1.25rem', mb: 1 }}>
                                4 de mayo de 2026
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.primary', fontSize: '1rem', mb: 1, fontWeight: '500' }}>
                                y hasta el
                            </Typography>
                            <Typography sx={{ color: '#1E50A2', fontWeight: '900', fontSize: '1.25rem' }}>
                                31 de diciembre de 2026.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* ========================================================================= */}
            {/* SECTION: USUARIOS EXCEPTUADOS */}
            {/* ========================================================================= */}
            <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
                <Grid size={12}>
                    <Box sx={{
                        backgroundColor: 'primary.main',
                        color: '#ffffff',
                        p: 1.5,
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1.5,
                        mb: 3
                    }}>
                        <BlockIcon sx={{ fontSize: '1.6rem' }} />
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            USUARIOS EXCEPTUADOS
                        </Typography>
                    </Box>
                </Grid>

                {/* Grid of 8 cards */}
                {/* Card 1: Suministros pecuarios */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card variant="outlined" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: '#FBEBEF',
                                borderRadius: '8px',
                                width: '44px',
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AgricultureIcon sx={{ fontSize: '1.6rem' }} />
                            </Box>
                            <Box sx={{
                                position: 'absolute',
                                bottom: '-4px',
                                right: '-4px',
                                backgroundColor: 'primary.main',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: '1.5px solid #ffffff'
                            }}>
                                ✕
                            </Box>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'text.primary' }}>
                            Suministros pecuarios
                        </Typography>
                    </Card>
                </Grid>

                {/* Card 2: Gobierno */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card variant="outlined" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: '#FBEBEF',
                                borderRadius: '8px',
                                width: '44px',
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'primary.main'
                            }}>
                                <AccountBalanceIcon sx={{ fontSize: '1.5rem' }} />
                            </Box>
                            <Box sx={{
                                position: 'absolute',
                                bottom: '-4px',
                                right: '-4px',
                                backgroundColor: 'primary.main',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: '1.5px solid #ffffff'
                            }}>
                                ✕
                            </Box>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'text.primary' }}>
                            Gobierno
                        </Typography>
                    </Card>
                </Grid>

                {/* Card 3: Público oficial */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card variant="outlined" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: '#FBEBEF',
                                borderRadius: '8px',
                                width: '44px',
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <StarsIcon sx={{ fontSize: '1.6rem' }} />
                            </Box>
                            <Box sx={{
                                position: 'absolute',
                                bottom: '-4px',
                                right: '-4px',
                                backgroundColor: 'primary.main',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: '1.5px solid #ffffff'
                            }}>
                                ✕
                            </Box>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'text.primary' }}>
                            Público oficial
                        </Typography>
                    </Card>
                </Grid>

                {/* Card 4: Asistencia social */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card variant="outlined" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: '#FBEBEF',
                                borderRadius: '8px',
                                width: '44px',
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'primary.main'
                            }}>
                                <FavoriteIcon sx={{ fontSize: '1.4rem' }} />
                            </Box>
                            <Box sx={{
                                position: 'absolute',
                                bottom: '-4px',
                                right: '-4px',
                                backgroundColor: 'primary.main',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: '1.5px solid #ffffff'
                            }}>
                                ✕
                            </Box>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'text.primary' }}>
                            Asistencia social
                        </Typography>
                    </Card>
                </Grid>

                {/* Card 5: Público urbano */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card variant="outlined" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: '#FBEBEF',
                                borderRadius: '8px',
                                width: '44px',
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'primary.main'
                            }}>
                                <ApartmentIcon sx={{ fontSize: '1.5rem' }} />
                            </Box>
                            <Box sx={{
                                position: 'absolute',
                                bottom: '-4px',
                                right: '-4px',
                                backgroundColor: 'primary.main',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: '1.5px solid #ffffff'
                            }}>
                                ✕
                            </Box>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'text.primary' }}>
                            Público urbano
                        </Typography>
                    </Card>
                </Grid>

                {/* Card 6: Derechos de factibilidad */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card variant="outlined" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: '#FBEBEF',
                                borderRadius: '8px',
                                width: '44px',
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <DescriptionIcon sx={{ fontSize: '1.6rem' }} />
                            </Box>
                            <Box sx={{
                                position: 'absolute',
                                bottom: '-4px',
                                right: '-4px',
                                backgroundColor: 'primary.main',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: '1.5px solid #ffffff'
                            }}>
                                ✕
                            </Box>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'text.primary' }}>
                            Derechos de factibilidad
                        </Typography>
                    </Card>
                </Grid>

                {/* Card 7: Derechos de contratación */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card variant="outlined" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: '#FBEBEF',
                                borderRadius: '8px',
                                width: '44px',
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <DescriptionIcon sx={{ fontSize: '1.6rem' }} />
                            </Box>
                            <Box sx={{
                                position: 'absolute',
                                bottom: '-4px',
                                right: '-4px',
                                backgroundColor: 'primary.main',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: '1.5px solid #ffffff'
                            }}>
                                ✕
                            </Box>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'text.primary' }}>
                            Derechos de contratación
                        </Typography>
                    </Card>
                </Grid>

                {/* Card 8: Derechos de reconexión */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card variant="outlined" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: '#FBEBEF',
                                borderRadius: '8px',
                                width: '44px',
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'primary.main'
                            }}>
                                <Box component="img" src={pipeImg} alt="tubería" sx={{ width: '24px', height: '24px' }} />
                            </Box>
                            <Box sx={{
                                position: 'absolute',
                                bottom: '-4px',
                                right: '-4px',
                                backgroundColor: 'primary.main',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: '1.5px solid #ffffff'
                            }}>
                                ✕
                            </Box>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'text.primary' }}>
                            Derechos de reconexión
                        </Typography>
                    </Card>
                </Grid>

                {/* Card 9: Cualquier otro uso */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card variant="outlined" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: '#FBEBEF',
                                borderRadius: '8px',
                                width: '44px',
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'primary.main'
                            }}>
                                <DoNotDisturbOffIcon sx={{ fontSize: '1.5rem' }} />
                            </Box>
                            <Box sx={{
                                position: 'absolute',
                                bottom: '-4px',
                                right: '-4px',
                                backgroundColor: 'primary.main',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: '1.5px solid #ffffff'
                            }}>
                                ✕
                            </Box>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'text.primary' }}>
                            Cualquier otro uso distinto a los referidos en el presente documento.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

            {/* Tarjeta: Consideraciones Legales */}
            <Card variant="outlined" sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                p: 3,
                mt: 4,
                mb: 4,
                borderRadius: '12px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                gap: 3
            }}>
                {/* Left Icon */}
                <Box sx={{ color: '#1E50A2', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BalanceIcon sx={{ fontSize: '2.8rem' }} />
                </Box>

                {/* Content */}
                <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ color: '#1E50A2', fontWeight: 'bold', fontSize: '1.15rem', mb: 1, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        CONSIDERACIONES LEGALES
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        Quedan a salvo las facultades de comprobación del cumplimiento de las obligaciones a cargo de los usuarios por parte del Prestador de Servicios y/o del Sistema Operador de los Servicios de Agua Potable y Alcantarillado del Municipio de Puebla, y se procederá conforme a derecho corresponda.
                    </Typography>
                </Box>
            </Card>
            <ColoniasDialog open={openColoniasDialog} onClose={() => setOpenColoniasDialog(false)} />
        </Container>
    </>);
}