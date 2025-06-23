const users = require("../model/users");

class usersRepository {
  constructor() {
    this.users = users;
  }

  // Récupère tous les utilisateurs
  async findAll() {
    return this.users.find();
  }

  // Récupère un utilisateur par son id
  async findByPk(id) {
    return this.users.findById(id);
  }

  // Crée un nouvel utilisateur
  async create(userData) {
    return this.users.create(userData);
  }

  // Met à jour un utilisateur par son id
  async update(id, userData) {
    return this.users.findByIdAndUpdate(id, userData, { new: true });
  }

  // Supprime un utilisateur par son id
  async destroy(id) {
    return this.users.findByIdAndDelete(id);
  }

  // Récupère un utilisateur selon des critères spécifiques
  async findOne(options) {
    return this.users.findOne(options);
  }

  // Récupère un utilisateur par son email
  async getUserByEmail(email) {
    return this.users.findOne({ email });
  }

}

module.exports = new usersRepository();