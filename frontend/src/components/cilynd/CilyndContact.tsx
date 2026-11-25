import { Box, Card, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { CILYND_CORREO } from './cilyndData';

export default function CilyndContact() {
    if (!CILYND_CORREO) return null;

    return (
        <Box component="section" aria-labelledby="cilynd-contact-title" sx={{ mb: { xs: 3, md: 5 } }}>
            <Typography
                id="cilynd-contact-title"
                component="h2"
                variant="h5"
                sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}
            >
                Contacto del Comité
            </Typography>
            <Card variant="outstanding">
                <Box sx={{ display: 'flex', padding: '10px' }}>
                    <EmailIcon
                        fontSize="large"
                        color="primary"
                        sx={{ display: 'flex', marginTop: '10px' }}
                    />
                    <Box sx={{ ml: 1.5 }}>
                        <Typography component="h3" variant="caption">
                            CORREO ELECTRÓNICO
                        </Typography>
                        <Typography
                            component="p"
                            variant="body2"
                            sx={{ color: 'text.secondary', mb: 0.5 }}
                        >
                            Consultas ante el Comité de Igualdad Laboral y No Discriminación.
                        </Typography>
                        <Typography
                            component="a"
                            variant="caption"
                            href={`mailto:${CILYND_CORREO}`}
                            rel="noopener noreferrer"
                            target="_blank"
                            sx={{ letterSpacing: 1 }}
                        >
                            {CILYND_CORREO}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}
