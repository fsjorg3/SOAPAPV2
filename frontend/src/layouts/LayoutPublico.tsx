import { useEffect, Suspense } from 'react';
import { Box } from '@mui/material';
import { useOutlet, useLocation } from 'react-router';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer';
import RouteLoadingFallback from '../components/RouteLoadingFallback';
import { motion, AnimatePresence } from "motion/react";

export default function LayoutPublico() {
  const location = useLocation();
  const { pathname } = location;
  const outlet = useOutlet();

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
          px: 3, pt: 4, pb: 8,
          position: 'relative'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Suspense fallback={<RouteLoadingFallback />}>
              {outlet}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/*Footer*/}
      <Footer />

    </Box>
  );
}