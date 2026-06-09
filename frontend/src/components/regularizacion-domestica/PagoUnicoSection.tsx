import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function PagoUnicoSection() {
    return (
        <>
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
                            color: "info.main",
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
                        borderColor: 'divider',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                        mb: 2
                    }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.main' } }}>
                                    <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 'bold', fontSize: '1rem', py: 2.5 }}>
                                        Año
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 'bold', fontSize: '0.95rem', py: 2.5, maxWidth: '220px', lineHeight: 1.3 }}>
                                        Pago Único por Tres Servicios (Agua, Drenaje y Saneamiento)
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 'bold', fontSize: '0.95rem', py: 2.5, maxWidth: '220px', lineHeight: 1.3 }}>
                                        Pago Único por Dos Servicios (Drenaje y Saneamiento)
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 'bold', fontSize: '0.95rem', py: 2.5, maxWidth: '220px', lineHeight: 1.3 }}>
                                        Pago Único por un Servicio (Agua)
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Row 2024 */}
                                <TableRow sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1rem', borderRight: 1, borderColor: 'divider' }}>
                                        2024
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem', borderRight: 1, borderColor: 'divider' }}>
                                        $1,650.00
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem', borderRight: 1, borderColor: 'divider' }}>
                                        $693.00
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem' }}>
                                        $957.00
                                    </TableCell>
                                </TableRow>

                                {/* Row 2025 */}
                                <TableRow sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1rem', borderRight: 1, borderColor: 'divider' }}>
                                        2025
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem', borderRight: 1, borderColor: 'divider' }}>
                                        $2,400.00
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem', borderRight: 1, borderColor: 'divider' }}>
                                        $972.00
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem' }}>
                                        $1,428.00
                                    </TableCell>
                                </TableRow>

                                {/* Row 2026 */}
                                <TableRow sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1rem', borderRight: 1, borderColor: 'divider' }}>
                                        2026
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem', borderRight: 1, borderColor: 'divider' }}>
                                        $2,500.00
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem', borderRight: 1, borderColor: 'divider' }}>
                                        $1,000.00
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.95rem' }}>
                                        $1,490.00
                                    </TableCell>
                                </TableRow>

                                {/* Total Row */}
                                <TableRow sx={{
                                    borderTop: 2,
                                    borderBottom: 2,
                                    borderColor: 'warning.main',
                                    backgroundColor: 'secondary.main',
                                    color: 'secondary.contrastText',
                                }}>
                                    <TableCell align="center" sx={{
                                        fontWeight: '900',
                                        fontSize: '1.05rem', borderRight: 1, 
                                        borderTop: 2,
                                        borderBottom: 2, borderColor: 'warning.main',
                                        backgroundColor: 'secondary.light',
                                        color: 'secondary.contrastText',
                                    }}>
                                        Total
                                    </TableCell>
                                    <TableCell align="center" sx={{
                                        fontWeight: '900',
                                        fontSize: '1.05rem', borderRight: 1,
                                        borderTop: 2,
                                        borderBottom: 2, borderColor: 'warning.main',
                                        backgroundColor: 'secondary.light',
                                        color: 'secondary.contrastText',
                                    }}>
                                        $6,550.00
                                    </TableCell>
                                    <TableCell align="center" sx={{
                                        fontWeight: '900',
                                        fontSize: '1.05rem', borderRight: 1, 
                                        borderTop: 2,
                                        borderBottom: 2, borderColor: 'warning.main',
                                        backgroundColor: 'secondary.light',
                                        color: 'secondary.contrastText',
                                    }}>
                                        $2,665.00
                                    </TableCell>
                                    <TableCell align="center" sx={{
                                        fontWeight: '900',
                                        fontSize: '1.05rem', borderRight: 1, 
                                        borderTop: 2,
                                        borderBottom: 2, borderColor: 'warning.main',
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
                    <Box sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: '3rem 2rem 2rem', borderRadius: '15px', width: '100%', boxShadow: '0 10px 20px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                        <Box>
                            <Typography sx={{ color: 'secondary.main', fontSize: '1rem', mb: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold' }}>PUNTOS DE ATENCIÓN</Typography>
                            <Box component="a" href="/contacto" sx={{ display: 'block', textDecoration: 'none', color: 'primary.contrastText', fontSize: '1.1rem', fontWeight: 'bold', mb: '0.5rem' }}>Oficinas de SOAPAP</Box>
                            <Box component="a" href="https://www.aguapuebla.mx/lugares-de-pago-y-centros-de-atencion/" target="_blank" rel="noreferrer" sx={{ display: 'block', textDecoration: 'none', color: 'primary.contrastText', fontSize: '1.1rem', fontWeight: 'bold' }}>Agua De Puebla</Box>
                        </Box>
                        <Box>
                            <Typography sx={{ color: 'secondary.main', fontSize: '1rem', mb: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold' }}>OPCIONES DE PAGO</Typography>
                            <Typography sx={{ display: 'block', color: 'primary.contrastText', fontSize: '1.1rem', fontWeight: 'bold', mb: '0.5rem' }}>Ventanilla</Typography>
                            <Box component="a" href="https://www.aguapuebla.mx/donde-pagar/" target="_blank" rel="noreferrer" sx={{ display: 'block', textDecoration: 'none', color: 'primary.contrastText', fontSize: '1.1rem', fontWeight: 'bold' }}>Plataforma digital</Box>
                        </Box>
                        <Box>
                            <Typography sx={{ color: 'secondary.main', fontSize: '1rem', mb: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold' }}>REQUISITOS</Typography>
                            <Typography sx={{ display: 'block', color: 'primary.contrastText', fontSize: '1.1rem', fontWeight: 'bold' }}>NIS</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
