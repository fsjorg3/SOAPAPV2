import { Response } from 'express';
import { Problema } from '../types/api.types';

const BASE_TIPO = 'https://soapap.gob.mx/problemas';

export class ErrorProblema extends Error {
  readonly status: number;
  readonly titulo: string;
  readonly codigo?: string;
  readonly detail?: string;
  readonly type: string;

  constructor(status: number, titulo: string, codigo?: string, detail?: string, type?: string) {
    super(titulo);
    this.status = status;
    this.titulo = titulo;
    this.codigo = codigo;
    this.detail = detail;
    this.type = type ?? `${BASE_TIPO}/${codigo ? codigo.toLowerCase().replace(/_/g, '-') : 'error'}`;
  }

  aProblema(instance?: string): Problema {
    return {
      type: this.type,
      title: this.titulo,
      status: this.status,
      detail: this.detail,
      instance,
      codigo: this.codigo,
    };
  }
}

export function problemaSolicitudInvalida(detail: string, codigo = 'SOLICITUD_INVALIDA'): ErrorProblema {
  return new ErrorProblema(400, 'Solicitud inválida', codigo, detail);
}

export function problemaNoEncontrado(detail: string, codigo = 'NO_ENCONTRADO'): ErrorProblema {
  return new ErrorProblema(404, 'No encontrado', codigo, detail);
}

export function problemaArchivoNoEncontrado(): ErrorProblema {
  return new ErrorProblema(
    404,
    'Archivo no encontrado',
    'ARCHIVO_NO_ENCONTRADO',
    'El identificador no corresponde a un archivo público.'
  );
}

export function problemaArchivoRetirado(): ErrorProblema {
  return new ErrorProblema(
    410,
    'Archivo retirado',
    'ARCHIVO_RETIRADO',
    'El archivo existió, pero fue retirado de publicación.'
  );
}

export function problemaRangoInvalido(totalSize: number): ErrorProblema {
  return new ErrorProblema(
    416,
    'Rango solicitado no válido',
    'RANGO_INVALIDO',
    `El rango solicitado no es satisfacible para un archivo de ${totalSize} bytes.`
  );
}

export function problemaInterno(): ErrorProblema {
  return new ErrorProblema(500, 'Error interno', 'ERROR_INTERNO', 'Ocurrió un error inesperado.');
}

export function problemaCorreoNoEnviado(): ErrorProblema {
  return new ErrorProblema(
    502,
    'No se pudo enviar el mensaje',
    'CORREO_NO_ENVIADO',
    'Ocurrió un problema al enviar tu mensaje. Intenta de nuevo más tarde o escribe directamente a transparencia@soapap.gob.mx.'
  );
}

/**
 * Envía directamente una respuesta application/problem+json sin pasar por next(err). Se usa en
 * rangoArchivo.service para el caso 416, que ocurre dentro de un flujo de streaming en vez del
 * ciclo normal de manejo de errores de Express.
 */
export function responderProblema(res: Response, error: ErrorProblema, instance?: string): void {
  res.status(error.status);
  res.setHeader('Content-Type', 'application/problem+json');
  res.json(error.aProblema(instance));
}
