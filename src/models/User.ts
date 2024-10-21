import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  _id: string; 
  email: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.userId = ret._id;
    delete ret._id;
  }
});

export const User = mongoose.model<IUser>('User', userSchema);
