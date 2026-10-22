import { Request, Response, NextFunction } from 'express';
import { ParsedQs } from 'qs';
import * as catalogo from '../services/catalogo.service';
import { problemaSolicitudInvalida, problemaNoEncontrado } from '../utils/problema';
import { ClavePeriodo, EstadoPublicacion } from '../types/modelado.types';
import { FiltrosSeccion, MetadatosRespuesta } from '../types/api.types';

const CLAVES_PERIODO: ClavePeriodo[] = ['Q1', 'Q2', 'Q3', 'Q4', 'S1', 'S2', 'ANUAL'];
const ESTADOS_PUBLICACION: EstadoPublicacion[] = ['pendiente', 'publicado', 'retirado'];
const PATRON_IDENTIFICADOR = /^[a-z0-9]+(?:_[a-z0-9]+)*$/;

function generarMeta(): MetadatosRespuesta {
  return { generadoEn: new Date().toISOString() };
}

function parsearEjercicio(valor: string): number | null {
  if (!/^\d+$/.test(valor)) return null;
  const num = parseInt(valor, 10);
  if (num < 2000 || num > 2100) return null;
  return num;
}

function esIdentificadorValido(valor: string): boolean {
  return valor.length > 0 && valor.length <= 100 && PATRON_IDENTIFICADOR.test(valor);
}

function extraerFiltros(query: ParsedQs): { filtros: FiltrosSeccion; codigoError?: string } {
  const filtros: FiltrosSeccion = {};

  if (typeof query.buscar === 'string' && query.buscar.length > 0) {
    filtros.buscar = query.buscar;
  }

  if (typeof query.periodo === 'string') {
    if (!CLAVES_PERIODO.includes(query.periodo as ClavePeriodo)) {
      return { filtros, codigoError: 'PERIODO_FORMATO_INVALIDO' };
    }
    filtros.periodo = query.periodo as ClavePeriodo;
  }

  if (typeof query.estado === 'string') {
    if (!ESTADOS_PUBLICACION.includes(query.estado as EstadoPublicacion)) {
      return { filtros, codigoError: 'ESTADO_FORMATO_INVALIDO' };
    }
    filtros.estado = query.estado as EstadoPublicacion;
  }

  return { filtros };
}

export function listarEjercicios(_req: Request, res: Response): void {
  res.json({ data: catalogo.listarEjercicios(), meta: generarMeta() });
}

export function listarSecciones(req: Request<{ ejercicio: string }>, res: Response, next: NextFunction): void {
  const ejercicio = parsearEjercicio(req.params.ejercicio);
  if (ejercicio === null) {
    next(problemaSolicitudInvalida('El ejercicio fiscal debe ser un entero entre 2000 y 2100.', 'EJERCICIO_INVALIDO'));
    return;
  }

  const secciones = catalogo.listarSecciones(ejercicio);
  if (secciones === null) {
    next(problemaNoEncontrado(`No existe el ejercicio ${ejercicio} o no está publicado.`, 'EJERCICIO_NO_ENCONTRADO'));
    return;
  }

  res.json({ data: { ejercicio, secciones }, meta: generarMeta() });
}

export function obtenerSeccion(
  req: Request<{ ejercicio: string; seccionId: string }>,
  res: Response,
  next: NextFunction
): void {
  const ejercicio = parsearEjercicio(req.params.ejercicio);
  if (ejercicio === null) {
    next(problemaSolicitudInvalida('El ejercicio fiscal debe ser un entero entre 2000 y 2100.', 'EJERCICIO_INVALIDO'));
    return;
  }

  const { seccionId } = req.params;
  if (!esIdentificadorValido(seccionId)) {
    next(problemaSolicitudInvalida('El identificador de sección no tiene un formato válido.', 'SECCION_ID_INVALIDO'));
    return;
  }

  const { filtros, codigoError } = extraerFiltros(req.query);
  if (codigoError) {
    next(problemaSolicitudInvalida('Uno de los filtros de consulta no es válido.', codigoError));
    return;
  }

  const resultado = catalogo.obtenerSeccion(ejercicio, seccionId, filtros);

  if (resultado === null) {
    next(problemaNoEncontrado(`No existe la sección "${seccionId}" en el ejercicio ${ejercicio}.`, 'SECCION_NO_ENCONTRADA'));
    return;
  }
  if (resultado === 'PERIODO_INVALIDO') {
    next(problemaSolicitudInvalida('El periodo solicitado no es válido para esta sección.', 'PERIODO_INVALIDO'));
    return;
  }

  res.json({ data: resultado, meta: generarMeta() });
}

/**
 * Contrato: responses documentadas son solo 200/400/500 (sin 404) — "una lista vacía también
 * devuelve 200". Un ejercicio con formato válido pero sin catálogo cargado se trata como
 * resultado vacío, no como error.
 */
export function buscarDocumentos(req: Request, res: Response, next: NextFunction): void {
  const ejercicioStr = typeof req.query.ejercicio === 'string' ? req.query.ejercicio : '';
  const ejercicio = parsearEjercicio(ejercicioStr);
  if (ejercicio === null) {
    next(
      problemaSolicitudInvalida(
        'El parámetro "ejercicio" es requerido y debe ser un entero entre 2000 y 2100.',
        'EJERCICIO_INVALIDO'
      )
    );
    return;
  }

  const buscar = typeof req.query.buscar === 'string' ? req.query.buscar : '';
  if (buscar.length < 2 || buscar.length > 100) {
    next(
      problemaSolicitudInvalida('El parámetro "buscar" es requerido y debe tener entre 2 y 100 caracteres.', 'BUSCAR_INVALIDO')
    );
    return;
  }

  let seccionId: string | undefined;
  if (typeof req.query.seccionId === 'string') {
    if (!esIdentificadorValido(req.query.seccionId)) {
      next(problemaSolicitudInvalida('El identificador de sección no tiene un formato válido.', 'SECCION_ID_INVALIDO'));
      return;
    }
    seccionId = req.query.seccionId;
  }

  const { filtros, codigoError } = extraerFiltros(req.query);
  if (codigoError) {
    next(problemaSolicitudInvalida('Uno de los filtros de consulta no es válido.', codigoError));
    return;
  }

  const resultados = catalogo.buscarDocumentos(ejercicio, buscar, {
    seccionId,
    periodo: filtros.periodo,
    estado: filtros.estado,
  });

  res.json({ data: { total: resultados?.length ?? 0, resultados: resultados ?? [] }, meta: generarMeta() });
}
