import type { Archivo } from './api';

export type EstadoPublicacion = 'pendiente' | 'publicado' | 'retirado';

export interface DocumentoNormativo {
  id: string;
  titulo: string;
  orden: number;
  estado: EstadoPublicacion;
  archivo: Archivo | null;
}

export interface SeccionNormativa {
  id: string;
  titulo: string;
  descripcion: string | null;
  orden: number;
  totalDocumentos: number;
  totalPublicados: number;
  documentos: DocumentoNormativo[];
}

export interface DatosNormatividad {
  secciones: SeccionNormativa[];
}

export interface GrupoConcesion {
  id: string;
  titulo: string;
  orden: number;
  documentoPrincipal: DocumentoNormativo;
  anexos: DocumentoNormativo[];
  totalAnexos: number;
}

export interface DatosTitulo {
  grupos: GrupoConcesion[];
}
