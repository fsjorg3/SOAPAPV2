import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { getFinancialTemplate } from '../utils/financialTemplate';

// Función auxiliar para buscar un archivo de forma recursiva (seguro contra Path Traversal)
const findFileRecursive = (dir: string, filename: string): string | null => {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const resPath = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      const found = findFileRecursive(resPath, filename);
      if (found) return found;
    } else if (file.name.toLowerCase() === filename.toLowerCase()) {
      return resPath;
    }
  }
  return null;
};

// Middleware para el endpoint que genera el JSON de archivos de transparencia
export const validateTransparencyList = (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawCategory = req.params.category || req.query.category || req.query.type;
    if (!rawCategory) {
      res.status(400).json({ success: false, message: 'Categoría no proporcionada' });
      return;
    }
    const category = rawCategory.toString().toLowerCase();
    const yearParam = req.query.year || req.params.year;

    // Normalizar la ruta base de PDFs
    const pdfPath = path.resolve(process.env.PDF_STORAGE_PATH || './assets');


    // Categoría: normatividad
    if (category === 'normatividad') {
      const normatividadDir = path.join(pdfPath, 'normatividad');
      const jsonPath = path.join(normatividadDir, 'normatividad.json');

      // Si existe normatividad.json, leerlo directamente
      if (fs.existsSync(jsonPath)) {
        try {
          const fileContent = fs.readFileSync(jsonPath, 'utf8');
          res.status(200).json(JSON.parse(fileContent));
          return;
        } catch (err) {
          // Fallback a lectura dinámica si el JSON tiene un error de sintaxis
        }
      }

      // Si no existe el JSON o falló su lectura, escanear la carpeta
      if (fs.existsSync(normatividadDir)) {
        const files = fs.readdirSync(normatividadDir)
          .filter(f => f.toLowerCase().endsWith('.pdf'))
          .map(f => {
            const title = f.replace(/\.pdf$/i, '').replace(/_/g, ' ').toUpperCase();
            return {
              titulo: title,
              filename: f
            };
          });
        res.status(200).json(files);
        return;
      }
      res.status(200).json([]);
      return;
    }

    if (category === 'titulo') {
      const tituloDir = path.join(pdfPath, 'titulo');
      const jsonPath = path.join(tituloDir, 'titulo.json');

      if (fs.existsSync(jsonPath)) {
        try {
          const fileContent = fs.readFileSync(jsonPath, 'utf8');
          res.status(200).json(JSON.parse(fileContent));
          return;
        } catch (err) {
          // Fallback a lectura dinámica si el JSON tiene un error de sintaxis
        }
      }

      if (fs.existsSync(tituloDir)) {
        const files = fs.readdirSync(tituloDir).filter(f => f.toLowerCase().endsWith('.pdf'));
        const mainTitles = files.filter(f => !f.includes('_anexo'));
        
        const result = mainTitles.map(mainFile => {
          const prefix = mainFile.replace(/\.pdf$/i, '');
          const annexes = files.filter(f => f.startsWith(prefix + '_anexo'));
          
          return {
            titulo: `TÍTULO DE CONCESIÓN ${prefix.replace('t', '')}`,
            documentos: [
              {
                titulo: `TÍTULO DE CONCESIÓN ${prefix.replace('t', '')}`,
                link: `/assets/titulo/${mainFile}`
              },
              ...annexes.map(a => {
                const match = a.match(/_anexo-?(\d+)/i);
                const num = match ? match[1] : '';
                return {
                  titulo: `ANEXO ${num}`,
                  link: `/assets/titulo/${a}`
                };
              })
            ]
          };
        });

        if (result.length > 0) {
          res.status(200).json(result);
          return;
        }
        
        // Fallback genérico si no encaja en la estructura esperada
        const fallback = files.map(f => ({
          titulo: f.replace(/\.pdf$/i, '').toUpperCase(),
          filename: f
        }));
        res.status(200).json(fallback);
        return;
      }
      res.status(200).json([]);
      return;
    }

    if (category === 'convocatorias') {
      const convocatoriasDir = path.join(pdfPath, 'convocatorias');
      const jsonPath = path.join(convocatoriasDir, 'convocatorias.json');

      if (fs.existsSync(jsonPath)) {
        try {
          const fileContent = fs.readFileSync(jsonPath, 'utf8');
          res.status(200).json(JSON.parse(fileContent));
          return;
        } catch (err) {
          // Fallback a lectura dinámica si el JSON tiene un error de sintaxis
        }
      }

      if (fs.existsSync(convocatoriasDir)) {
        const files = fs.readdirSync(convocatoriasDir)
          .filter(f => f.toLowerCase().endsWith('.pdf'))
          .map(f => {
            return {
              titulo: f.replace(/\.pdf$/i, '').replace(/_/g, ' ').toUpperCase(),
              filename: f
            };
          });
        res.status(200).json(files);
        return;
      }
      res.status(200).json([]);
      return;
    }

    if (category === 'informacion_financiera') {
      if (!yearParam) {
        res.status(400).json({ success: false, message: 'Año no proporcionado' });
        return;
      }
      
      const year = parseInt(yearParam.toString(), 10);
      if (isNaN(year)) {
        res.status(400).json({ success: false, message: 'Año inválido' });
        return;
      }

      const jsonPath = path.join(pdfPath, 'informacion_financiera', year.toString(), `${year}.json`);

      // Si existe el JSON del año, leerlo directamente
      if (fs.existsSync(jsonPath)) {
        try {
          const fileContent = fs.readFileSync(jsonPath, 'utf8');
          res.status(200).json(JSON.parse(fileContent));
          return;
        } catch (err) {
          // Fallback a template dinámico
        }
      }

      // Si no existe el JSON, construir el template
      res.status(200).json(getFinancialTemplate(year));
      return;
    }



    res.status(400).json({
      success: false,
      message: `Categoría no soportada: ${category}`
    });
    return;

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al procesar la solicitud de archivos',
      error: error.message
    });
    return;
  }
};

// Middleware para el endpoint que sirve el PDF solicitado (seguro contra Path Traversal)
export const validatePdfRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawFilename = req.params.filename;
    if (!rawFilename || typeof rawFilename !== 'string') {
      res.status(400).json({ success: false, message: 'Nombre de archivo no válido' });
      return;
    }

    const filename = decodeURIComponent(rawFilename);

    // Tipos de archivos permitidos (se pueden agregar más en el futuro)
    const ALLOWED_EXTENSIONS = ['.pdf'];
    const ext = path.extname(filename).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      res.status(400).json({ success: false, message: 'Tipo de archivo no permitido' });
      return;
    }

    // Validar intento básico de Path Traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      res.status(400).json({ success: false, message: 'Intento de acceso no autorizado detectado' });
      return;
    }

    const pdfPath = path.resolve(process.env.PDF_STORAGE_PATH || './assets');
    const filePath = findFileRecursive(pdfPath, filename);

    if (filePath && fs.existsSync(filePath)) {
      res.sendFile(filePath);
      return;
    }

    res.status(404).json({ success: false, message: 'Archivo no encontrado' });
    return;
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error al servir el archivo', error: error.message });
    return;
  }
};

// Middleware para obtener los años disponibles de información financiera
export const getFinancialYears = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jsonPath = path.resolve(process.env.PDF_STORAGE_PATH || './assets', 'informacion_financiera', 'anios.json');
    if (fs.existsSync(jsonPath)) {
      try {
        const fileContent = fs.readFileSync(jsonPath, 'utf8');
        res.status(200).json(JSON.parse(fileContent));
        return;
      } catch (err) {
        res.status(500).json({ success: false, message: 'Error al procesar anios.json' });
        return;
      }
    }
    res.status(404).json({ success: false, message: 'Archivo anios.json no encontrado' });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al procesar la solicitud de años',
      error: error.message
    });
    return;
  }
};

