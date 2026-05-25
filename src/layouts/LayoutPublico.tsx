import { Box } from '@mui/material';
import { Outlet } from 'react-router';
import Navbar from '../components/navbar/navbar';

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
    </Box>
  );
}