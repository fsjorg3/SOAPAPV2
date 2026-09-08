import fs from 'fs';
import path from 'path';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';

const RAIZ_BACKEND = path.resolve(__dirname, '..');
const RUTA_SCHEMA = path.join(RAIZ_BACKEND, 'documentacion', 'modelado_financiero.schema.json');
const RUTA_ORIGEN_2026 = path.join(RAIZ_BACKEND, 'documentacion', '2026_modelado.json');
const DIR_ASSETS_INFO_FINANCIERA = path.join(RAIZ_BACKEND, 'assets', 'informacion_financiera');

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
 * El subcomando `transformar` para migrar 2021-2025 desde el esquema legado queda fuera de
 * alcance de esta entrega (requiere slugify + pivote de estructura + revisión humana).
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

function main(): void {
  const [subcomando] = process.argv.slice(2);
  switch (subcomando) {
    case 'copiar':
      copiar2026();
      break;
    default:
      console.error('Uso: npm run migrar:financiera -- copiar');
      console.error('  copiar   Copia y valida documentacion/2026_modelado.json hacia assets/informacion_financiera/2026/2026.modelado.json');
      process.exit(1);
  }
}

main();
