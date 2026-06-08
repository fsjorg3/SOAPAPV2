import fs from 'fs';
import path from 'path';
import https from 'https';

const ASSETS_DIR = path.join(process.cwd(), 'assets');

const filesToDownload = [
  { name: 'Estado_de_Actividades', url: 'https://soapap.gob.mx/info/2026/pdfs/1.pdf' },
  { name: 'Estado_de_Situacion_Financiera', url: 'https://soapap.gob.mx/info/2026/pdfs/2.pdf' },
  { name: 'Estado_de_Variacion_en_la_Hacienda_Publica', url: 'https://soapap.gob.mx/info/2026/pdfs/3.pdf' },
  { name: 'Estado_de_Cambios_en_la_Situacion_Financiera', url: 'https://soapap.gob.mx/info/2026/pdfs/4.pdf' },
  { name: 'Estado_de_Flujos_de_Efectivo', url: 'https://soapap.gob.mx/info/2026/pdfs/5.pdf' },
  { name: 'Estado_Analitico_del_Activo', url: 'https://soapap.gob.mx/info/2026/pdfs/6.pdf' },
  { name: 'Estado_Analitico_de_la_Deuda_y_Otros_Pasivos', url: 'https://soapap.gob.mx/info/2026/pdfs/7.pdf' },
  { name: 'Estado_Analitico_de_Ingresos', url: 'https://soapap.gob.mx/info/2026/pdfs/8.pdf' },
  { name: 'Estado_Analitico_del_Ejercicio_del_Presupuesto_de_Egresos_Clasificacion_Economica', url: 'https://soapap.gob.mx/info/2026/pdfs/9_1.pdf' },
  { name: 'Estado_Analitico_del_Ejercicio_del_Presupuesto_de_Egresos_Clasificacion_Objeto_Gasto', url: 'https://soapap.gob.mx/info/2026/pdfs/10_1.pdf' },
  { name: 'Estado_Analitico_del_Ejercicio_del_Presupuesto_de_Egresos_Clasificacion_Administrativa', url: 'https://soapap.gob.mx/info/2026/pdfs/11_1.pdf' },
  { name: 'Estado_Analitico_del_Ejercicio_del_Presupuesto_de_Egresos_Clasificacion_Funcional', url: 'https://soapap.gob.mx/info/2026/pdfs/12.pdf' },
  { name: 'Gasto_por_Categoria_Programatica', url: 'https://soapap.gob.mx/info/2026/pdfs/13_1.pdf' },
  { name: 'Informe_sobre_Pasivos_Contingentes', url: 'https://soapap.gob.mx/info/2026/pdfs/14.pdf' },
  { name: 'Endeudamiento_Neto', url: 'https://soapap.gob.mx/info/2026/pdfs/15.pdf' },
  { name: 'Intereses_de_la_deuda', url: 'https://soapap.gob.mx/info/2026/pdfs/16.pdf' },
  { name: 'Indicadores_de_Resultados', url: 'https://soapap.gob.mx/info/2026/pdfs/17.pdf' },
  { name: 'Programas_y_Proyectos_de_Inversion', url: 'https://soapap.gob.mx/info/2026/pdfs/18.pdf' }
];

const year = '2026';
const quarter = 'Q1'; // Trimestre 1

const targetDir = path.join(ASSETS_DIR, year, quarter);

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  console.log(`Descargando archivos a: ${targetDir}`);
  for (const item of filesToDownload) {
    const fileName = `${year}_${quarter}_${item.name}.pdf`;
    const destPath = path.join(targetDir, fileName);
    try {
      console.log(`Descargando: ${fileName}...`);
      await downloadFile(item.url, destPath);
      console.log(`✅ Guardado: ${fileName}`);
    } catch (err) {
      console.error(`❌ Error descargando ${item.url}:`, err.message);
    }
  }
  console.log('¡Descarga completada!');
}

run();
