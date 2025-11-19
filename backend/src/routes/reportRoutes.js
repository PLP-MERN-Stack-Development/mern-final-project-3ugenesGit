const express = require('express');
const { body } = require('express-validator');
const reportController = require('../controllers/reportController');
const { authMiddleware, adminOnly } = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/feed', asyncHandler(reportController.feed));

router.use(authMiddleware);

router.get('/mine', asyncHandler(reportController.mine));
router.get('/', adminOnly, asyncHandler(reportController.list));

router.post(
  '/',
  [
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('quantity').isFloat({ gt: 0 }).withMessage('Quantity must be greater than zero'),
    body('notes').optional().isLength({ max: 500 }).withMessage('Notes too long'),
    body('location').custom((value) => {
      if (!value) {
        throw new Error('Location is required');
      }
      try {
        const parsed = typeof value === 'string' ? JSON.parse(value) : value;
        if (!Array.isArray(parsed?.coordinates) || parsed.coordinates.length !== 2) {
          throw new Error('Location coordinates are invalid');
        }
      } catch (error) {
        throw new Error('Location must be valid JSON');
      }
      return true;
    }),
  ],
  asyncHandler(reportController.create)
);

router.patch('/:id/status', adminOnly, asyncHandler(reportController.updateStatus));

module.exports = router;

