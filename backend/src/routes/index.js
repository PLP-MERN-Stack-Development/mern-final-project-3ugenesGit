const express = require('express');
const authRoutes = require('./authRoutes');
const reportRoutes = require('./reportRoutes');
const rewardRoutes = require('./rewardRoutes');
const adminRoutes = require('./adminRoutes');
const notificationRoutes = require('./notificationRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/reports', reportRoutes);
router.use('/rewards', rewardRoutes);
router.use('/admin', adminRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;

