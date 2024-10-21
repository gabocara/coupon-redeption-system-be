import { User } from '../models/User';
import { createAndAssignCoupon } from './CouponService'; // Importamos el método correcto

export const assignCouponToUser = async (userId: string, discount: number, couponCode?: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado.');

  // Crear y asignar el cupón directamente
  const coupon = await createAndAssignCoupon(userId, discount, couponCode); // Utilizamos el método correcto

  return { user, coupon }; // Devolvemos el usuario y el cupón creado
};


export const createUser = async (email: string) => {
    // Validar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('El usuario ya existe.');
    }
  
    // Crear un nuevo usuario
    const newUser = new User({
      email,
    });

    await newUser.save();
    return newUser; // Devolver el usuario creado
};