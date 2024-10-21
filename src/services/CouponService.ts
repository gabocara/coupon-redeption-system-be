import { Coupon } from '../models/Coupon';
import { User } from '../models/User';
import { generateRandomCode } from '../utils/randomCodeGenerator';
import mongoose from 'mongoose';
import { sendToQueue } from '../config/messageQueue'; // Utilizar cola de mensajería para enviar notificaciones

// Crear un nuevo cupón y asignarlo a un usuario
export const createAndAssignCoupon = async (userId: string, discount: number, code?: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado.');

  // Generar un código si no se proporciona uno
  const couponCode = code || generateRandomCode();

  // Crear el cupón
  const coupon = new Coupon({
    code: couponCode,
    discount,
    isRedemption: false,
    _userId: user._id
  });
  await coupon.save();

  return coupon;
};

export const redeemCoupon = async (code: string, userId: string, session: mongoose.ClientSession) => {
    const user = await User.findById(userId).session(session);
    if (!user) throw new Error('Usuario no encontrado.');
  
    const coupon = await Coupon.findOne({ code }).session(session);
    if (!coupon) throw new Error('Cupón no encontrado.');
    if (coupon.isRedemption) throw new Error('El cupón ya ha sido redimido.');
  
    coupon.isRedemption = true;
    await coupon.save({ session }); // Guardar en la sesión de la transacción
  
    return coupon; // Devolver el cupón redimido
  };

  export const assignGiftCard = async (userId: any, explicitCode: string) => {
    const couponCode = explicitCode || generateRandomCode(); // Usar código explícito o generar uno aleatorio
  
    const newCoupon = new Coupon({
      code: couponCode,
      discount: 10, // Porcentaje de descuento, puede ser configurable
      redemptions: 0, // Inicializa redenciones en 0
      userId: userId, // Asocia el cupón al usuario
    });
  
    await newCoupon.save(); // Guardar el nuevo cupón en la base de datos

    return newCoupon; // Devolver el nuevo cupón
  };
