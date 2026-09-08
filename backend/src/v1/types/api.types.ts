import { ClavePeriodo, EstadoPublicacion, Periodicidad } from './modelado.types';

export type TipoPresentacion = 'matriz_periodos' | 'documentos_simples';
export type AccionArchivo = 'ver' | 'descargar';
export type EstadoEjercicio = 'borrador' | 'publicado' | 'archivado';

export interface MetadatosRespuesta {
  generadoEn: string;
  versionDatos?: string;
}

export interface Ejercicio {
  ejercicio: number;
  estado: EstadoEjercicio;
}

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

export interface PeriodoCatalogo {
  clave: ClavePeriodo;
  nombre: string;
  nombreCorto: string;
  orden: number;
}

/**
 * No incluye checksumSha256 (campo opcional en el contrato OpenAPI): la verificación/caché de
 * archivos se basa solo en tamanoBytes + fechaPublicacion, no en un hash de contenido.
 */
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

export interface Documento {
  id: string;
  titulo: string;
  descripcion: string | null;
  periodicidad: Periodicidad;
  orden: number;
  accionPreferida: AccionArchivo;
  periodos: PublicacionPeriodo[];
}

export interface DatosDetalleSeccion {
  ejercicio: number;
  seccion: SeccionResumen;
  periodos: PeriodoCatalogo[];
  documentos: Documento[];
}

export interface CoincidenciaBusqueda {
  ejercicio: number;
  seccion: { id: string; titulo: string };
  documento: Documento;
}

export interface DatosBusqueda {
  total: number;
  resultados: CoincidenciaBusqueda[];
}

export interface DatosSecciones {
  ejercicio: number;
  secciones: SeccionResumen[];
}

export interface Problema {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  codigo?: string;
}

export interface Respuesta<T> {
  data: T;
  meta: MetadatosRespuesta;
}

export type RespuestaEjercicios = Respuesta<Ejercicio[]>;
export type RespuestaSecciones = Respuesta<DatosSecciones>;
export type RespuestaDetalleSeccion = Respuesta<DatosDetalleSeccion>;
export type RespuestaBusqueda = Respuesta<DatosBusqueda>;

export interface FiltrosSeccion {
  buscar?: string;
  periodo?: ClavePeriodo;
  estado?: EstadoPublicacion;
}

export interface DocumentoPublico {
  id: string;
  titulo: string;
  orden: number;
  estado: EstadoPublicacion;
  archivo: Archivo | null;
}

export interface SeccionNormativaPublica {
  id: string;
  titulo: string;
  descripcion: string | null;
  orden: number;
  totalDocumentos: number;
  totalPublicados: number;
  documentos: DocumentoPublico[];
}

export interface DatosNormatividad {
  secciones: SeccionNormativaPublica[];
}

export interface GrupoConcesionPublica {
  id: string;
  titulo: string;
  orden: number;
  documentoPrincipal: DocumentoPublico;
  anexos: DocumentoPublico[];
  totalAnexos: number;
}

export interface DatosTitulo {
  grupos: GrupoConcesionPublica[];
}

export type RespuestaNormatividad = Respuesta<DatosNormatividad>;
export type RespuestaTitulo = Respuesta<DatosTitulo>;
