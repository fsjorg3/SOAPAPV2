import { Request, Response, NextFunction } from 'express';
import { ErrorProblema, problemaInterno, problemaNoEncontrado, responderProblema } from '../utils/problema';

/** Catch-all al final de cada router de v1: ninguna ruta hizo match. */
export function rutaNoEncontradaV1(req: Request, res: Response): void {
  const error = problemaNoEncontrado(`No existe la ruta ${req.method} ${req.originalUrl}.`, 'RUTA_NO_ENCONTRADA');
  responderProblema(res, error, req.originalUrl);
}

/**
 * Middleware de error de Express (4 argumentos, así lo reconoce automáticamente). Solo se monta
 * en los routers de /api/v1 — las rutas legacy nunca llaman next(err), así que este handler no
 * puede interceptar ni alterar el formato de error legado.
 */
export function manejadorErroresV1(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  if (res.headersSent) {
    return;
  }

  let error: ErrorProblema;
  if (err instanceof ErrorProblema) {
    error = err;
  } else {
    console.error('[v1] Error no controlado:', err);
    error = problemaInterno();
  }

  responderProblema(res, error, req.originalUrl);
}
