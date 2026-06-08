import { Box, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import mascotaError from '../assets/mascota/mascota-error-404.webp';

export default function Error404() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '70vh',
          py: 2
        }}
      >
        <Box
          component="img"
          src={mascotaError}
          alt="Error 404 - Mascota"
          sx={{
            maxWidth: '100%',
            height: 'auto',
            mb: 4,
            maxHeight: '400px',
            filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.2))'
          }}
        />
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/')}
          sx={{
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText',
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            borderRadius: '30px',
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'secondary.dark',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease'
          }}
        >
          Regresar al inicio
        </Button>
      </Box>
    </Container>
  );
}
