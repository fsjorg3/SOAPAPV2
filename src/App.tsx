import { ThemeProvider, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router';
import InstitutionalFlatSystem from './theme/institutional-flat-system';

export default function App() {
  return (
    <ThemeProvider theme={InstitutionalFlatSystem}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}