import { Request, Response, NextFunction } from 'express';
import * as mailService from '../services/mail.service';
import { problemaSolicitudInvalida, problemaCorreoNoEnviado } from '../utils/problema';
import { MetadatosRespuesta } from '../types/api.types';

interface CuerpoContacto {
  name?: unknown;
  nis?: unknown;
  phone?: unknown;
  email?: unknown;
  address?: unknown;
  comment?: unknown;
}

const PATRON_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PATRON_TELEFONO = /^[0-9]{10}$/;

const LIMITES = {
  name: 150,
  nis: 30,
  address: 300,
  comment: 2000,
} as const;

/** El NIS es opcional: no todo contacto es un usuario registrado en el padrón de suministro. */
function validarNis(valor: unknown): string | null {
  if (valor === undefined || valor === null || valor === '') {
    return null;
  }
  if (typeof valor !== 'string') {
    return 'El campo "nis" no tiene un formato válido.';
  }
  if (valor.length > LIMITES.nis) {
    return `El campo "nis" excede la longitud máxima permitida (${LIMITES.nis}).`;
  }
  return null;
}

function generarMeta(): MetadatosRespuesta {
  return { generadoEn: new Date().toISOString() };
}

function validarCampoTexto(valor: unknown, campo: string, maxLen: number): string | null {
  if (typeof valor !== 'string' || valor.trim().length === 0) {
    return `El campo "${campo}" es requerido.`;
  }
  if (valor.length > maxLen) {
    return `El campo "${campo}" excede la longitud máxima permitida (${maxLen}).`;
  }
  return null;
}

function validarCuerpo(body: CuerpoContacto): { detail: string; codigo: string } | null {
  const camposTexto: Array<[keyof typeof LIMITES, string]> = [
    ['name', 'CONTACTO_NOMBRE_INVALIDO'],
    ['address', 'CONTACTO_DIRECCION_INVALIDA'],
    ['comment', 'CONTACTO_COMENTARIO_INVALIDO'],
  ];

  for (const [campo, codigo] of camposTexto) {
    const error = validarCampoTexto(body[campo], campo, LIMITES[campo]);
    if (error) return { detail: error, codigo };
  }

  const errorNis = validarNis(body.nis);
  if (errorNis) return { detail: errorNis, codigo: 'CONTACTO_NIS_INVALIDO' };

  if (typeof body.phone !== 'string' || !PATRON_TELEFONO.test(body.phone)) {
    return { detail: 'El teléfono debe contener exactamente 10 dígitos numéricos.', codigo: 'CONTACTO_TELEFONO_INVALIDO' };
  }

  if (typeof body.email !== 'string' || body.email.length > 200 || !PATRON_EMAIL.test(body.email)) {
    return { detail: 'El correo electrónico no tiene un formato válido.', codigo: 'CONTACTO_EMAIL_INVALIDO' };
  }

  return null;
}

export async function enviarContacto(req: Request, res: Response, next: NextFunction): Promise<void> {
  const body = req.body as CuerpoContacto;
  const errorValidacion = validarCuerpo(body);

  if (errorValidacion) {
    next(problemaSolicitudInvalida(errorValidacion.detail, errorValidacion.codigo));
    return;
  }

  const datos = {
    name: (body.name as string).trim(),
    nis: typeof body.nis === 'string' ? body.nis.trim() : '',
    phone: (body.phone as string).trim(),
    email: (body.email as string).trim(),
    address: (body.address as string).trim(),
    comment: (body.comment as string).trim(),
  };

  try {
    await mailService.enviarCorreoContacto(datos);
  } catch (error) {
    console.error('[contacto] Error al enviar correo:', error);
    next(problemaCorreoNoEnviado());
    return;
  }

  res.json({ data: { enviado: true }, meta: generarMeta() });
}
