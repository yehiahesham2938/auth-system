const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Public route - accessible by everyone' });
});


router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected route - accessible by authenticated users' });
});


router.get('/moderator', authenticate, authorize(['moderator', 'admin']), (req, res) => {
  res.json({ message: 'Moderator route - accessible by moderators and admins' });
});


router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Admin route - accessible by admins only' });
});

module.exports = router;