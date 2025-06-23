const users = require("../model/users");

class usersRepository {
  constructor() {
    this.users = users;
  }

  async findAll() {
    return this.users.find();
  }

  async findByPk(id) {
    return this.users.findById(id);
  }

  async create(userData) {
    return this.users.create(userData);
  }

  async update(id, userData) {
    return this.users.findByIdAndUpdate(id, userData, { new: true });
  }

  async destroy(id) {
    return this.users.findByIdAndDelete(id);
  }

  async findOne(options) {
    return this.users.findOne(options);
  }

  async getUserByEmail(email) {
    return this.users.findOne({ email });
  }

}
module.exports = new usersRepository();
