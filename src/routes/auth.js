const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'GlobalTnaAdmin2026';

  if (!password || password !== adminPassword) {
    return res.status(401).json({ success: false, message: 'Invalid administration password' });
  }

  // Generate an authorized administration token
  const token = jwt.sign(
    { role: 'admin' }, 
    process.env.JWT_SECRET || 'globaltna_secret_token_key_2026', 
    { expiresIn: '24h' }
  );

  res.json({ success: true, token });
});

module.exports = router;