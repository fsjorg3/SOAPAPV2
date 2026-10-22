import { Request, Response } from 'express';
import * as catalogoNormatividad from '../services/catalogoNormatividad.service';
import { MetadatosRespuesta } from '../types/api.types';

function generarMeta(): MetadatosRespuesta {
  return { generadoEn: new Date().toISOString() };
}

export function listarNormatividad(_req: Request, res: Response): void {
  res.json({ data: catalogoNormatividad.obtenerNormatividad(), meta: generarMeta() });
}

export function listarTitulo(_req: Request, res: Response): void {
  res.json({ data: catalogoNormatividad.obtenerTitulo(), meta: generarMeta() });
}
