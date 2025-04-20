const users = []; // In-memory storage for demo purposes

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
}

module.exports = User;