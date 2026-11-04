import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useReducedMotion } from 'motion/react';
import Portada from '../components/permiso-descarga/Portada';
import Recorrido from '../components/permiso-descarga/Recorrido';
import QuienDebe from '../components/permiso-descarga/QuienDebe';
import Vigencia from '../components/permiso-descarga/Vigencia';
import Tramites from '../components/permiso-descarga/Tramites';
import PasoAPaso from '../components/permiso-descarga/PasoAPaso';
import PrimerAnio from '../components/permiso-descarga/PrimerAnio';
import Obligaciones from '../components/permiso-descarga/Obligaciones';
import SelectorGiro from '../components/permiso-descarga/SelectorGiro';
import ResultadoRuta from '../components/permiso-descarga/ResultadoRuta';
import PreguntasFrecuentes from '../components/permiso-descarga/PreguntasFrecuentes';
import { irASeccion } from '../components/permiso-descarga/estilos';
import { TIPOS_ESTABLECIMIENTO } from '../config/permisoDescarga';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { seoMetadata } from '../config/seo-metadata';

export default function PermisoDescarga() {
  useDocumentMeta(seoMetadata.permisoDescarga);
  const suave = !useReducedMotion();
  const [tipoId, setTipoId] = useState<string | null>(null);
  const [giroId, setGiroId] = useState<string | null>(null);

  const tipo = TIPOS_ESTABLECIMIENTO.find((t) => t.id === tipoId) ?? null;
  const giro = tipo?.giros.find((g) => g.id === giroId) ?? null;

  const elegirTipo = (id: string) => {
    setTipoId(id);
    setGiroId(null);
  };

  // Al elegir giro, llevar al resultado y pasarle el foco.
  useEffect(() => {
    if (!giroId) return;
    const marco = requestAnimationFrame(() => irASeccion('pd-resultado', suave));
    return () => cancelAnimationFrame(marco);
  }, [giroId, suave]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, md: 6 } }}>
      <Portada />
      <Recorrido />
      <QuienDebe />
      <Vigencia />
      <Tramites />
      <PasoAPaso />
      <PrimerAnio />
      <Obligaciones />
      <SelectorGiro tipo={tipo} giroId={giroId} onElegirTipo={elegirTipo} onElegirGiro={setGiroId} />
      {tipo && giro && <ResultadoRuta key={giro.id} tipo={tipo} giro={giro} />}
      <PreguntasFrecuentes />
    </Box>
  );
}
