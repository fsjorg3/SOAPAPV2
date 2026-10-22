import { ClavePeriodo } from '../types/modelado.types';

/**
 * nombreCorto y orden no vienen en el JSON fuente (2026.modelado.json solo declara `clave` y
 * `nombre` largo por periodo); se derivan de esta tabla fija. El `nombre` real de un
 * PeriodoCatalogo se toma del primer PeriodoFuente.nombre encontrado para esa clave.
 */
export const CATALOGO_PERIODOS: Record<ClavePeriodo, { nombreCorto: string; orden: number }> = {
  Q1: { nombreCorto: '1er Trimestre', orden: 1 },
  Q2: { nombreCorto: '2do Trimestre', orden: 2 },
  Q3: { nombreCorto: '3er Trimestre', orden: 3 },
  Q4: { nombreCorto: '4to Trimestre', orden: 4 },
  S1: { nombreCorto: '1er Semestre', orden: 1 },
  S2: { nombreCorto: '2do Semestre', orden: 2 },
  ANUAL: { nombreCorto: 'Anual', orden: 1 },
};

const ORDEN_PERIODICIDAD: Record<'trimestral' | 'semestral' | 'anual', number> = {
  trimestral: 3,
  semestral: 2,
  anual: 1,
};

/** Mayor granularidad presente entre dos periodicidades (trimestral > semestral > anual). */
export function periodicidadMasGranular(
  a: 'trimestral' | 'semestral' | 'anual',
  b: 'trimestral' | 'semestral' | 'anual'
): 'trimestral' | 'semestral' | 'anual' {
  return ORDEN_PERIODICIDAD[a] >= ORDEN_PERIODICIDAD[b] ? a : b;
}
