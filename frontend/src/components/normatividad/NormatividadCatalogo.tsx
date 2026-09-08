import { useState } from 'react';
import { Alert, Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, Skeleton, TextField, Typography } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import { useNormatividad } from '../../hooks/useNormatividadData';
import { filtrarSecciones } from '../../utils/normatividad';
import { AccordionGrupoDocumentos } from './AccordionGrupoDocumentos';
import { iconoDeSeccion } from './normatividadIconos';
import type { DocumentoNormativo } from '../../types/normatividad';

interface NormatividadCatalogoProps {
  onAbrirDocumento: (documento: DocumentoNormativo) => void;
}

export function NormatividadCatalogo({ onAbrirDocumento }: NormatividadCatalogoProps) {
  const { secciones, error, isLoading } = useNormatividad();
  const [buscar, setBuscar] = useState('');
  const [seccionId, setSeccionId] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const seccionesOrdenadas = [...secciones].sort((a, b) => a.orden - b.orden);
  const seccionesPorTipo = seccionId ? seccionesOrdenadas.filter((s) => s.id === seccionId) : seccionesOrdenadas;
  const seccionesFiltradas = filtrarSecciones(seccionesPorTipo, buscar);

  const totalDocumentos = seccionesOrdenadas.reduce((acc, s) => acc + s.totalDocumentos, 0);

  const handleToggle = (id: string, isExpanded: boolean) => {
    setExpandedId(isExpanded ? id : null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Buscar documento por nombre..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
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

        <FormControl sx={{ minWidth: { xs: '100%', sm: 260 } }}>
          <InputLabel id="select-tipo-documento-label">Tipo de documento</InputLabel>
          <Select
            labelId="select-tipo-documento-label"
            id="select-tipo-documento"
            value={seccionId}
            label="Tipo de documento"
            startAdornment={
              <InputAdornment position="start">
                <CategoryIcon sx={{ fontSize: '1.1rem', color: 'action.active' }} />
              </InputAdornment>
            }
            onChange={(e) => setSeccionId(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            {seccionesOrdenadas.map((seccion) => (
              <MenuItem key={seccion.id} value={seccion.id}>
                {seccion.titulo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
        {totalDocumentos} documentos en {seccionesOrdenadas.length} grupos
      </Typography>

      {error && <Alert severity="error">Ocurrió un error al cargar la normatividad.</Alert>}

      {isLoading ? (
        <Box>
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} variant="rounded" width="100%" height={64} sx={{ mb: 2 }} />
          ))}
        </Box>
      ) : seccionesFiltradas.length === 0 ? (
        <Typography color="text.secondary">No se encontraron documentos para los filtros seleccionados.</Typography>
      ) : (
        seccionesFiltradas.map((seccion) => (
          <AccordionGrupoDocumentos
            key={seccion.id}
            id={seccion.id}
            titulo={seccion.titulo}
            descripcion={seccion.descripcion}
            icon={iconoDeSeccion(seccion.id)}
            documentos={seccion.documentos}
            expanded={expandedId === seccion.id}
            onToggle={handleToggle}
            onAbrirDocumento={onAbrirDocumento}
          />
        ))
      )}
    </Box>
  );
}
