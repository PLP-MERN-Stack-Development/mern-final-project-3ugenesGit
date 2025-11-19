const express = require('express');
const notificationController = require('../controllers/notificationController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.use(authMiddleware);

router.get('/', asyncHandler(notificationController.list));
router.post('/:id/read', asyncHandler(notificationController.markRead));

module.exports = router;

