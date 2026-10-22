import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ModeladoConvocatorias } from '../types/modeladoConvocatorias.types';
import { Archivo } from '../types/api.types';
import { estaContenidaEnPdfPath } from './indiceArchivos.service';

const LONGITUD_HASH = 12;
const DOMINIO = 'convocatorias';

const pdfPath = path.resolve(process.env.PDF_STORAGE_PATH || './assets');

export interface EntradaIndiceConvocatoria {
  archivoId: string;
  rutaAbsoluta: string;
  rutaRelativaPosix: string;
  nombreArchivo: string;
  estado: 'publicado' | 'retirado';
  tamanoBytes?: number;
  fechaPublicacion?: string;
}

let indicePorId = new Map<string, EntradaIndiceConvocatoria>();
let indicePorRuta = new Map<string, EntradaIndiceConvocatoria>();

/**
 * Recorre la lista plana de convocatorias y construye el índice archivoId -> archivo físico,
 * únicamente a partir de los `link` declarados en el catálogo ya cargado. Se llama una sola vez
 * al boot; el resultado vive en memoria de proceso hasta el próximo reinicio.
 */
export function construirIndice(modelado: ModeladoConvocatorias): void {
  const nuevoPorId = new Map<string, EntradaIndiceConvocatoria>();
  const nuevoPorRuta = new Map<string, EntradaIndiceConvocatoria>();

  for (const convocatoria of modelado.convocatorias) {
    const { link, estado } = convocatoria;
    if (estado === 'pendiente' || !link) continue;

    const rutaRelativaPosix = `${DOMINIO}/${link}`.replace(/\\/g, '/');
    const rutaAbsoluta = path.resolve(pdfPath, DOMINIO, link);

    if (!estaContenidaEnPdfPath(rutaAbsoluta)) {
      console.warn(`[v1] Se descartó un link fuera de la carpeta de PDFs: convocatoria=${convocatoria.id} link=${link}`);
      continue;
    }

    const existeEnDisco = fs.existsSync(rutaAbsoluta);
    if (estado === 'publicado' && !existeEnDisco) {
      console.warn(`[v1] Inconsistencia de datos: convocatoria publicada sin archivo físico. convocatoria=${convocatoria.id} rutaEsperada=${rutaAbsoluta}`);
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

    const entrada: EntradaIndiceConvocatoria = {
      archivoId,
      rutaAbsoluta,
      rutaRelativaPosix,
      nombreArchivo: path.basename(link),
      estado,
      tamanoBytes,
      fechaPublicacion,
    };

    nuevoPorId.set(archivoId, entrada);
    nuevoPorRuta.set(link, entrada);
  }

  indicePorId = nuevoPorId;
  indicePorRuta = nuevoPorRuta;
}

export function resolverPorArchivoId(archivoId: string): EntradaIndiceConvocatoria | undefined {
  return indicePorId.get(archivoId);
}

/**
 * Traduce un link fuente al objeto Archivo público, o null si ese link no quedó indexado
 * (convocatoria no publicada, o descartado por seguridad).
 */
export function resolverArchivoPublico(link: string): Archivo | null {
  const entrada = indicePorRuta.get(link);
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
