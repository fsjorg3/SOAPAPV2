import { useState } from 'react';
import { Alert, Box, Skeleton, Typography } from '@mui/material';
import { useTituloConcesion } from '../../hooks/useNormatividadData';
import { AccordionGrupoDocumentos } from './AccordionGrupoDocumentos';
import { ICONO_TITULO_CONCESION } from './normatividadIconos';
import type { DocumentoNormativo } from '../../types/normatividad';

interface TituloConcesionCatalogoProps {
  onAbrirDocumento: (documento: DocumentoNormativo) => void;
}

export function TituloConcesionCatalogo({ onAbrirDocumento }: TituloConcesionCatalogoProps) {
  const { grupos, error, isLoading } = useTituloConcesion();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const gruposOrdenados = [...grupos].sort((a, b) => a.orden - b.orden);
  const totalDocumentos = gruposOrdenados.reduce((acc, g) => acc + 1 + g.totalAnexos, 0);

  const handleToggle = (id: string, isExpanded: boolean) => {
    setExpandedId(isExpanded ? id : null);
  };

  return (
    <Box>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
        {totalDocumentos} documentos en {gruposOrdenados.length} grupos
      </Typography>

      {error && <Alert severity="error">Ocurrió un error al cargar los documentos del título de concesión.</Alert>}

      {isLoading ? (
        <Box>
          {[1, 2].map((item) => (
            <Skeleton key={item} variant="rounded" width="100%" height={64} sx={{ mb: 2 }} />
          ))}
        </Box>
      ) : (
        gruposOrdenados.map((grupo) => (
          <AccordionGrupoDocumentos
            key={grupo.id}
            id={grupo.id}
            titulo={grupo.titulo}
            icon={ICONO_TITULO_CONCESION}
            documentos={[grupo.documentoPrincipal, ...grupo.anexos]}
            expanded={expandedId === grupo.id}
            onToggle={handleToggle}
            onAbrirDocumento={onAbrirDocumento}
          />
        ))
      )}
    </Box>
  );
}
