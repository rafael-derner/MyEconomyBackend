import { Router } from 'express';
import { getLimiteMes, createNewLimiteMes, deleteLimiteMesById, getProgressoMes, updateLimiteMes } from '../controllers/limiteMesController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/limite-mes', authenticate, getLimiteMes);
router.get('/progresso-mes', authenticate, getProgressoMes);
router.post('/limite-mes', authenticate, createNewLimiteMes);
router.put('/limite-mes', authenticate, updateLimiteMes);
router.delete('/limite-mes', authenticate, deleteLimiteMesById);

export default router;
