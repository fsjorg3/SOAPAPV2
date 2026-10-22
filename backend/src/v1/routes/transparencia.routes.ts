import { Router } from 'express';
import { listarEjercicios, listarSecciones, obtenerSeccion, buscarDocumentos } from '../controllers/transparencia.controller';

const router = Router();

router.get('/ejercicios', listarEjercicios);
router.get('/ejercicios/:ejercicio/secciones', listarSecciones);
router.get('/ejercicios/:ejercicio/secciones/:seccionId', obtenerSeccion);
router.get('/documentos', buscarDocumentos);

export default router;
