const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getProfile = (req, res) => {
  const user = User.findById(req.user.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const { password, ...userData } = user;
  res.json(userData);
};

const updateProfile = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const updates = {};
    
    if (email) {
      updates.email = email;
    }
    
    if (password) {
      updates.password = await bcrypt.hash(password, 12);
    }
    
    const updatedUser = User.updateUser(req.user.userId, updates);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    
    const { password: _, ...userData } = updatedUser;
    res.json(userData);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile };