export interface Archivo {
  id: string;
  nombre: string;
  tipo: 'application/pdf';
  tamanoBytes?: number;
  fechaPublicacion?: string;
  urlVisualizacion: string;
  urlDescarga: string;
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

export interface DatosContactoEnviado {
  enviado: boolean;
}
