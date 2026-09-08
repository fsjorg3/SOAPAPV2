export type EstadoPublicacion = 'pendiente' | 'publicado' | 'retirado';

export interface DocumentoArchivo {
  id: string;
  titulo: string;
  orden: number;
  link: string | null;
  estado: EstadoPublicacion;
}

export interface SeccionNormativa {
  id: string;
  titulo: string;
  descripcion: string | null;
  orden: number;
  documentos: DocumentoArchivo[];
}

export interface ModeladoNormatividad {
  secciones: SeccionNormativa[];
}

export interface GrupoConcesion {
  id: string;
  titulo: string;
  orden: number;
  documentoPrincipal: DocumentoArchivo;
  anexos: DocumentoArchivo[];
}

export interface ModeladoTitulo {
  grupos: GrupoConcesion[];
}
