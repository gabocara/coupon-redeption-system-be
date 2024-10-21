import mongoose from 'mongoose'; // Importar mongoose para las transacciones
import { redeemCoupon, assignGiftCard } from '../services/CouponService'; // Importar funciones necesarias
import { sendToQueue } from '../config/messageQueue';
import { generateRandomCode } from '../utils/randomCodeGenerator';

export const buyService = async (userId: string, amount: number, code: string) => {
  const session = await mongoose.startSession();
  session.startTransaction(); // Iniciar la transacción

  try {
    if (!userId || !code || !amount) {
      throw new Error('userId, code y amount son requeridos.');
    }

    // Redimir el cupón en una transacción
    const coupon = await redeemCoupon(code, userId, session);

    // Calcular el descuento
    const discountAmount = (amount * coupon.discount) / 100;
    const finalAmount = amount - discountAmount;

    const giftCardCode = generateRandomCode(); // Generar un código único

    const newGiftCard = await assignGiftCard(userId, giftCardCode); // Asignar la tarjeta de regalo

    // Enviar un mensaje a la cola de mensajería para generar un nuevo cupón
    const message = {
      userId,
      discount: coupon.discount,
      giftCardCode: newGiftCard.code,
      timestamp: new Date(),
    };
    await sendToQueue('generate_coupon_queue', message);

    await session.commitTransaction(); // Confirmar la transacción
    return { finalAmount, giftCard: newGiftCard }; // Retornar el resultado
  } catch (error: any) {
    await session.abortTransaction(); // Abortar la transacción en caso de error
    throw new Error(error.message); // Lanzar el error para que lo maneje el controlador
  } finally {
    session.endSession(); // Finalizar la sesión de la transacción
  }
};
