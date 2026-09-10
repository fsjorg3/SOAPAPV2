import { Request, Response, NextFunction } from 'express';
import * as mailService from '../services/mail.service';

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

function validarCampoTexto(valor: unknown, campo: string, maxLen: number): string | null {
  if (typeof valor !== 'string' || valor.trim().length === 0) {
    return `El campo "${campo}" es requerido.`;
  }
  if (valor.length > maxLen) {
    return `El campo "${campo}" excede la longitud máxima permitida (${maxLen}).`;
  }
  return null;
}

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

function validarCuerpo(body: CuerpoContacto): string | null {
  const camposTexto: Array<[keyof typeof LIMITES, number]> = [
    ['name', LIMITES.name],
    ['address', LIMITES.address],
    ['comment', LIMITES.comment],
  ];

  for (const [campo, maxLen] of camposTexto) {
    const error = validarCampoTexto(body[campo], campo, maxLen);
    if (error) return error;
  }

  const errorNis = validarNis(body.nis);
  if (errorNis) return errorNis;

  if (typeof body.phone !== 'string' || !PATRON_TELEFONO.test(body.phone)) {
    return 'El teléfono debe contener exactamente 10 dígitos numéricos.';
  }

  if (typeof body.email !== 'string' || body.email.length > 200 || !PATRON_EMAIL.test(body.email)) {
    return 'El correo electrónico no tiene un formato válido.';
  }

  return null;
}

export const validateContactForm = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  try {
    const body = req.body as CuerpoContacto;
    const errorValidacion = validarCuerpo(body);

    if (errorValidacion) {
      res.status(400).json({ success: false, message: errorValidacion });
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
      res.status(502).json({
        success: false,
        message: 'Ocurrió un problema al enviar tu mensaje. Intenta de nuevo más tarde o comunícate a nuestros teléfonos de atención.',
      });
      return;
    }

    res.status(200).json({ success: true, message: 'Tu mensaje fue enviado correctamente.' });
  } catch (error) {
    console.error('[contacto] Error inesperado:', error);
    res.status(500).json({ success: false, message: 'Ocurrió un error inesperado.' });
  }
};
