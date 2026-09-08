import { Router } from 'express';
import { listarNormatividad, listarTitulo } from '../controllers/normatividad.controller';

const router = Router();

router.get('/secciones', listarNormatividad);
router.get('/titulo-concesion', listarTitulo);

export default router;
