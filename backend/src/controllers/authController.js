const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/env');
const web3AuthService = require('../services/web3AuthService');

const signToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

const sanitizeUser = (user) => {
  const obj = user.toObject();
  delete obj.password;
  return obj;
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ email, password: hashed, name });

  res.status(201).json({ user: sanitizeUser(user), token: signToken(user) });
};

exports.basicLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password || '');
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ user: sanitizeUser(user), token: signToken(user) });
};

exports.web3AuthLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { idToken } = req.body;
  const profile = await web3AuthService.verifyIdToken(idToken);

  let user = await User.findOne({ email: profile.email });
  if (!user) {
    user = await User.create({
      email: profile.email,
      name: profile.name || profile.email.split('@')[0],
      picture: profile.profileImage,
      walletAddress: profile.wallets?.[0],
    });
  }

  res.json({ user: sanitizeUser(user), token: signToken(user) });
};

