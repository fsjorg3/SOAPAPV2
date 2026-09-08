import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import * as indiceArchivos from '../services/indiceArchivos.service';
import * as indiceArchivosNormatividad from '../services/indiceArchivosNormatividad.service';
import { servirPdf } from '../services/rangoArchivo.service';
import { problemaArchivoNoEncontrado, problemaArchivoRetirado } from '../utils/problema';

function resolverYServir(
  req: Request<{ archivoId: string }>,
  res: Response,
  next: NextFunction,
  disposicion: 'inline' | 'attachment'
): void {
  const { archivoId } = req.params;
  const entrada = indiceArchivos.resolverPorArchivoId(archivoId) ?? indiceArchivosNormatividad.resolverPorArchivoId(archivoId);

  if (!entrada) {
    next(problemaArchivoNoEncontrado());
    return;
  }
  if (entrada.estado === 'retirado') {
    next(problemaArchivoRetirado());
    return;
  }
  // Re-chequeo defensivo en caliente: nunca confiar solo en lo calculado al boot.
  if (!indiceArchivos.estaContenidaEnPdfPath(entrada.rutaAbsoluta) || !fs.existsSync(entrada.rutaAbsoluta)) {
    next(problemaArchivoNoEncontrado());
    return;
  }

  servirPdf(req, res, {
    rutaAbsoluta: entrada.rutaAbsoluta,
    nombreArchivo: entrada.nombreArchivo,
    disposicion,
  });
}

export function visualizar(req: Request<{ archivoId: string }>, res: Response, next: NextFunction): void {
  resolverYServir(req, res, next, 'inline');
}

export function descargar(req: Request<{ archivoId: string }>, res: Response, next: NextFunction): void {
  resolverYServir(req, res, next, 'attachment');
}
