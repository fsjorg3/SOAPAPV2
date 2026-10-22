import type { ClavePeriodo, Documento, PeriodoCatalogo, Periodicidad } from '../types/transparencia';

export function filtrarDocumentos(documentos: Documento[], buscar: string, periodo: ClavePeriodo | null): Documento[] {
  const q = buscar.trim().toLowerCase();
  return documentos
    .filter((doc) => !q || doc.titulo.toLowerCase().includes(q) || (doc.descripcion ?? '').toLowerCase().includes(q))
    .map((doc) => (periodo ? { ...doc, periodos: doc.periodos.filter((p) => p.clave === periodo) } : doc))
    .filter((doc) => doc.periodos.length > 0);
}

export function filtrarPeriodosCatalogo(periodos: PeriodoCatalogo[], periodo: ClavePeriodo | null): PeriodoCatalogo[] {
  return periodo ? periodos.filter((p) => p.clave === periodo) : periodos;
}

const MAPA_CLAVE_CORTA: Record<ClavePeriodo, string> = {
  Q1: 'T1',
  Q2: 'T2',
  Q3: 'T3',
  Q4: 'T4',
  S1: 'S1',
  S2: 'S2',
  ANUAL: 'ANU',
};

export function claveCorta(clave: ClavePeriodo): string {
  return MAPA_CLAVE_CORTA[clave];
}

export function nombrePluralPeriodicidad(periodicidad: Periodicidad): string {
  if (periodicidad === 'trimestral') return 'trimestres';
  if (periodicidad === 'semestral') return 'semestres';
  return 'periodos';
}
