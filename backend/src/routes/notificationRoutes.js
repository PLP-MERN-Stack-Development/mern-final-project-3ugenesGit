import express from 'express';
import * as notificationController from '../controllers/notificationController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', asyncHandler(notificationController.list));
router.post('/:id/read', asyncHandler(notificationController.markRead));

export default router;

