// src/database.ts
import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017,localhost:27018,localhost:27019/coupon-system?replicaSet=rs0');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};
