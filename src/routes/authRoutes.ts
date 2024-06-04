import { Router } from 'express';
import { buscar, signin, signup } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/buscar', buscar);

export default router;
