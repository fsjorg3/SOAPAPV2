import { Router } from 'express';
import { listarConvocatorias } from '../controllers/convocatorias.controller';

const router = Router();

router.get('/', listarConvocatorias);

export default router;
