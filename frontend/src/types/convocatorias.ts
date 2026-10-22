import type { Archivo } from './api';

export type EstadoPublicacion = 'pendiente' | 'publicado' | 'retirado';
export type CategoriaConvocatoria = 'obra_publica' | 'adquisiciones';

export interface Convocatoria {
  id: string;
  expediente: string;
  anio: number;
  categoria: CategoriaConvocatoria;
  descripcion: string;
  estado: EstadoPublicacion;
  archivo: Archivo | null;
}

export interface DatosConvocatorias {
  convocatorias: Convocatoria[];
}
