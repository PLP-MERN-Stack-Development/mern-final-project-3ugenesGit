import express from 'express';
import * as rewardController from '../controllers/rewardController.js';
import { authMiddleware, adminOnly } from '../middlewares/authMiddleware.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/summary', asyncHandler(rewardController.summary));
router.post('/lottery/run', adminOnly, asyncHandler(rewardController.pickWinners));

export default router;

