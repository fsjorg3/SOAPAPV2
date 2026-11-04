// Lógica pura de la guía del permiso de descarga: arma la lista de documentos y el calendario de análisis
// según el tipo de establecimiento y el giro. Sin React ni JSX para poder probarla con `node --test`.
import {
  DOCUMENTOS_PD567,
  DOCUMENTOS_PLAZA_ADMIN,
  DOCUMENTOS_PLAZA_LOCAL,
  DOCUMENTOS_TRANSPORTE,
  DOCUMENTO_BOLETAS,
  GRUPOS_COMUNES,
  GRUPO_FINAL,
  PERIODICIDADES,
} from '../config/permisoDescarga.ts';
import type { ClavePeriodicidad, Giro, GrupoDocumentos, TipoEstablecimiento } from '../config/permisoDescarga.ts';

export const clamp01 = (valor: number) => Math.max(0, Math.min(1, valor));

function grupoPropioDelTipo(tipo: TipoEstablecimiento, giro: Giro): GrupoDocumentos | null {
  switch (tipo.clase) {
    case 'pd567':
      return {
        titulo: 'De tu tipo de establecimiento',
        documentos: giro.boletas ? [...DOCUMENTOS_PD567, DOCUMENTO_BOLETAS] : [...DOCUMENTOS_PD567],
      };
    case 'plaza':
      return giro.id === 'plaza-admin'
        ? { titulo: 'Como administración de la plaza', documentos: [...DOCUMENTOS_PLAZA_ADMIN] }
        : { titulo: 'Como local dentro de la plaza', documentos: [...DOCUMENTOS_PLAZA_LOCAL] };
    case 'transporte':
      return { titulo: 'Del vehículo y del transportista', documentos: [...DOCUMENTOS_TRANSPORTE] };
    case 'general':
      return null;
  }
}

// El transporte no entrega documentos del predio ni comunes: solo los del vehículo y el transportista.
export function armarGruposDocumentos(tipo: TipoEstablecimiento, giro: Giro): GrupoDocumentos[] {
  const propio = grupoPropioDelTipo(tipo, giro);
  if (tipo.clase === 'transporte') return propio ? [propio] : [];
  return [...GRUPOS_COMUNES, ...(propio ? [propio] : []), GRUPO_FINAL];
}

export const contarDocumentos = (grupos: GrupoDocumentos[]) =>
  grupos.reduce((total, grupo) => total + grupo.documentos.length, 0);

export interface MesCalendario {
  numero: number;
  entrega: boolean;
}

export interface TiraCalendario {
  etiqueta: string;
  cadencia: string;
  entregasAlAnio: number;
  meses: MesCalendario[];
}

// Doce meses desde que se recibe el permiso, con la primera entrega en el mes 1.
export function armarTiraCalendario(etiqueta: string, clave: ClavePeriodicidad): TiraCalendario {
  const { paso, etiqueta: cadencia, entregasAlAnio } = PERIODICIDADES[clave];
  const meses = Array.from({ length: 12 }, (_, i) => ({ numero: i + 1, entrega: i % paso === 0 }));
  return { etiqueta, cadencia, entregasAlAnio, meses };
}

// Sin periodicidad conocida para el giro, no hay calendario.
export function armarCalendario(giro: Giro): TiraCalendario[] {
  if (!giro.periodicidad) return [];
  if (giro.periodicidadRenovacion) {
    return [
      armarTiraCalendario('Permiso nuevo', giro.periodicidad),
      armarTiraCalendario('Renovación', giro.periodicidadRenovacion),
    ];
  }
  return [armarTiraCalendario('Periodicidad', giro.periodicidad)];
}

export function resumenPeriodicidad(giro: Giro): string | null {
  if (!giro.periodicidad) return null;
  const inicial = PERIODICIDADES[giro.periodicidad].etiqueta;
  if (!giro.periodicidadRenovacion) return inicial;
  return `${inicial} al inicio; ${PERIODICIDADES[giro.periodicidadRenovacion].etiqueta.toLowerCase()} al renovar`;
}
