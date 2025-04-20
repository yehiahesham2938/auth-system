const User = require('../models/userModel');

const updateUserRole = (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body; 
    const validRoles = ['user', 'moderator', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }
    
    const updatedUser = User.updateUser(id, { role });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    } 
    const { password, ...userData } = updatedUser;
    res.json(userData);
  } catch (err) {
    next(err);
  }
};

module.exports = { updateUserRole };