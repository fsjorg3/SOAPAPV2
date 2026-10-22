import { useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router';
import { crearTemaInstitucional } from './theme/institutional-flat-system';
import { useAccesibilidad } from './components/accesibilidad/useAccesibilidad';

export default function App() {
  const { preferencias, escalaGrisesEfectiva } = useAccesibilidad();
  // El tema se recrea cuando cambian las opciones de accesibilidad (la veda fuerza la escala de grises).
  const tema = useMemo(
    () => crearTemaInstitucional({ ...preferencias, escalaGrises: escalaGrisesEfectiva }),
    [preferencias, escalaGrisesEfectiva],
  );

  return (
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}
