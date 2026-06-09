import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckIcon from '@mui/icons-material/Check';

export default function VigenciaSection() {
    return (
        <>
            {/* ========================================================================= */}
            {/* SECTION: VIGENCIA */}
            {/* ========================================================================= */}
            <Grid container spacing={3} sx={{ mt: 2, mb: 6 }}>
                <Grid size={12}>
                    <Typography sx={{ color: 'info.main', fontWeight: '900', fontSize: '24px', textTransform: 'uppercase', mb: 1 }}>
                        VIGENCIA
                    </Typography>
                    <Box sx={{ width: '40px', height: '4px', backgroundColor: 'info.main', mb: 3 }} />
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
                            backgroundColor: 'background.paper',
                            borderRadius: '12px',
                            border: 2, borderColor: 'grey.200',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'visible',
                            flexShrink: 0
                        }}>
                            {/* Blue Header */}
                            <Box sx={{
                                backgroundColor: 'info.main',
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
                                <Box sx={{ width: '8px', height: '14px', backgroundColor: 'background.default', borderRadius: '4px', position: 'absolute', top: '-6px', left: '20px', border: 1, borderColor: 'grey.500' }} />
                                <Box sx={{ width: '8px', height: '14px', backgroundColor: 'background.default', borderRadius: '4px', position: 'absolute', top: '-6px', right: '20px', border: 1, borderColor: 'grey.500' }} />
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
                                    <Box key={i} sx={{ width: '12px', height: '8px', backgroundColor: 'grey.200', borderRadius: '2px' }} />
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
                                color: 'primary.contrastText',
                                boxShadow: '0 2px 8px rgba(61, 0, 23, 0.3)',
                                border: '2px solid #ffffff'
                            }}>
                                <CheckIcon sx={{ fontSize: '1rem', stroke: 'currentColor', strokeWidth: 1.5 }} />
                            </Box>
                        </Box>

                        {/* Text Box */}
                        <Box sx={{
                            backgroundColor: 'grey.100',
                            borderRadius: '12px',
                            p: 3,
                            flexGrow: 1,
                            border: 1, borderColor: 'divider',
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
                            <Typography sx={{ color: 'info.main', fontWeight: '900', fontSize: '1.25rem' }}>
                                31 de diciembre de 2026.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
