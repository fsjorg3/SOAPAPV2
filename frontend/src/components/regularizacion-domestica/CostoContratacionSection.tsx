import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

export default function CostoContratacionSection() {
    return (
        <>
            {/* ========================================================================= */}
            {/* SECTION: COSTO DE CONTRATACIÓN */}
            {/* ========================================================================= */}
            <Grid container spacing={4} sx={{ mt: 8, mb: 6 }}>
                <Grid size={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                        <Box sx={{
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
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
                        borderColor: 'divider',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                        height: '100%'
                    }}>
                        <Box sx={{
                            backgroundColor: 'info.main',
                            color: 'primary.contrastText',
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            <Box sx={{
                                backgroundColor: 'background.paper',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'info.main',
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
                                    <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 'bold', fontSize: '0.8rem', py: 1.5, textTransform: 'uppercase' }}>
                                        Estrato
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 'bold', fontSize: '0.8rem', py: 1.5, textTransform: 'uppercase' }}>
                                        Costo del Contrato
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}>
                                    <TableCell align="center" sx={{ py: 2, borderRight: 1, borderColor: 'divider' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, color: 'info.main' }}>
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
                                <TableRow sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}>
                                    <TableCell align="center" sx={{ py: 2, borderRight: 1, borderColor: 'divider' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, color: 'info.main' }}>
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
                                <TableRow sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}>
                                    <TableCell align="center" sx={{ py: 2, borderRight: 1, borderColor: 'divider' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, color: 'info.main' }}>
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
                            borderColor: 'divider',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                        }}>
                            <Box sx={{
                                backgroundColor: 'info.main',
                                color: 'primary.contrastText',
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            }}>
                                <Box sx={{
                                    backgroundColor: 'background.paper',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'info.main',
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
                                        <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 'bold', fontSize: '0.8rem', py: 1.5, textTransform: 'uppercase' }}>
                                            Estrato
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 'bold', fontSize: '0.8rem', py: 1.5, textTransform: 'uppercase' }}>
                                            Costo del Contrato
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}>
                                        <TableCell align="center" sx={{ py: 2, borderRight: 1, borderColor: 'divider' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, color: 'info.main' }}>
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
                            backgroundColor: 'info.light',
                            border: 1, borderColor: 'info.light',
                            borderRadius: '8px',
                            p: 2,
                            gap: 2,
                            flexGrow: 1
                        }}>
                            <InfoIcon sx={{ color: 'info.main', fontSize: '2rem', flexShrink: 0 }} />
                            <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                Para poder gozar de los beneficios referidos en este apartado los usuarios deberán realizar el pago anual del ejercicio fiscal 2026.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
