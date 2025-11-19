import express from 'express';
import * as reportController from '../controllers/reportController.js';
import { authMiddleware, adminOnly } from '../middlewares/authMiddleware.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.use(authMiddleware, adminOnly);

router.get('/reports', asyncHandler(reportController.list));
router.patch('/reports/:id/status', asyncHandler(reportController.updateStatus));

export default router;

