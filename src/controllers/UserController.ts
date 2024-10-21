import { Request, Response } from 'express';
import { createUser } from '../services/UserService'; // Importar el servicio correspondiente

// Controlador para crear un nuevo usuario
export const createUserController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body; // Obtener los datos del cuerpo de la solicitud
    const newUser = await createUser(email); // Llamar al servicio para crear el usuario

    // Responder con el usuario creado y su ID
    res.status(201).json({
      message: 'Usuario creado con éxito.',
      userId: newUser._id,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
