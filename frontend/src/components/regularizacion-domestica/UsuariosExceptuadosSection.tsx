import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import AgricultureIcon from '@mui/icons-material/Agriculture';
import pipeImg from "../../assets/pipe.png";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BlockIcon from '@mui/icons-material/Block';
import StarsIcon from '@mui/icons-material/Stars';
import DescriptionIcon from '@mui/icons-material/Description';
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';

export default function UsuariosExceptuadosSection() {
    return (
        <>
            {/* ========================================================================= */}
            {/* SECTION: USUARIOS EXCEPTUADOS */}
            {/* ========================================================================= */}
            <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
                <Grid size={12}>
                    <Box sx={{
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
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
                        border: 1, borderColor: 'divider',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: 'error.light',
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
                                color: 'primary.contrastText',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: 1.5, borderColor: 'background.paper'
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
                        border: 1, borderColor: 'divider',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: 'error.light',
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
                                color: 'primary.contrastText',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: 1.5, borderColor: 'background.paper'
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
                        border: 1, borderColor: 'divider',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: 'error.light',
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
                                color: 'primary.contrastText',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: 1.5, borderColor: 'background.paper'
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
                        border: 1, borderColor: 'divider',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: 'error.light',
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
                                color: 'primary.contrastText',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: 1.5, borderColor: 'background.paper'
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
                        border: 1, borderColor: 'divider',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: 'error.light',
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
                                color: 'primary.contrastText',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: 1.5, borderColor: 'background.paper'
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
                        border: 1, borderColor: 'divider',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: 'error.light',
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
                                color: 'primary.contrastText',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: 1.5, borderColor: 'background.paper'
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
                        border: 1, borderColor: 'divider',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: 'error.light',
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
                                color: 'primary.contrastText',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: 1.5, borderColor: 'background.paper'
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
                        border: 1, borderColor: 'divider',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: 'error.light',
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
                                color: 'primary.contrastText',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: 1.5, borderColor: 'background.paper'
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
                        border: 1, borderColor: 'divider',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        gap: 2,
                        height: '100%'
                    }}>
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                            <Box sx={{
                                backgroundColor: 'error.light',
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
                                color: 'primary.contrastText',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                border: 1.5, borderColor: 'background.paper'
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
        </>
    );
}
