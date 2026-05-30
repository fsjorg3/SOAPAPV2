import { useEffect } from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer';


export default function LayoutPublico() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
      <Footer />


    </Box>
  );
}