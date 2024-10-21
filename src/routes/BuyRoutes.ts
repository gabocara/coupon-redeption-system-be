import { Router } from 'express';
import { buyController } from '../controllers/BuyController';

const router = Router();

// Ruta para procesar la compra
router.post('/:userId', buyController);

export default router;
