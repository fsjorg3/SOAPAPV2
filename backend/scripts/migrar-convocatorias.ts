import fs from 'fs';
import path from 'path';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import type { ModeladoConvocatorias, ConvocatoriaFuente, CategoriaConvocatoria } from '../src/v1/types/modeladoConvocatorias.types';

const RAIZ_BACKEND = path.resolve(__dirname, '..');
const RUTA_SCHEMA = path.join(RAIZ_BACKEND, 'documentacion', 'modelado_convocatorias.schema.json');
const RUTA_TAREAS_PENDIENTES = path.join(RAIZ_BACKEND, 'documentacion', 'tareas-pendientes-convocatorias.md');

const DIR_CONVOCATORIAS = path.join(RAIZ_BACKEND, 'assets', 'convocatorias');
const RUTA_ORIGEN = path.join(DIR_CONVOCATORIAS, 'convocatorias.json');
const RUTA_DESTINO = path.join(DIR_CONVOCATORIAS, 'convocatorias.modelado.json');

/**
 * Nombres de archivo con defectos de origen (subida duplicada) que se corrigen físicamente en
 * disco antes de transformar. Producción tiene 0 elementos hoy, así que renombrar no rompe
 * ningún link ya compartido.
 */
const RENOMBRES: Record<string, string> = {
  'SOAPAP-GAF-LP-ADQ-2026-001(2).pdf': 'SOAPAP-GAF-LP-ADQ-2026-001.pdf',
};

function cargarJSON(ruta: string): any {
  return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
}

/** minúsculas, sin acentos, sin puntuación (mismo criterio que los otros scripts de migración) */
const RANGO_DIACRITICOS = new RegExp('[\\u0300-\\u036f]', 'g');

export function normalizarTitulo(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(RANGO_DIACRITICOS, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function slugify(texto: string): string {
  return normalizarTitulo(texto).replace(/\s+/g, '_');
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
    throw new Error('El JSON de convocatorias no cumple modelado_convocatorias.schema.json.');
  }
}

type TipoPendienteConvocatorias = 'categoria_no_reconocida' | 'archivo_faltante';

interface PendienteConvocatorias {
  tipo: TipoPendienteConvocatorias;
  referencia: string;
  detalle: string;
}

function renombrarArchivosDefectuosos(): void {
  for (const [nombreViejo, nombreNuevo] of Object.entries(RENOMBRES)) {
    const rutaVieja = path.join(DIR_CONVOCATORIAS, nombreViejo);
    const rutaNueva = path.join(DIR_CONVOCATORIAS, nombreNuevo);
    if (fs.existsSync(rutaVieja)) {
      fs.renameSync(rutaVieja, rutaNueva);
      console.log(`✓ Renombrado "${nombreViejo}" -> "${nombreNuevo}"`);
    } else if (!fs.existsSync(rutaNueva)) {
      console.warn(`ADVERTENCIA: no se encontró ni "${nombreViejo}" ni "${nombreNuevo}" en ${DIR_CONVOCATORIAS}.`);
    }
    // Si rutaVieja no existe pero rutaNueva sí, se asume ya migrado — no-op idempotente.
  }
}

function resolverCategoria(valorCrudo: string): CategoriaConvocatoria | null {
  if (/obra\s*p[uú]blica/i.test(valorCrudo)) return 'obra_publica';
  if (/adquisici[oó]n(es)?/i.test(valorCrudo)) return 'adquisiciones';
  return null;
}

interface ConvocatoriaLegado {
  id: string;
  expediente: string;
  year: number;
  category: string;
  description: string;
  filename: string;
}

/** Puro: no toca el filesystem — los renombres ya ocurrieron antes, en un paso aparte. */
export function transformarConvocatorias(
  origen: ConvocatoriaLegado[]
): { data: ModeladoConvocatorias; pendientes: PendienteConvocatorias[] } {
  const pendientes: PendienteConvocatorias[] = [];

  const convocatorias: ConvocatoriaFuente[] = [];
  origen.forEach((legado, indice) => {
    const categoria = resolverCategoria(legado.category);
    if (!categoria) {
      pendientes.push({
        tipo: 'categoria_no_reconocida',
        referencia: legado.id,
        detalle: `El valor de categoría "${legado.category}" no coincide con ningún patrón conocido (obra pública / adquisición); se excluyó del catálogo.`,
      });
      return;
    }

    const nombreCorregido = RENOMBRES[legado.filename] ?? legado.filename;

    convocatorias.push({
      id: slugify(legado.id),
      expediente: legado.expediente,
      anio: legado.year,
      categoria,
      descripcion: legado.description,
      orden: indice + 1,
      link: nombreCorregido,
      estado: 'publicado',
    });
  });

  return { data: { convocatorias }, pendientes };
}

function verificarArchivosFisicos(data: ModeladoConvocatorias): PendienteConvocatorias[] {
  const pendientes: PendienteConvocatorias[] = [];
  for (const convocatoria of data.convocatorias) {
    if (!convocatoria.link) continue;
    const rutaFisica = path.join(DIR_CONVOCATORIAS, convocatoria.link);
    if (!fs.existsSync(rutaFisica)) {
      console.warn(`ADVERTENCIA: no existe el archivo físico para ${convocatoria.id}: ${rutaFisica}`);
      pendientes.push({
        tipo: 'archivo_faltante',
        referencia: convocatoria.id,
        detalle: `No existe el archivo físico ${rutaFisica}.`,
      });
    }
  }
  return pendientes;
}

function escribirTareasPendientes(pendientes: PendienteConvocatorias[]): void {
  const filaTabla = (p: PendienteConvocatorias) => `| ${p.tipo} | ${p.referencia} | ${p.detalle} |`;

  const contenido = [
    '# Tareas pendientes — Convocatorias',
    '',
    'Generado automáticamente por `npm run migrar:convocatorias`. No editar a mano la tabla; si hay contexto adicional, agrégalo en una sección aparte al final del archivo.',
    '',
    '## Hallazgos de la migración',
    '',
    '| Tipo | Referencia | Detalle |',
    '| --- | --- | --- |',
    ...pendientes.map(filaTabla),
    '',
  ].join('\n');

  fs.writeFileSync(RUTA_TAREAS_PENDIENTES, contenido, 'utf-8');
  console.log(`\n✓ Tareas pendientes registradas en ${RUTA_TAREAS_PENDIENTES}`);
}

function migrar(): void {
  renombrarArchivosDefectuosos();

  console.log(`\nLeyendo ${RUTA_ORIGEN}...`);
  const origen = cargarJSON(RUTA_ORIGEN) as ConvocatoriaLegado[];
  const { data, pendientes } = transformarConvocatorias(origen);

  console.log('Validando contra modelado_convocatorias.schema.json...');
  validarContraSchema(data);
  console.log('✓ Válido.');

  const pendientesArchivos = verificarArchivosFisicos(data);
  fs.writeFileSync(RUTA_DESTINO, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`✓ Escrito ${RUTA_DESTINO}`);

  const todasPendientes = [...pendientes, ...pendientesArchivos];
  if (todasPendientes.length > 0) {
    escribirTareasPendientes(todasPendientes);
  } else {
    console.log('\n✓ Sin hallazgos pendientes.');
  }
}

if (require.main === module) {
  migrar();
}
