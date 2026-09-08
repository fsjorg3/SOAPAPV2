export type EstadoEjercicio = 'borrador' | 'publicado' | 'archivado';

export interface Ejercicio {
  ejercicio: number;
  estado: EstadoEjercicio;
}

export type Periodicidad = 'trimestral' | 'semestral' | 'anual';

export type TipoPresentacion = 'matriz_periodos' | 'documentos_simples';

export interface Presentacion {
  tipo: TipoPresentacion;
  mostrarFiltroPeriodo: boolean;
}

export interface SeccionResumen {
  id: string;
  titulo: string;
  orden: number;
  periodicidad: Periodicidad;
  presentacion: Presentacion;
  totalDocumentos: number;
  totalArchivosPublicados: number;
}

export interface DatosSecciones {
  ejercicio: number;
  secciones: SeccionResumen[];
}

export type ClavePeriodo = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'S1' | 'S2' | 'ANUAL';

export interface PeriodoCatalogo {
  clave: ClavePeriodo;
  nombre: string;
  nombreCorto: string;
  orden: number;
}

export type EstadoPublicacion = 'pendiente' | 'publicado' | 'retirado';

export interface Archivo {
  id: string;
  nombre: string;
  tipo: 'application/pdf';
  tamanoBytes?: number;
  fechaPublicacion?: string;
  urlVisualizacion: string;
  urlDescarga: string;
}

export interface PublicacionPeriodo {
  clave: ClavePeriodo;
  nombre: string;
  estado: EstadoPublicacion;
  archivo: Archivo | null;
}

export type AccionPreferida = 'ver' | 'descargar';

export interface Documento {
  id: string;
  titulo: string;
  descripcion: string | null;
  periodicidad: Periodicidad;
  orden: number;
  accionPreferida: AccionPreferida;
  periodos: PublicacionPeriodo[];
}

export interface DatosDetalleSeccion {
  ejercicio: number;
  seccion: SeccionResumen;
  periodos: PeriodoCatalogo[];
  documentos: Documento[];
}

export interface Problema {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  codigo?: string;
}

export interface Meta {
  generadoEn: string;
}

export interface Respuesta<T> {
  data: T;
  meta: Meta;
}
