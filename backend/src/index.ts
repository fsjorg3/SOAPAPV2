import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { validateContactForm } from './middlewares/contact.middleware';
import { validateTransparencyList, validatePdfRequest, getFinancialYears } from './middlewares/transparency.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Deshabilitar cabecera X-Powered-By por seguridad (evita divulgar que usamos Express)
app.disable('x-powered-by');

// Confiar en los proxies (Cloudflare + Apache) para obtener la IP real del usuario
// De lo contrario, el rate limiter bloqueará a TODOS los usuarios al mismo tiempo (tomando la IP de Apache/Cloudflare)
app.set('trust proxy', true);

// 2. Cabeceras de seguridad globales con Helmet
// Configuramos crossOriginResourcePolicy en 'cross-origin' para permitir que el frontend
// de origen cruzado (ej. http://localhost:5173) cargue y visualice los archivos estáticos sin problemas.
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// 3. Configuración de CORS
// Si hay múltiples orígenes, se pueden separar por comas en el .env (ej. http://localhost:5173,https://soapap.gob.mx)
const corsOrigin = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : 'http://localhost:5173';
app.use(cors({
  origin: corsOrigin
}));

// 4. Límites de tamaño en los payloads para mitigar ataques de denegación de servicio (DoS)
// limitando el volumen de datos que un atacante puede enviar al servidor.
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. Prevenir la contaminación de parámetros HTTP (HTTP Parameter Pollution - HPP)
app.use(hpp());

// 6. Configuración de Rate Limiters diferenciados
const rateLimitWindowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10); // 15 minutos

// Rate Limiter para endpoints de la API (más estricto)
const apiLimiterMax = parseInt(process.env.RATE_LIMIT_API_MAX || '100', 10);
const apiLimiter = rateLimit({
  windowMs: rateLimitWindowMs,
  max: apiLimiterMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Demasiadas peticiones desde esta IP. Por favor, intente de nuevo más tarde.'
  }
});

// Rate Limiter para los assets estáticos (más permisivo para permitir múltiples peticiones de rangos parciales de PDFs)
const assetsLimiterMax = parseInt(process.env.RATE_LIMIT_ASSETS_MAX || '1000', 10);
const assetsLimiter = rateLimit({
  windowMs: rateLimitWindowMs,
  max: assetsLimiterMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Límite de descargas de recursos excedido para esta IP. Por favor, intente más tarde.'
  }
});

// Aplicar Rate Limiter de assets a la ruta de estáticos
const pdfPath = path.resolve(process.env.PDF_STORAGE_PATH || './assets');
app.use('/assets', assetsLimiter, express.static(pdfPath));

// Aplicar Rate Limiter general a todas las demás rutas
app.use(apiLimiter);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de SOAPAPV2' });
});

// Endpoint 1: Recibir el contenido del formulario de contacto
app.post('/soapapv2/api/contact', validateContactForm, (req, res) => {
  // TODO: Implementar lógica para procesar los datos del formulario (ej. envío de email)
  res.status(200).json({ message: 'Formulario recibido correctamente (En construcción)' });
});

// Endpoint 2: Generar un JSON con los archivos de transparencia (normatividad, información financiera, título de concesión o convocatorias)
app.get('/soapapv2/api/transparency/files', validateTransparencyList, (req, res) => {
  // La lógica fue delegada al middleware validateTransparencyList
});
app.get('/soapapv2/api/transparency/files/:category', validateTransparencyList, (req, res) => {
  // La lógica fue delegada al middleware validateTransparencyList
});
app.get('/soapapv2/api/transparency/files/:category/:year', validateTransparencyList, (req, res) => {
  // La lógica fue delegada al middleware validateTransparencyList
});

// Endpoint para obtener los años disponibles de información financiera
app.get('/soapapv2/api/transparency/anios', getFinancialYears);

// Endpoint 3: Servir el PDF solicitado (obtenido a través de la ruta o JSON)
app.get('/soapapv2/api/transparency/file/:filename', validatePdfRequest, (req, res) => {
  // La lógica fue delegada al middleware validatePdfRequest
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`📂 Carpeta de PDFs configurada en: ${pdfPath}`);
});

