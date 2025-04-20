const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { validateEmail, validatePassword } = require('../utils/validators');

const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  );
};

const register = async (req, res, next) => {
  try {
    const { username, email, password, role = 'user' } = req.body;
    
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters with 1 number and 1 special character'
      });
    }
    
    if (User.findByEmail(email)) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);

    
    const user = new User(username, email, hashedPassword, role);
    User.save(user);
    

    const token = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);
    User.addRefreshToken(refreshToken, user.id);

    res.status(201).json({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
      refreshToken
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
 
    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);
    User.addRefreshToken(refreshToken, user.id);

    res.json({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
      refreshToken
    });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }
    
    const storedToken = User.findRefreshToken(refreshToken);
    if (!storedToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        User.removeRefreshToken(refreshToken);
        return res.status(403).json({ message: 'Expired refresh token' });
      }

      const user = User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const newAccessToken = generateAccessToken(user.id, user.role);

      res.json({
        accessToken: newAccessToken,
        refreshToken: refreshToken  
      });
    });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      User.removeRefreshToken(refreshToken);
    }
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { 
  register, 
  login, 
  refreshToken, 
  logout 
};