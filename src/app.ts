// src/app.ts
import express from 'express';
import { connectDatabase } from './config/database';
import couponRoutes from './routes/CouponRoutes';
import userRoutes from './routes/UserRoutes';
import buyRoutes from './routes/BuyRoutes';
import cors from 'cors';


const app = express();
app.use(express.json());

// Conectar a la base de datos
connectDatabase();
app.use(cors());

// Rutas de cupones
app.use('/api/coupons', couponRoutes);
app.use('/api/users', userRoutes);
app.use('/api/buy', buyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
