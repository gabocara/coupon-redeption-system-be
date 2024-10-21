import { Router } from 'express';
import { createCouponController, redeemCouponController } from '../controllers/CouponController';

const router = Router();

router.post('/create-coupon/:userId', createCouponController);
router.post('/redeem/:userId', redeemCouponController);

export default router;
