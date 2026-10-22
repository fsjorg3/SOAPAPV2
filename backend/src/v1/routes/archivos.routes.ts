import { Router } from 'express';
import { visualizar, descargar } from '../controllers/archivos.controller';

const router = Router();

router.get('/:archivoId/ver', visualizar);
router.get('/:archivoId/descargar', descargar);

export default router;
