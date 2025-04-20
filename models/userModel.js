const users = [];  
const refreshTokens = [];  

class User {
  constructor(username, email, password, role = 'user') {
    this.id = Date.now().toString();
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = new Date();
  }

  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static findById(id) {
    return users.find(user => user.id === id);
  }

  static save(user) {
    users.push(user);
    return user;
  }

  static updateUser(id, updates) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    users[userIndex] = { ...users[userIndex], ...updates };
    return users[userIndex];
  }
  static addRefreshToken(token, userId) {
    refreshTokens.push({ token, userId });
  }

  static removeRefreshToken(token) {
    const index = refreshTokens.findIndex(t => t.token === token);
    if (index !== -1) refreshTokens.splice(index, 1);
  }

  static findRefreshToken(token) {
    return refreshTokens.find(t => t.token === token);
  }
}

module.exports = User;