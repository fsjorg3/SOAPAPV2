import fs from 'fs';
import path from 'path';
import { ModeladoAnio, SeccionFuente, ClavePeriodo, Periodicidad } from '../types/modelado.types';
import {
  Ejercicio,
  EstadoEjercicio,
  SeccionResumen,
  PeriodoCatalogo,
  Documento,
  DatosDetalleSeccion,
  CoincidenciaBusqueda,
  FiltrosSeccion,
} from '../types/api.types';
import { CATALOGO_PERIODOS, periodicidadMasGranular } from '../utils/periodos.constants';
import * as indiceArchivos from './indiceArchivos.service';
import ejerciciosConfig from '../config/ejercicios.config.json';

const pdfPath = path.resolve(process.env.PDF_STORAGE_PATH || './assets');
const INFORMACION_FINANCIERA_DIR = path.join(pdfPath, 'informacion_financiera');

interface ConfigEjercicios {
  porDefecto: EstadoEjercicio;
  overrides: Record<string, EstadoEjercicio>;
}

const configEjercicios = ejerciciosConfig as ConfigEjercicios;

let catalogos = new Map<number, ModeladoAnio>();

function validarEstructuraBasica(data: unknown, año: number): data is ModeladoAnio {
  if (!data || typeof data !== 'object') return false;
  const candidato = data as Partial<ModeladoAnio>;
  return candidato.año === año && Array.isArray(candidato.secciones);
}

/**
 * Carga en memoria cada assets/informacion_financiera/{año}/{año}.modelado.json que exista y
 * dispara la construcción del índice de archivos. Se llama una sola vez desde index.ts antes
 * de app.listen. Lanza si algún catálogo presente no cumple la forma mínima esperada.
 */
export function inicializarCatalogos(): void {
  const nuevosCatalogos = new Map<number, ModeladoAnio>();

  if (!fs.existsSync(INFORMACION_FINANCIERA_DIR)) {
    console.warn(`[v1] No existe ${INFORMACION_FINANCIERA_DIR}; la API v1 no tendrá ejercicios disponibles.`);
  } else {
    const entradas = fs.readdirSync(INFORMACION_FINANCIERA_DIR, { withFileTypes: true });
    for (const entrada of entradas) {
      if (!entrada.isDirectory() || !/^\d{4}$/.test(entrada.name)) continue;
      const año = parseInt(entrada.name, 10);
      const rutaModelado = path.join(INFORMACION_FINANCIERA_DIR, entrada.name, `${año}.modelado.json`);
      if (!fs.existsSync(rutaModelado)) continue;

      const contenido = fs.readFileSync(rutaModelado, 'utf-8');
      const data = JSON.parse(contenido);
      if (!validarEstructuraBasica(data, año)) {
        throw new Error(`[v1] Estructura inválida (año/secciones) en ${rutaModelado}`);
      }
      nuevosCatalogos.set(año, data);
    }
  }

  catalogos = nuevosCatalogos;
  indiceArchivos.construirIndice(catalogos);
}

export function listarEjercicios(): Ejercicio[] {
  return Array.from(catalogos.keys())
    .sort((a, b) => b - a)
    .map((ejercicio) => ({
      ejercicio,
      estado: configEjercicios.overrides[String(ejercicio)] ?? configEjercicios.porDefecto,
    }));
}

function resumirSeccion(seccion: SeccionFuente): SeccionResumen {
  let periodicidad: Periodicidad = seccion.documentos[0]?.periodicidad ?? 'anual';
  let todasAnuales = true;
  let totalArchivosPublicados = 0;

  for (const documento of seccion.documentos) {
    periodicidad = periodicidadMasGranular(periodicidad, documento.periodicidad);
    if (documento.periodicidad !== 'anual') todasAnuales = false;
    totalArchivosPublicados += documento.periodos.filter((p) => p.estado === 'publicado').length;
  }

  const tipo = todasAnuales ? ('documentos_simples' as const) : ('matriz_periodos' as const);

  return {
    id: seccion.id,
    titulo: seccion.titulo,
    orden: seccion.orden,
    periodicidad,
    presentacion: { tipo, mostrarFiltroPeriodo: tipo === 'matriz_periodos' },
    totalDocumentos: seccion.documentos.length,
    totalArchivosPublicados,
  };
}

function catalogoPeriodosDeSeccion(seccion: SeccionFuente): PeriodoCatalogo[] {
  const vistos = new Map<ClavePeriodo, string>();
  for (const documento of seccion.documentos) {
    for (const periodo of documento.periodos) {
      if (!vistos.has(periodo.clave)) vistos.set(periodo.clave, periodo.nombre);
    }
  }
  return Array.from(vistos.entries())
    .map(([clave, nombre]) => ({
      clave,
      nombre,
      nombreCorto: CATALOGO_PERIODOS[clave].nombreCorto,
      orden: CATALOGO_PERIODOS[clave].orden,
    }))
    .sort((a, b) => a.orden - b.orden);
}

export function listarSecciones(ejercicio: number): SeccionResumen[] | null {
  const catalogo = catalogos.get(ejercicio);
  if (!catalogo) return null;
  return [...catalogo.secciones].sort((a, b) => a.orden - b.orden).map(resumirSeccion);
}

export function obtenerSeccion(
  ejercicio: number,
  seccionId: string,
  filtros: FiltrosSeccion = {}
): DatosDetalleSeccion | null | 'PERIODO_INVALIDO' {
  const catalogo = catalogos.get(ejercicio);
  if (!catalogo) return null;

  const seccion = catalogo.secciones.find((s) => s.id === seccionId);
  if (!seccion) return null;

  const periodosCatalogo = catalogoPeriodosDeSeccion(seccion);
  if (filtros.periodo && !periodosCatalogo.some((p) => p.clave === filtros.periodo)) {
    return 'PERIODO_INVALIDO';
  }

  const buscarLower = filtros.buscar?.toLowerCase();
  const documentos: Documento[] = [];

  for (const documentoFuente of [...seccion.documentos].sort((a, b) => a.orden - b.orden)) {
    if (buscarLower && !documentoFuente.titulo.toLowerCase().includes(buscarLower)) continue;

    let periodosFuente = documentoFuente.periodos;
    if (filtros.periodo) periodosFuente = periodosFuente.filter((p) => p.clave === filtros.periodo);
    if (filtros.estado) periodosFuente = periodosFuente.filter((p) => p.estado === filtros.estado);
    if (periodosFuente.length === 0) continue;

    documentos.push({
      id: documentoFuente.id,
      titulo: documentoFuente.titulo,
      descripcion: null,
      periodicidad: documentoFuente.periodicidad,
      orden: documentoFuente.orden,
      accionPreferida: 'ver',
      periodos: periodosFuente.map((p) => ({
        clave: p.clave,
        nombre: p.nombre,
        estado: p.estado,
        archivo: p.estado === 'publicado' && p.link ? indiceArchivos.resolverArchivoPublico(ejercicio, p.link) : null,
      })),
    });
  }

  return {
    ejercicio,
    seccion: resumirSeccion(seccion),
    periodos: periodosCatalogo,
    documentos,
  };
}

export function buscarDocumentos(
  ejercicio: number,
  buscar: string,
  filtros: { seccionId?: string; periodo?: ClavePeriodo; estado?: FiltrosSeccion['estado'] } = {}
): CoincidenciaBusqueda[] | null {
  const catalogo = catalogos.get(ejercicio);
  if (!catalogo) return null;

  const secciones = filtros.seccionId ? catalogo.secciones.filter((s) => s.id === filtros.seccionId) : catalogo.secciones;

  const resultados: CoincidenciaBusqueda[] = [];
  for (const seccionFuente of secciones) {
    const detalle = obtenerSeccion(ejercicio, seccionFuente.id, {
      buscar,
      periodo: filtros.periodo,
      estado: filtros.estado,
    });
    if (!detalle || detalle === 'PERIODO_INVALIDO') continue;
    for (const documento of detalle.documentos) {
      resultados.push({ ejercicio, seccion: { id: seccionFuente.id, titulo: seccionFuente.titulo }, documento });
    }
  }
  return resultados;
}
