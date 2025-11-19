const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const asyncHandler = require('../utils/asyncHandler');

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

module.exports = router;

