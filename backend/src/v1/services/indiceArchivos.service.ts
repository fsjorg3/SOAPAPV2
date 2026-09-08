import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ModeladoAnio } from '../types/modelado.types';
import { Archivo } from '../types/api.types';

const LONGITUD_HASH = 12;

const pdfPath = path.resolve(process.env.PDF_STORAGE_PATH || './assets');
const INFORMACION_FINANCIERA_DIR = path.join(pdfPath, 'informacion_financiera');

export interface EntradaIndice {
  archivoId: string;
  rutaAbsoluta: string;
  rutaRelativaPosix: string;
  nombreArchivo: string;
  ejercicio: number;
  estado: 'publicado' | 'retirado';
  tamanoBytes?: number;
  fechaPublicacion?: string;
}

let indicePorId = new Map<string, EntradaIndice>();
let indicePorRuta = new Map<string, EntradaIndice>();

function clavePorRuta(ejercicio: number, link: string): string {
  return `${ejercicio}::${link}`;
}

/** true si rutaAbsoluta sigue dentro de la carpeta raíz de PDFs (defensa en profundidad). */
export function estaContenidaEnPdfPath(rutaAbsoluta: string): boolean {
  const relativa = path.relative(pdfPath, rutaAbsoluta);
  return relativa !== '' && !relativa.startsWith('..') && !path.isAbsolute(relativa);
}

/**
 * Recorre año -> sección -> documento -> periodo y construye el índice archivoId -> archivo
 * físico, únicamente a partir de los `link` declarados en los catálogos ya cargados (nunca
 * escaneando el filesystem libremente). Se llama una sola vez al boot; el resultado vive en
 * memoria de proceso hasta el próximo reinicio.
 */
export function construirIndice(catalogos: Map<number, ModeladoAnio>): void {
  const nuevoPorId = new Map<string, EntradaIndice>();
  const nuevoPorRuta = new Map<string, EntradaIndice>();

  for (const [ejercicio, catalogo] of catalogos) {
    for (const seccion of catalogo.secciones) {
      for (const documento of seccion.documentos) {
        for (const periodo of documento.periodos) {
          const { link, estado } = periodo;
          if (estado === 'pendiente' || !link) continue;

          const rutaRelativaPosix = `informacion_financiera/${ejercicio}/${link}`.replace(/\\/g, '/');
          const rutaAbsoluta = path.resolve(INFORMACION_FINANCIERA_DIR, String(ejercicio), link);

          if (!estaContenidaEnPdfPath(rutaAbsoluta)) {
            console.warn(
              `[v1] Se descartó un link fuera de la carpeta de PDFs: ejercicio=${ejercicio} seccion=${seccion.id} documento=${documento.id} periodo=${periodo.clave} link=${link}`
            );
            continue;
          }

          const existeEnDisco = fs.existsSync(rutaAbsoluta);
          if (estado === 'publicado' && !existeEnDisco) {
            console.warn(
              `[v1] Inconsistencia de datos: periodo publicado sin archivo físico. ejercicio=${ejercicio} seccion=${seccion.id} documento=${documento.id} periodo=${periodo.clave} rutaEsperada=${rutaAbsoluta}`
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

          const entrada: EntradaIndice = {
            archivoId,
            rutaAbsoluta,
            rutaRelativaPosix,
            nombreArchivo: path.basename(link),
            ejercicio,
            estado,
            tamanoBytes,
            fechaPublicacion,
          };

          nuevoPorId.set(archivoId, entrada);
          nuevoPorRuta.set(clavePorRuta(ejercicio, link), entrada);
        }
      }
    }
  }

  indicePorId = nuevoPorId;
  indicePorRuta = nuevoPorRuta;
}

export function resolverPorArchivoId(archivoId: string): EntradaIndice | undefined {
  return indicePorId.get(archivoId);
}

/**
 * Traduce (ejercicio, link fuente) al objeto Archivo público, o null si ese link no quedó
 * indexado (p. ej. porque el propio catalogo.service ya sabe que el periodo no está publicado
 * y ni siquiera debería llamar a esta función, o porque el link fue descartado por seguridad).
 */
export function resolverArchivoPublico(ejercicio: number, link: string): Archivo | null {
  const entrada = indicePorRuta.get(clavePorRuta(ejercicio, link));
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
