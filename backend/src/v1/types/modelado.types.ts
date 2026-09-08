export type ClavePeriodo = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'S1' | 'S2' | 'ANUAL';
export type EstadoPublicacion = 'pendiente' | 'publicado' | 'retirado';
export type Periodicidad = 'trimestral' | 'semestral' | 'anual';

export interface PeriodoFuente {
  clave: ClavePeriodo;
  nombre: string;
  link: string | null;
  estado: EstadoPublicacion;
}

export interface DocumentoFuente {
  id: string;
  titulo: string;
  periodicidad: Periodicidad;
  orden: number;
  periodos: PeriodoFuente[];
}

export interface SeccionFuente {
  id: string;
  titulo: string;
  orden: number;
  documentos: DocumentoFuente[];
}

export interface ModeladoAnio {
  año: number;
  secciones: SeccionFuente[];
}
