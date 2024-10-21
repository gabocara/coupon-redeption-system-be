import mongoose, { Schema, Document } from 'mongoose';

interface ICoupon extends Document {
  code: string;
  discount: number;
  isRedemption: boolean;
  _userId: string; 

}

const couponSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  isRedemption: { type: Boolean, default: false } 
});

export const Coupon = mongoose.model<ICoupon>('Coupon', couponSchema);
