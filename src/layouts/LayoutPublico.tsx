import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router';
import Navbar from '../components/navbar/navbar';
import drop from '../assets/drop-minimalist.svg'

export default function LayoutPublico() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          maxWidth: 'lg',
          marginInline: 'auto',
          px: 3, pt: 4, pb: 8
        }}
      >
        <Outlet />
      </Box>

      {/*Footer*/}
      <Box sx={{ width: '100%', minHeight: '250px', backgroundColor: 'primary.main', borderRadius: '8px' }}>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            maxWidth: 'lg',
            marginInline: 'auto',
            px: 3, pt: 4, pb: 8
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>

            <Box sx={{ display: 'flex', gap: '15px', width: { xs: '100%', md: '50%' }, alignItems:'center',justifyContent:'center' }}>

              <Box component='img' src={drop} 
              sx={{ display: 'block', width: {xs:'10%', md:'10%'}, border: '2px solid white', margin: '5px', padding: '5px', borderRadius: '8px' }} />
              
              <Box sx={{ width: {xs:'80%', md:'60%'} }}>
                <Typography variant='body2' sx={{ color: 'primary.contrastText', textTransform: 'uppercase' }}>
                  Sistema Operador de los Serivicios de Agua Potable y Alcantarillado del Municipio de Puebla
                </Typography>
              </Box>

            </Box>

            <Box sx={{ display: 'flex', width: { xs: '100%', md: '50%' } }}>
            </Box>

          </Box>
        </Box>

      </Box>

    </Box>
  );
}