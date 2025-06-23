const usersRepository = require("../repositories/usersRepository");
const moment = require("moment");

class UsersService {
  constructor() {
    this.usersRepository = usersRepository;
    this.moment = moment;
  }

  async getAllUsers() {
    try {
      const allUsers = await this.usersRepository.findAll();
      if (!allUsers || allUsers.length === 0) {
        return new Error("No users found");
      }
      return allUsers;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }

  async getUserById(id) {
    try {
      const user = await this.usersRepository.findByPk(id);
      if (!user) {
        return new Error("No user found");
      }
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  async createUser(userData) {
    try {
      const newUser = await this.usersRepository.create(userData);
      if (!newUser) {
        return new Error("No users found");
      }
      return { success: true, newUser };
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  async updateUser(id, userData) {
    try {
      const user = await this.usersRepository.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }

      // Si le champ password est vide, on ne le met pas à jour
      if (!userData.password) {
        delete userData.password;
      }

      // Mise à jour de l'utilisateur avec Mongoose
      const updatedUser = await this.usersRepository.update(id, userData);
      if (!updatedUser) {
        throw new Error("No users found");
      }

      return { message: "User updated successfully" };
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async editUsers(id) {
    try {
      const user = await this.usersRepository.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error editing user: " + error.message);
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.usersRepository.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await this.usersRepository.destroy(id);
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  async toggleDone(id) {
    try {
      const user = await this.usersRepository.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      user.done = !user.done;
      await user.save();
      return { message: "User status toggled successfully" };
    } catch (error) {
      throw new Error("Error toggling user status: " + error.message);
    }
  }

  async getUserByEmail(email) {
    return this.usersRepository.getUserByEmail(email);
  }
}

module.exports = new UsersService();
