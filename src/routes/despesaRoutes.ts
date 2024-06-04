import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { createNewDespesa, deleteDespesaById, getDespesa, getDespesasDoMes, updateDespesa } from '../controllers/despesaController';

const router = Router();

router.get('/despesa', authenticate, getDespesa);
router.post('/despesa', authenticate, createNewDespesa);
router.put('/despesa', authenticate, updateDespesa);
router.delete('/despesa', authenticate, deleteDespesaById);

export default router;
