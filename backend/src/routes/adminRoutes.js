const express = require('express');
const reportController = require('../controllers/reportController');
const { authMiddleware, adminOnly } = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.use(authMiddleware, adminOnly);

router.get('/reports', asyncHandler(reportController.list));
router.patch('/reports/:id/status', asyncHandler(reportController.updateStatus));

module.exports = router;

