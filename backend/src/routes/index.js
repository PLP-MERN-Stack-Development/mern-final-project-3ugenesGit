import express from 'express';
import authRoutes from './authRoutes.js';
import reportRoutes from './reportRoutes.js';
import rewardRoutes from './rewardRoutes.js';
import adminRoutes from './adminRoutes.js';
import notificationRoutes from './notificationRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/reports', reportRoutes);
router.use('/rewards', rewardRoutes);
router.use('/admin', adminRoutes);
router.use('/notifications', notificationRoutes);

export default router;

