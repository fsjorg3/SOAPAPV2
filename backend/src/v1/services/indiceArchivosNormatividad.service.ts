import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ModeladoNormatividad, ModeladoTitulo, DocumentoArchivo } from '../types/modeladoNormatividad.types';
import { Archivo } from '../types/api.types';
import { estaContenidaEnPdfPath } from './indiceArchivos.service';

const LONGITUD_HASH = 12;

const pdfPath = path.resolve(process.env.PDF_STORAGE_PATH || './assets');

export type CatalogoNombre = 'normatividad' | 'titulo';

export interface EntradaIndiceNormatividad {
  archivoId: string;
  rutaAbsoluta: string;
  rutaRelativaPosix: string;
  nombreArchivo: string;
  catalogo: CatalogoNombre;
  estado: 'publicado' | 'retirado';
  tamanoBytes?: number;
  fechaPublicacion?: string;
}

let indicePorId = new Map<string, EntradaIndiceNormatividad>();
let indicePorRuta = new Map<string, EntradaIndiceNormatividad>();

function clavePorRuta(catalogo: CatalogoNombre, link: string): string {
  return `${catalogo}::${link}`;
}

function indexarDocumento(
  catalogo: CatalogoNombre,
  documento: DocumentoArchivo,
  contexto: string,
  nuevoPorId: Map<string, EntradaIndiceNormatividad>,
  nuevoPorRuta: Map<string, EntradaIndiceNormatividad>
): void {
  const { link, estado } = documento;
  if (estado === 'pendiente' || !link) return;

  const rutaRelativaPosix = `${catalogo}/${link}`.replace(/\\/g, '/');
  const rutaAbsoluta = path.resolve(pdfPath, catalogo, link);

  if (!estaContenidaEnPdfPath(rutaAbsoluta)) {
    console.warn(`[v1] Se descartó un link fuera de la carpeta de PDFs: catalogo=${catalogo} ${contexto} link=${link}`);
    return;
  }

  const existeEnDisco = fs.existsSync(rutaAbsoluta);
  if (estado === 'publicado' && !existeEnDisco) {
    console.warn(
      `[v1] Inconsistencia de datos: documento publicado sin archivo físico. catalogo=${catalogo} ${contexto} rutaEsperada=${rutaAbsoluta}`
    );
  }

  const archivoId = `archivo_${crypto.createHash('sha256').update(rutaRelativaPosix).digest('hex').slice(0, LONGITUD_HASH)}`;

  const existente = nuevoPorId.get(archivoId);
  if (existente && existente.rutaRelativaPosix !== rutaRelativaPosix) {
    throw new Error(
      `[v1] Colisión de archivoId entre "${existente.rutaRelativaPosix}" y "${rutaRelativaPosix}" (${archivoId}). Abortando arranque.`
    );
  }

  let tamanoBytes: number | undefined;
  let fechaPublicacion: string | undefined;
  if (existeEnDisco) {
    const stat = fs.statSync(rutaAbsoluta);
    tamanoBytes = stat.size;
    fechaPublicacion = stat.mtime.toISOString();
  }

  const entrada: EntradaIndiceNormatividad = {
    archivoId,
    rutaAbsoluta,
    rutaRelativaPosix,
    nombreArchivo: path.basename(link),
    catalogo,
    estado,
    tamanoBytes,
    fechaPublicacion,
  };

  nuevoPorId.set(archivoId, entrada);
  nuevoPorRuta.set(clavePorRuta(catalogo, link), entrada);
}

/**
 * Recorre normatividad (sección -> documento) y título de concesión (grupo -> documento
 * principal + anexos) y construye el índice archivoId -> archivo físico, únicamente a partir de
 * los `link` declarados en los catálogos ya cargados. Se llama una sola vez al boot; el resultado
 * vive en memoria de proceso hasta el próximo reinicio.
 */
export function construirIndice(normatividad: ModeladoNormatividad, titulo: ModeladoTitulo): void {
  const nuevoPorId = new Map<string, EntradaIndiceNormatividad>();
  const nuevoPorRuta = new Map<string, EntradaIndiceNormatividad>();

  for (const seccion of normatividad.secciones) {
    for (const documento of seccion.documentos) {
      indexarDocumento('normatividad', documento, `seccion=${seccion.id} documento=${documento.id}`, nuevoPorId, nuevoPorRuta);
    }
  }

  for (const grupo of titulo.grupos) {
    indexarDocumento('titulo', grupo.documentoPrincipal, `grupo=${grupo.id} documento=${grupo.documentoPrincipal.id}`, nuevoPorId, nuevoPorRuta);
    for (const anexo of grupo.anexos) {
      indexarDocumento('titulo', anexo, `grupo=${grupo.id} anexo=${anexo.id}`, nuevoPorId, nuevoPorRuta);
    }
  }

  indicePorId = nuevoPorId;
  indicePorRuta = nuevoPorRuta;
}

export function resolverPorArchivoId(archivoId: string): EntradaIndiceNormatividad | undefined {
  return indicePorId.get(archivoId);
}

/**
 * Traduce (catalogo, link fuente) al objeto Archivo público, o null si ese link no quedó
 * indexado (periodo/documento no publicado, o descartado por seguridad).
 */
export function resolverArchivoPublico(catalogo: CatalogoNombre, link: string): Archivo | null {
  const entrada = indicePorRuta.get(clavePorRuta(catalogo, link));
  if (!entrada) return null;
  return {
    id: entrada.archivoId,
    nombre: entrada.nombreArchivo,
    tipo: 'application/pdf',
    tamanoBytes: entrada.tamanoBytes,
    fechaPublicacion: entrada.fechaPublicacion,
    urlVisualizacion: `/api/v1/archivos/${entrada.archivoId}/ver`,
    urlDescarga: `/api/v1/archivos/${entrada.archivoId}/descargar`,
  };
}
