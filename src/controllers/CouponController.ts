import { Request, Response } from 'express';
import mongoose from 'mongoose'; // Importar mongoose para las transacciones
import { createAndAssignCoupon, redeemCoupon } from '../services/CouponService'; // Asegurarnos de importar correctamente

export const createCouponController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params; // Obtener userId de los parámetros
    const { discount, code } = req.body; // Obtener discount y código del cuerpo (opcional)
    
    const coupon = await createAndAssignCoupon(userId, discount, code); // Crear y asignar el cupón
    res.status(201).json(coupon);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const redeemCouponController = async (req: Request, res: Response) => {
  const session = await mongoose.startSession(); // Iniciar sesión para la transacción
  session.startTransaction(); // Iniciar la transacción

  try {
    const { code } = req.body; // Obtener el código del cuerpo
    const userId = req.params.userId; // Obtener userId de los parámetros

    // Redimir el cupón con la transacción
    const coupon = await redeemCoupon(code, userId, session); // Pasar la sesión como argumento
    await session.commitTransaction(); // Confirmar la transacción si todo salió bien

    res.status(200).json(coupon);
  } catch (error: any) {
    await session.abortTransaction(); // Abortar la transacción si ocurre algún error
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession(); // Asegurarse de finalizar la sesión
  }
};


