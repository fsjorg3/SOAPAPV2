import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import BalanceIcon from '@mui/icons-material/Balance';

export default function ConsideracionesLegalesSection() {
    return (
        <>
            {/* Tarjeta: Consideraciones Legales */}
            <Card variant="outlined" sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                p: 3,
                mt: 4,
                mb: 4,
                borderRadius: '12px',
                border: 1, borderColor: 'divider',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                gap: 3
            }}>
                {/* Left Icon */}
                <Box sx={{ color: 'info.main', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BalanceIcon sx={{ fontSize: '2.8rem' }} />
                </Box>

                {/* Content */}
                <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ color: 'info.main', fontWeight: 'bold', fontSize: '1.15rem', mb: 1, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        CONSIDERACIONES LEGALES
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        Quedan a salvo las facultades de comprobación del cumplimiento de las obligaciones a cargo de los usuarios por parte del Prestador de Servicios y/o del Sistema Operador de los Servicios de Agua Potable y Alcantarillado del Municipio de Puebla, y se procederá conforme a derecho corresponda.
                    </Typography>
                </Box>
            </Card>
        </>
    );
}
