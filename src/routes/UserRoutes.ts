import { Router } from 'express';
import { createUserController } from '../controllers/UserController'; // Importar el controlador

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/', createUserController);

export default router; // Exportar las rutas
