export type EstadoPublicacion = 'pendiente' | 'publicado' | 'retirado';
export type CategoriaConvocatoria = 'obra_publica' | 'adquisiciones';

export interface ConvocatoriaFuente {
  id: string;
  expediente: string;
  anio: number;
  categoria: CategoriaConvocatoria;
  descripcion: string;
  orden: number;
  link: string | null;
  estado: EstadoPublicacion;
}

export interface ModeladoConvocatorias {
  convocatorias: ConvocatoriaFuente[];
}
