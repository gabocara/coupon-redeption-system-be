import { Request, Response } from 'express';
import { buyService } from '../services/BuyService'; // Importar el servicio

export const buyController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { amount, code } = req.body;

    // Llamar al servicio de compra
    const result = await buyService(userId, amount, code);
    
    res.status(200).json(result); // Responder con el resultado del servicio
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
