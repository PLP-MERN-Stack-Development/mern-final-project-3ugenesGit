import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/authController.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.post(
  '/web3auth',
  body('idToken').isString(),
  asyncHandler(authController.web3AuthLogin)
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  asyncHandler(authController.basicLogin)
);

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty(),
  ],
  asyncHandler(authController.register)
);

export default router;

