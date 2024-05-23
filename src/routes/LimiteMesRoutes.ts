import { Router } from 'express';
import { getLimiteMes, createNewLimiteMes, deleteLimiteMesById } from '../controllers/limiteMesController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/limite-mes', authenticate, getLimiteMes);
router.post('/limite-mes', authenticate, createNewLimiteMes);
router.delete('/limite-mes', authenticate, deleteLimiteMesById);

export default router;
