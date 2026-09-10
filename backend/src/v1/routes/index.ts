import transparenciaRouter from './transparencia.routes';
import archivosRouter from './archivos.routes';
import normatividadRouter from './normatividad.routes';
import convocatoriasRouter from './convocatorias.routes';
import contactoRouter from './contacto.routes';
import { rutaNoEncontradaV1, manejadorErroresV1 } from '../middlewares/problema.middleware';

// Catch-all + manejador de error RFC7807, solo dentro de cada router de /api/v1 — nunca afecta
// a las rutas legacy bajo /soapapv2/api/.
transparenciaRouter.use(rutaNoEncontradaV1);
transparenciaRouter.use(manejadorErroresV1);

archivosRouter.use(rutaNoEncontradaV1);
archivosRouter.use(manejadorErroresV1);

normatividadRouter.use(rutaNoEncontradaV1);
normatividadRouter.use(manejadorErroresV1);

convocatoriasRouter.use(rutaNoEncontradaV1);
convocatoriasRouter.use(manejadorErroresV1);

contactoRouter.use(rutaNoEncontradaV1);
contactoRouter.use(manejadorErroresV1);

export { transparenciaRouter, archivosRouter, normatividadRouter, convocatoriasRouter, contactoRouter };
