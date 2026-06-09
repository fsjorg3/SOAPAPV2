import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

export default function ConsideracionesImportantesSection() {
    return (
        <>
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
                        border: 1, borderColor: 'divider',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                        gap: 3
                    }}>
                        {/* Left Badge: Warning Sign */}
                        <Box sx={{
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
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
                        border: 1, borderColor: 'divider',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                        gap: 3
                    }}>
                        {/* Left Badge: Document with Dollar Sign */}
                        <Box sx={{
                            backgroundColor: 'info.main',
                            color: 'primary.contrastText',
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
        </>
    );
}
