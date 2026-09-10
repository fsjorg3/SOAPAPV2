import { Request, Response } from 'express';
import * as catalogoConvocatorias from '../services/catalogoConvocatorias.service';
import { MetadatosRespuesta } from '../types/api.types';

function generarMeta(): MetadatosRespuesta {
  return { generadoEn: new Date().toISOString() };
}

export function listarConvocatorias(_req: Request, res: Response): void {
  res.json({ data: catalogoConvocatorias.obtenerConvocatorias(), meta: generarMeta() });
}
