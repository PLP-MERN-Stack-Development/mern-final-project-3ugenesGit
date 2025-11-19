const express = require('express');
const rewardController = require('../controllers/rewardController');
const { authMiddleware, adminOnly } = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.use(authMiddleware);

router.get('/summary', asyncHandler(rewardController.summary));
router.post('/lottery/run', adminOnly, asyncHandler(rewardController.pickWinners));

module.exports = router;

