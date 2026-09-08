import fs from 'fs';
import { Request, Response } from 'express';
import { problemaRangoInvalido, responderProblema } from '../utils/problema';

export interface OpcionesServirPdf {
  rutaAbsoluta: string;
  nombreArchivo: string;
  disposicion: 'inline' | 'attachment';
}

interface RangoValido {
  inicio: number;
  fin: number;
}

/**
 * Parsea un header Range de un único rango (bytes=inicio-fin, sufijo bytes=-N, o abierto
 * bytes=N-). Devuelve `null` si el header no se reconoce o trae múltiples rangos separados por
 * coma (se trata como si no hubiera Range: se sirve 200 completo, evitando implementar
 * respuestas multipart que ningún visor de PDF típico solicita). Devuelve `'invalido'` si el
 * rango está mal formado o fuera de los límites del archivo.
 */
function parsearRango(header: string, totalSize: number): RangoValido | 'invalido' | null {
  if (header.includes(',')) return null;

  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match) return null;

  const [, inicioStr, finStr] = match;
  if (inicioStr === '' && finStr === '') return null;

  let inicio: number;
  let fin: number;

  if (inicioStr === '') {
    const sufijo = parseInt(finStr, 10);
    if (Number.isNaN(sufijo) || sufijo <= 0) return 'invalido';
    inicio = Math.max(0, totalSize - sufijo);
    fin = totalSize - 1;
  } else {
    inicio = parseInt(inicioStr, 10);
    if (Number.isNaN(inicio)) return 'invalido';
    fin = finStr === '' ? totalSize - 1 : parseInt(finStr, 10);
    if (Number.isNaN(fin)) return 'invalido';
  }

  if (inicio < 0 || inicio > fin || inicio >= totalSize) return 'invalido';

  return { inicio, fin: Math.min(fin, totalSize - 1) };
}

/**
 * Sirve un PDF con soporte de range requests (200 completo o 206 parcial), reutilizable tanto
 * por /ver (inline) como por /descargar (attachment). Sin dependencias nuevas: solo fs/http
 * nativos, ya que Express 5 no da esto gratis con res.sendFile.
 */
export function servirPdf(req: Request, res: Response, opts: OpcionesServirPdf): void {
  const stat = fs.statSync(opts.rutaAbsoluta);
  const totalSize = stat.size;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Content-Disposition', `${opts.disposicion}; filename="${opts.nombreArchivo}"`);
  res.setHeader('Last-Modified', stat.mtime.toUTCString());
  res.setHeader('ETag', `"${totalSize}-${stat.mtime.getTime()}"`);

  const enviarFlujo = (inicio?: number, fin?: number): void => {
    const stream = fs.createReadStream(opts.rutaAbsoluta, inicio !== undefined ? { start: inicio, end: fin } : undefined);

    stream.on('error', (err) => {
      console.error('[v1] Error leyendo PDF:', err);
      if (!res.headersSent) {
        res.status(500).end();
      } else {
        res.destroy();
      }
    });

    req.on('close', () => {
      if (!res.writableEnded) stream.destroy();
    });

    stream.pipe(res);
  };

  const rangoHeader = req.headers.range;

  if (!rangoHeader) {
    res.status(200);
    res.setHeader('Content-Length', totalSize);
    enviarFlujo();
    return;
  }

  const rango = parsearRango(rangoHeader, totalSize);

  if (rango === null) {
    res.status(200);
    res.setHeader('Content-Length', totalSize);
    enviarFlujo();
    return;
  }

  if (rango === 'invalido') {
    res.setHeader('Content-Range', `bytes */${totalSize}`);
    responderProblema(res, problemaRangoInvalido(totalSize), req.originalUrl);
    return;
  }

  const { inicio, fin } = rango;
  res.status(206);
  res.setHeader('Content-Range', `bytes ${inicio}-${fin}/${totalSize}`);
  res.setHeader('Content-Length', fin - inicio + 1);
  enviarFlujo(inicio, fin);
}
