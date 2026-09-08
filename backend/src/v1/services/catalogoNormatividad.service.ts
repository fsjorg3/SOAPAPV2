import fs from 'fs';
import path from 'path';
import { ModeladoNormatividad, ModeladoTitulo, DocumentoArchivo, SeccionNormativa, GrupoConcesion } from '../types/modeladoNormatividad.types';
import { DatosNormatividad, DatosTitulo, DocumentoPublico, SeccionNormativaPublica, GrupoConcesionPublica } from '../types/api.types';
import * as indiceArchivosNormatividad from './indiceArchivosNormatividad.service';

const pdfPath = path.resolve(process.env.PDF_STORAGE_PATH || './assets');

let catalogoNormatividad: ModeladoNormatividad = { secciones: [] };
let catalogoTitulo: ModeladoTitulo = { grupos: [] };

function cargarJson<T>(rutaAbsoluta: string, etiqueta: string): T | null {
  if (!fs.existsSync(rutaAbsoluta)) {
    console.warn(`[v1] No existe ${rutaAbsoluta}; el catálogo de ${etiqueta} quedará vacío.`);
    return null;
  }
  const contenido = fs.readFileSync(rutaAbsoluta, 'utf-8');
  return JSON.parse(contenido) as T;
}

/**
 * Carga en memoria assets/normatividad/normatividad.modelado.json y
 * assets/titulo/titulo.modelado.json (si existen) y dispara la construcción del índice de
 * archivos de normatividad. Se llama una sola vez desde index.ts antes de app.listen.
 */
export function inicializarCatalogoNormatividad(): void {
  catalogoNormatividad = cargarJson<ModeladoNormatividad>(
    path.join(pdfPath, 'normatividad', 'normatividad.modelado.json'),
    'normatividad'
  ) ?? { secciones: [] };

  catalogoTitulo = cargarJson<ModeladoTitulo>(
    path.join(pdfPath, 'titulo', 'titulo.modelado.json'),
    'título de concesión'
  ) ?? { grupos: [] };

  indiceArchivosNormatividad.construirIndice(catalogoNormatividad, catalogoTitulo);
}

function documentoPublico(catalogo: indiceArchivosNormatividad.CatalogoNombre, documento: DocumentoArchivo): DocumentoPublico {
  return {
    id: documento.id,
    titulo: documento.titulo,
    orden: documento.orden,
    estado: documento.estado,
    archivo:
      documento.estado === 'publicado' && documento.link
        ? indiceArchivosNormatividad.resolverArchivoPublico(catalogo, documento.link)
        : null,
  };
}

function seccionPublica(seccion: SeccionNormativa): SeccionNormativaPublica {
  const documentos = [...seccion.documentos].sort((a, b) => a.orden - b.orden).map((d) => documentoPublico('normatividad', d));
  return {
    id: seccion.id,
    titulo: seccion.titulo,
    descripcion: seccion.descripcion,
    orden: seccion.orden,
    totalDocumentos: documentos.length,
    totalPublicados: documentos.filter((d) => d.estado === 'publicado').length,
    documentos,
  };
}

function grupoPublico(grupo: GrupoConcesion): GrupoConcesionPublica {
  const anexos = [...grupo.anexos].sort((a, b) => a.orden - b.orden).map((a) => documentoPublico('titulo', a));
  return {
    id: grupo.id,
    titulo: grupo.titulo,
    orden: grupo.orden,
    documentoPrincipal: documentoPublico('titulo', grupo.documentoPrincipal),
    anexos,
    totalAnexos: anexos.length,
  };
}

export function obtenerNormatividad(): DatosNormatividad {
  const secciones = [...catalogoNormatividad.secciones].sort((a, b) => a.orden - b.orden).map(seccionPublica);
  return { secciones };
}

export function obtenerTitulo(): DatosTitulo {
  const grupos = [...catalogoTitulo.grupos].sort((a, b) => a.orden - b.orden).map(grupoPublico);
  return { grupos };
}
