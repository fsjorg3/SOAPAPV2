import fs from 'fs';
import path from 'path';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import type {
  ModeladoAnio,
  SeccionFuente,
  DocumentoFuente,
  PeriodoFuente,
  ClavePeriodo,
  EstadoPublicacion,
  Periodicidad,
} from '../src/v1/types/modelado.types';

const RAIZ_BACKEND = path.resolve(__dirname, '..');
const RUTA_SCHEMA = path.join(RAIZ_BACKEND, 'documentacion', 'modelado_financiero.schema.json');
const RUTA_ORIGEN_2026 = path.join(RAIZ_BACKEND, 'documentacion', '2026_modelado.json');
const RUTA_TAREAS_PENDIENTES = path.join(RAIZ_BACKEND, 'documentacion', 'tareas-pendientes-informacion-financiera.md');
const DIR_ASSETS_INFO_FINANCIERA = path.join(RAIZ_BACKEND, 'assets', 'informacion_financiera');

const AÑOS_A_TRANSFORMAR = [2021, 2022, 2023, 2024, 2025];
const NOMBRES_TRIMESTRE = ['Primer trimestre', 'Segundo trimestre', 'Tercer trimestre', 'Cuarto trimestre'];

function cargarJSON(ruta: string): any {
  return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
}

function validarContraSchema(data: unknown): void {
  const schema = cargarJSON(RUTA_SCHEMA);
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  const validar = ajv.compile(schema);
  const valido = validar(data);
  if (!valido) {
    console.error('Errores de validación:');
    for (const err of validar.errors ?? []) {
      console.error(`  ${err.instancePath || '(raíz)'} ${err.message}`);
    }
    throw new Error('El JSON no cumple el schema modelado_financiero.schema.json.');
  }
}

function verificarArchivosFisicos(data: any, año: number): void {
  for (const seccion of data.secciones) {
    for (const documento of seccion.documentos) {
      for (const periodo of documento.periodos) {
        if (!periodo.link) continue;
        const rutaFisica = path.join(DIR_ASSETS_INFO_FINANCIERA, String(año), periodo.link);
        if (!fs.existsSync(rutaFisica)) {
          console.warn(
            `ADVERTENCIA: no existe el archivo físico para ${seccion.id}/${documento.id}/${periodo.clave}: ${rutaFisica}`
          );
        }
      }
    }
  }
}

/**
 * Copia documentacion/2026_modelado.json (ya curado a mano) a
 * assets/informacion_financiera/2026/2026.modelado.json, validándolo primero contra el schema.
 */
function copiar2026(): void {
  console.log(`Leyendo ${RUTA_ORIGEN_2026}...`);
  const data = cargarJSON(RUTA_ORIGEN_2026);

  console.log('Validando contra modelado_financiero.schema.json...');
  validarContraSchema(data);
  console.log('✓ Válido.');

  verificarArchivosFisicos(data, data.año);

  const dirDestino = path.join(DIR_ASSETS_INFO_FINANCIERA, String(data.año));
  fs.mkdirSync(dirDestino, { recursive: true });
  const rutaDestino = path.join(dirDestino, `${data.año}.modelado.json`);
  fs.writeFileSync(rutaDestino, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`✓ Escrito ${rutaDestino}`);
}

// ---------------------------------------------------------------------------
// Subcomando `transformar`: migra los .json legado (2021-2025) al nuevo schema
// ---------------------------------------------------------------------------

export interface DocumentoLegado {
  titulo: string;
  link: string;
}

export interface PeriodoLegado {
  periodo: string;
  documentos: DocumentoLegado[];
}

export interface SeccionLegado {
  titulo: string;
  periodos: PeriodoLegado[];
}

export interface ModeladoLegado {
  año: number;
  secciones: SeccionLegado[];
}

type TipoPendiente = 'url_externa' | 'acento_roto';

interface Pendiente {
  tipo: TipoPendiente;
  año: number;
  seccionId: string;
  documentoTitulo: string;
  periodoClave: string;
  valorOriginal: string;
}

export interface EntradaCanonicaDocumento {
  id: string;
  orden: number;
}

export interface EntradaCanonicaSeccion {
  id: string;
  orden: number;
  documentos: Map<string, EntradaCanonicaDocumento>;
}

/** minúsculas, sin acentos, sin puntuación, sin palabras consecutivas repetidas ("Estado Estado X" -> "estado x") */
const RANGO_DIACRITICOS = new RegExp('[\\u0300-\\u036f]', 'g');

export function normalizarTitulo(titulo: string): string {
  const base = titulo
    .normalize('NFD')
    .replace(RANGO_DIACRITICOS, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return base.replace(/\b(\w+)(?:\s+\1\b)+/g, '$1');
}

export function slugify(texto: string): string {
  return normalizarTitulo(texto).replace(/\s+/g, '_');
}

function quitarSufijoAnio(titulo: string, año: number): string {
  return titulo.replace(new RegExp(`\\s*${año}\\s*$`), '').trim();
}

/** Carga documentacion/2026_modelado.json y arma el mapa tituloNormalizado -> id/orden, por sección. */
function construirMapaCanonico(): Map<string, EntradaCanonicaSeccion> {
  const origen = cargarJSON(RUTA_ORIGEN_2026) as ModeladoAnio;
  const mapa = new Map<string, EntradaCanonicaSeccion>();
  for (const seccion of origen.secciones) {
    const documentos = new Map<string, EntradaCanonicaDocumento>();
    for (const documento of seccion.documentos) {
      documentos.set(normalizarTitulo(documento.titulo), { id: documento.id, orden: documento.orden });
    }
    mapa.set(normalizarTitulo(seccion.titulo), { id: seccion.id, orden: seccion.orden, documentos });
  }
  return mapa;
}

function resolverPeriodoEstado(
  linkOriginal: string,
  contexto: { año: number; seccionId: string; documentoTitulo: string; periodoClave: string },
  pendientes: Pendiente[]
): { link: string | null; estado: EstadoPublicacion } {
  if (!linkOriginal) {
    return { link: null, estado: 'pendiente' };
  }
  if (/^https?:\/\//i.test(linkOriginal)) {
    pendientes.push({ tipo: 'url_externa', valorOriginal: linkOriginal, ...contexto });
    return { link: null, estado: 'pendiente' };
  }
  if (contexto.año <= 2023) {
    pendientes.push({ tipo: 'acento_roto', valorOriginal: linkOriginal, ...contexto });
  }
  return { link: linkOriginal, estado: 'publicado' };
}

/** Pivota una sección legado sección->periodo->documentos a sección->documento->periodos (trimestral o semestral). */
function transformarSeccionPivote(
  seccionLegado: SeccionLegado,
  claves: ClavePeriodo[],
  periodicidad: Periodicidad,
  entradaCanonica: EntradaCanonicaSeccion | undefined,
  ordenSeccionFallback: number,
  año: number,
  pendientes: Pendiente[]
): SeccionFuente {
  const seccionId = entradaCanonica?.id ?? slugify(seccionLegado.titulo);

  const ordenTitulos: string[] = [];
  const porTitulo = new Map<string, { titulo: string; links: string[] }>();

  seccionLegado.periodos.forEach((periodoLegado, idx) => {
    for (const doc of periodoLegado.documentos) {
      const claveTitulo = normalizarTitulo(doc.titulo);
      if (!porTitulo.has(claveTitulo)) {
        porTitulo.set(claveTitulo, { titulo: doc.titulo, links: new Array(claves.length).fill('') });
        ordenTitulos.push(claveTitulo);
      }
      porTitulo.get(claveTitulo)!.links[idx] = doc.link;
    }
  });

  const documentos: DocumentoFuente[] = ordenTitulos.map((claveTitulo, i) => {
    const { titulo, links } = porTitulo.get(claveTitulo)!;
    const canonicoDoc = entradaCanonica?.documentos.get(claveTitulo);
    const id = canonicoDoc?.id ?? slugify(titulo);

    const periodos: PeriodoFuente[] = links.map((link, idx) => {
      const clave = claves[idx];
      const nombre = seccionLegado.periodos[idx].periodo;
      const { link: linkResuelto, estado } = resolverPeriodoEstado(
        link,
        { año, seccionId, documentoTitulo: titulo, periodoClave: clave },
        pendientes
      );
      return { clave, nombre, link: linkResuelto, estado };
    });

    return { id, titulo, periodicidad, orden: i + 1, periodos };
  });

  return {
    id: seccionId,
    titulo: seccionLegado.titulo,
    orden: entradaCanonica?.orden ?? ordenSeccionFallback,
    documentos,
  };
}

const RE_FICHA_TECNICA = /^ficha t[eé]cnica programa presupuestario (primer|segundo|tercer|cuarto) trimestre$/i;
const ORDINAL_A_CLAVE: Record<string, ClavePeriodo> = { primer: 'Q1', segundo: 'Q2', tercer: 'Q3', cuarto: 'Q4' };
const TITULO_FICHA_TECNICA = 'Ficha Técnica Programa Presupuestario';

/**
 * Transforma una sección legado cuyo único "periodo" repite el título de la sección (secciones
 * 5-8 del legado): cada documento real se vuelve un documento independiente `periodicidad: anual`
 * con un único periodo ANUAL. Colapsa el caso especial "Ficha Técnica ... {Ordinal} Trimestre"
 * (2024/2025) en un solo documento trimestral, igual que en 2026.modelado.json.
 */
function transformarSeccionAnioWrapper(
  seccionLegado: SeccionLegado,
  entradaCanonica: EntradaCanonicaSeccion | undefined,
  ordenSeccionFallback: number,
  año: number,
  pendientes: Pendiente[]
): SeccionFuente {
  const seccionId = entradaCanonica?.id ?? slugify(seccionLegado.titulo);
  const periodoLegado = seccionLegado.periodos[0];
  const tituloSeccionNorm = normalizarTitulo(seccionLegado.titulo);

  // Descarta el documento placeholder (título idéntico al de la sección) solo si hay más
  // documentos reales; si fuera el único, se conserva para no dejar `documentos` vacío.
  const docsReales = periodoLegado.documentos.filter((doc) => normalizarTitulo(doc.titulo) !== tituloSeccionNorm);
  const listaDocs = docsReales.length > 0 ? docsReales : periodoLegado.documentos;

  const fichaTecnica: { clave: ClavePeriodo; link: string }[] = [];
  const restantes: DocumentoLegado[] = [];
  for (const doc of listaDocs) {
    const m = doc.titulo.match(RE_FICHA_TECNICA);
    if (m) {
      fichaTecnica.push({ clave: ORDINAL_A_CLAVE[m[1].toLowerCase()], link: doc.link });
    } else {
      restantes.push(doc);
    }
  }

  const documentos: DocumentoFuente[] = [];

  if (fichaTecnica.length > 0) {
    const canonicoDoc = entradaCanonica?.documentos.get(normalizarTitulo(TITULO_FICHA_TECNICA));
    const id = canonicoDoc?.id ?? slugify(TITULO_FICHA_TECNICA);
    const claves: ClavePeriodo[] = ['Q1', 'Q2', 'Q3', 'Q4'];
    const periodos: PeriodoFuente[] = claves.map((clave, idx) => {
      const entrada = fichaTecnica.find((f) => f.clave === clave);
      const { link, estado } = resolverPeriodoEstado(
        entrada?.link ?? '',
        { año, seccionId, documentoTitulo: TITULO_FICHA_TECNICA, periodoClave: clave },
        pendientes
      );
      return { clave, nombre: NOMBRES_TRIMESTRE[idx], link, estado };
    });
    documentos.push({ id, titulo: TITULO_FICHA_TECNICA, periodicidad: 'trimestral', orden: documentos.length + 1, periodos });
  }

  for (const doc of restantes) {
    const tituloSinAnio = quitarSufijoAnio(doc.titulo, año);
    const canonicoDoc = entradaCanonica?.documentos.get(normalizarTitulo(tituloSinAnio));
    const id = canonicoDoc?.id ?? slugify(tituloSinAnio);
    const { link, estado } = resolverPeriodoEstado(
      doc.link,
      { año, seccionId, documentoTitulo: tituloSinAnio, periodoClave: 'ANUAL' },
      pendientes
    );
    documentos.push({
      id,
      titulo: tituloSinAnio,
      periodicidad: 'anual',
      orden: documentos.length + 1,
      periodos: [{ clave: 'ANUAL', nombre: `Ejercicio fiscal ${año}`, link, estado }],
    });
  }

  return {
    id: seccionId,
    titulo: seccionLegado.titulo,
    orden: entradaCanonica?.orden ?? ordenSeccionFallback,
    documentos,
  };
}

export function transformarLegado(
  legado: ModeladoLegado,
  año: number,
  mapaCanonico: Map<string, EntradaCanonicaSeccion>
): { data: ModeladoAnio; pendientes: Pendiente[] } {
  const pendientes: Pendiente[] = [];

  const secciones: SeccionFuente[] = legado.secciones.map((seccionLegado, indice) => {
    const entradaCanonica = mapaCanonico.get(normalizarTitulo(seccionLegado.titulo));
    const numPeriodos = seccionLegado.periodos.length;

    if (numPeriodos === 4) {
      return transformarSeccionPivote(
        seccionLegado,
        ['Q1', 'Q2', 'Q3', 'Q4'],
        'trimestral',
        entradaCanonica,
        indice + 1,
        año,
        pendientes
      );
    }
    if (numPeriodos === 2) {
      return transformarSeccionPivote(
        seccionLegado,
        ['S1', 'S2'],
        'semestral',
        entradaCanonica,
        indice + 1,
        año,
        pendientes
      );
    }
    return transformarSeccionAnioWrapper(seccionLegado, entradaCanonica, indice + 1, año, pendientes);
  });

  return { data: { año, secciones }, pendientes };
}

function transformarAnio(
  año: number,
  mapaCanonico: Map<string, EntradaCanonicaSeccion>
): { data: ModeladoAnio; pendientes: Pendiente[] } {
  const rutaLegado = path.join(DIR_ASSETS_INFO_FINANCIERA, String(año), `${año}.json`);
  const legado = cargarJSON(rutaLegado) as ModeladoLegado;
  return transformarLegado(legado, año, mapaCanonico);
}

function escribirTareasPendientes(pendientes: Pendiente[]): void {
  const acentosRotos = pendientes.filter((p) => p.tipo === 'acento_roto');
  const urlsExternas = pendientes.filter((p) => p.tipo === 'url_externa');

  const filaTabla = (p: Pendiente) =>
    `| ${p.año} | ${p.seccionId} | ${p.documentoTitulo} | ${p.periodoClave} | ${p.valorOriginal} |`;

  const contenido = [
    '# Tareas pendientes — Información financiera',
    '',
    'Generado automáticamente por `npm run migrar:financiera -- transformar`. No editar a mano las tablas; si hay contexto adicional, agrégalo en una sección aparte al final del archivo.',
    '',
    '## Nombres de archivo con acentos rotos (2021-2023)',
    '',
    'Los PDFs de estos años se subieron con el nombre de archivo sin acentos correctos (ej. `situacin` en vez de `situación`). El `.modelado.json` generado apunta al nombre físico real tal cual está en disco para que la API sirva el archivo correctamente; renombrar los PDFs (y actualizar el `link` correspondiente) queda pendiente como tarea aparte, coordinada para no romper enlaces ya publicados.',
    '',
    '| Año | Sección | Documento | Periodo | Archivo actual |',
    '| --- | --- | --- | --- | --- |',
    ...acentosRotos.map(filaTabla),
    '',
    '## Enlaces externos no migrables al schema (2021)',
    '',
    '`modelado_financiero.schema.json` exige que `link` sea una ruta relativa a un `.pdf` (o `null`). Estos enlaces del legado 2021 apuntan a Google Drive/Docs y no encajan en ese patrón, así que quedaron marcados `estado: "pendiente"` en el JSON generado. Pendiente: descargar y publicar estos documentos como PDF dentro de `assets/informacion_financiera/2021/`.',
    '',
    '| Año | Sección | Documento | Periodo | URL original |',
    '| --- | --- | --- | --- | --- |',
    ...urlsExternas.map(filaTabla),
    '',
    '## Hallazgo colateral: 2026 con `link` publicado sin archivo físico',
    '',
    'Detectado durante esta migración (no generado por este script): en `2026.modelado.json`, los documentos `ingresos` y `egresos` de la sección `presupuesto_de_ingresos_y_egresos` están marcados `"estado": "publicado"` apuntando a `Q1/2026_ingresos.pdf` y `Q1/2026_egresos.pdf`, pero esos archivos no existen todavía en `assets/informacion_financiera/2026/Q1/`. El backend solo emite un `console.warn` en boot por esto. Pendiente: subir los PDFs o corregir el `.modelado.json` de 2026 mientras tanto.',
    '',
  ].join('\n');

  fs.writeFileSync(RUTA_TAREAS_PENDIENTES, contenido, 'utf-8');
  console.log(`\n✓ Tareas pendientes registradas en ${RUTA_TAREAS_PENDIENTES}`);
}

function transformar(soloAño?: number): void {
  const mapaCanonico = construirMapaCanonico();
  const años = soloAño ? [soloAño] : AÑOS_A_TRANSFORMAR;
  const todasPendientes: Pendiente[] = [];

  for (const año of años) {
    console.log(`\n--- Transformando ${año} ---`);
    const { data, pendientes } = transformarAnio(año, mapaCanonico);

    console.log('Validando contra modelado_financiero.schema.json...');
    validarContraSchema(data);
    console.log('✓ Válido.');

    verificarArchivosFisicos(data, año);

    const dirDestino = path.join(DIR_ASSETS_INFO_FINANCIERA, String(año));
    const rutaDestino = path.join(dirDestino, `${año}.modelado.json`);
    fs.writeFileSync(rutaDestino, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    console.log(`✓ Escrito ${rutaDestino}`);

    todasPendientes.push(...pendientes);
  }

  if (todasPendientes.length > 0) {
    escribirTareasPendientes(todasPendientes);
  }
}

function main(): void {
  const [subcomando, argAño] = process.argv.slice(2);
  switch (subcomando) {
    case 'copiar':
      copiar2026();
      break;
    case 'transformar':
      transformar(argAño ? parseInt(argAño, 10) : undefined);
      break;
    default:
      console.error('Uso: npm run migrar:financiera -- <subcomando>');
      console.error('  copiar               Copia y valida documentacion/2026_modelado.json hacia assets/informacion_financiera/2026/2026.modelado.json');
      console.error('  transformar [año]    Migra el/los {año}.json legado(s) (2021-2025) al nuevo modelado_financiero.schema.json');
      process.exit(1);
  }
}

if (require.main === module) {
  main();
}
