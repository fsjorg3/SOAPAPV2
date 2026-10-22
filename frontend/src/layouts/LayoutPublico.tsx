import { useEffect, useRef, Suspense } from 'react';
import { Box } from '@mui/material';
import { useOutlet, useLocation } from 'react-router';
import SkipLink from '../components/accesibilidad/SkipLink';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer';
import RouteLoadingFallback from '../components/RouteLoadingFallback';
import { motion, AnimatePresence } from "motion/react";
import { contenedorSitioSx } from '../theme/institutional-flat-system';

export default function LayoutPublico() {
  const location = useLocation();
  const { pathname } = location;
  const outlet = useOutlet();

  const mainRef = useRef<HTMLElement>(null);
  const rutaAnterior = useRef(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Al cambiar de ruta el foco pasa al <main> para que lectores de pantalla y teclado
    // empiecen en el contenido nuevo. En la carga inicial (misma ruta) no se mueve el foco.
    if (rutaAnterior.current === pathname) return;
    rutaAnterior.current = pathname;
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SkipLink />
      <Navbar />
      <Box
        component="main"
        id="contenido-principal"
        ref={mainRef}
        tabIndex={-1}
        sx={(theme) => ({
          // Ancho y márgenes laterales del sitio: fuente única en el tema (las rutas no definen su propio ancho).
          ...contenedorSitioSx(theme),
          flexGrow: 1,
          pt: 4, pb: 8,
          position: 'relative',
          // Destino programático del foco (no es un control): sin contorno.
          '&:focus': { outline: 'none' },
          // El AppBar es sticky: evita que tape el inicio del contenido al saltar a #contenido-principal.
          scrollMarginTop: { xs: 80, md: 96 },
        })}
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