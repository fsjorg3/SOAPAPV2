import { Box, Card, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

export default function EticaContact() {
    return (
        <Box component="section" aria-labelledby="etica-contact-title" sx={{ mb: { xs: 3, md: 5 } }}>
            <Typography
                id="etica-contact-title"
                component="h2"
                variant="h5"
                sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}
            >
                Contacto del CEPCI
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
                            Consultas y denuncias ante el Comité de Ética y Prevención de Conflictos de Interés.
                        </Typography>
                        <Typography
                            component="a"
                            variant="caption"
                            href="mailto:cepci@soapap.gob.mx"
                            rel="noopener noreferrer"
                            target="_blank"
                            sx={{ letterSpacing: 1 }}
                        >
                            cepci@soapap.gob.mx
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}
