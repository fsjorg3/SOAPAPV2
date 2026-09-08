import {
  Box,
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { nombrePluralPeriodicidad } from '../../utils/transparencia';
import type { ClavePeriodo, Ejercicio, PeriodoCatalogo, SeccionResumen } from '../../types/transparencia';

interface FinancialFiltersProps {
  ejercicios: Ejercicio[];
  ejercicioActivo: number | null;
  onEjercicioChange: (ejercicio: number) => void;
  isLoadingEjercicios: boolean;

  secciones: SeccionResumen[];
  seccionActivaId: string | null;
  onSeccionChange: (seccionId: string) => void;
  isLoadingSecciones: boolean;

  seccionActiva: SeccionResumen | null;
  periodosCatalogo: PeriodoCatalogo[];
  periodoActivo: ClavePeriodo | null;
  onPeriodoChange: (periodo: ClavePeriodo | null) => void;
  isLoadingDetalle: boolean;

  buscar: string;
  onBuscarChange: (valor: string) => void;
}

export function FinancialFilters({
  ejercicios,
  ejercicioActivo,
  onEjercicioChange,
  isLoadingEjercicios,
  secciones,
  seccionActivaId,
  onSeccionChange,
  isLoadingSecciones,
  seccionActiva,
  periodosCatalogo,
  periodoActivo,
  onPeriodoChange,
  isLoadingDetalle,
  buscar,
  onBuscarChange,
}: FinancialFiltersProps) {
  const mostrarFiltroPeriodo = seccionActiva?.presentacion.mostrarFiltroPeriodo ?? false;
  const seccionesOrdenadas = [...secciones].sort((a, b) => a.orden - b.orden);

  const handlePeriodoChange = (event: SelectChangeEvent) => {
    const valor = event.target.value;
    onPeriodoChange(valor ? (valor as ClavePeriodo) : null);
  };

  return (
    <Card variant="outlined" sx={{ p: 3, height: 'fit-content', position: { md: 'sticky' }, top: { md: '20px' } }}>
      <Stack spacing={1.5}>
        <FormControl fullWidth>
          <InputLabel id="select-ejercicio-label">Ejercicio fiscal</InputLabel>
          <Select
            labelId="select-ejercicio-label"
            id="select-ejercicio"
            value={ejercicioActivo != null ? String(ejercicioActivo) : ''}
            label="Ejercicio fiscal"
            disabled={isLoadingEjercicios}
            onChange={(e) => onEjercicioChange(Number(e.target.value))}
          >
            {ejercicios.map((ej) => (
              <MenuItem key={ej.ejercicio} value={String(ej.ejercicio)} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarMonthIcon sx={{ fontSize: '1.1rem', color: 'action.active', marginRight: '8px' }} />
                {ej.ejercicio}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="select-categoria-label">Categoría</InputLabel>
          <Select
            labelId="select-categoria-label"
            id="select-categoria"
            value={seccionActivaId ?? ''}
            label="Categoría"
            disabled={isLoadingSecciones}
            onChange={(e) => onSeccionChange(e.target.value)}
          >
            {seccionesOrdenadas.map((seccion) => (
              <MenuItem key={seccion.id} value={seccion.id}>
                {seccion.titulo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          placeholder="Buscar documento..."
          value={buscar}
          onChange={(e) => onBuscarChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControl fullWidth disabled={!mostrarFiltroPeriodo || isLoadingDetalle}>
          <InputLabel id="select-periodo-label">Periodo</InputLabel>
          <Select
            labelId="select-periodo-label"
            id="select-periodo"
            value={mostrarFiltroPeriodo ? (periodoActivo ?? '') : ''}
            label="Periodo"
            onChange={handlePeriodoChange}
            renderValue={(valor) => {
              if (!mostrarFiltroPeriodo) return 'No aplica';
              if (!valor) return seccionActiva ? `Todos los ${nombrePluralPeriodicidad(seccionActiva.periodicidad)}` : 'Todos';
              return periodosCatalogo.find((p) => p.clave === valor)?.nombre ?? valor;
            }}
          >
            {mostrarFiltroPeriodo ? (
              [
                <MenuItem key="__todos__" value="">
                  Todos los {seccionActiva ? nombrePluralPeriodicidad(seccionActiva.periodicidad) : 'periodos'}
                </MenuItem>,
                ...[...periodosCatalogo]
                  .sort((a, b) => a.orden - b.orden)
                  .map((periodo) => (
                    <MenuItem key={periodo.clave} value={periodo.clave}>
                      {periodo.nombre}
                    </MenuItem>
                  )),
              ]
            ) : (
              <MenuItem value="">No aplica</MenuItem>
            )}
          </Select>
        </FormControl>

        <Box sx={{ display: { xs: 'none', md: 'block' }, mt: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Categorías
          </Typography>
          <List disablePadding>
            {seccionesOrdenadas.map((seccion) => {
              const activa = seccion.id === seccionActivaId;
              return (
                <ListItemButton
                  key={seccion.id}
                  selected={activa}
                  onClick={() => onSeccionChange(seccion.id)}
                  sx={{
                    borderLeft: '4px solid',
                    borderColor: activa ? 'primary.main' : 'transparent',
                    borderRadius: 0,
                    minHeight: 44,
                  }}
                >
                  <ListItemText
                    primary={seccion.titulo}
                    slotProps={{
                      primary: {
                        sx: { fontWeight: activa ? 700 : 500, color: activa ? 'primary.main' : 'text.secondary' },
                      },
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Stack>
    </Card>
  );
}
