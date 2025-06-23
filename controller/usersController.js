const usersService = require("../service/usersService");

class UsersController {
  constructor() {
    this.usersService = usersService;
  }
  index = async (req, res) => {
    try {
      const users = await this.usersService.getAllUsers();
      return res.render("users/index", { users: users });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  store = async (req, res) => {
    try {
      await this.usersService.createUser(req.body);
      return res.redirect("/api/users/all");
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  create = (req, res) => {
    try {
      res.render("users/create");
    } catch (error) {
      console.error("Error rendering create user page:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  update = async (req, res) => {
    try {
      await this.usersService.updateUser(req.params.id, req.body);
      res.redirect("/api/users/all");
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  edit = async (req, res) => {
    try {
      const user = await this.usersService.editUsers(req.params.id);
      res.render("users/edit", { user: user });
    } catch (error) {
      console.error("Error rendering edit user page:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  delete = async (req, res) => {
    try {
      await this.usersService.deleteUser(req.params.id);
      res.redirect("/api/users/all");
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  toggleDone = async (req, res) => {
    try {
      await this.usersService.toggleDone(req.params.id);
      res.redirect("/api/users/all");
    } catch (error) {
      console.error("Error toggling user done status:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  // Affiche le profil du membre connecté
  myProfile = async (req, res) => {
    try {
      const user = await this.usersService.getUserById(req.user._id);
      res.render("users/my-profile", { user });
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).send("Erreur lors de l'affichage du profil");
    }
  };

  // Affiche le formulaire d'édition du profil
  editProfile = async (req, res) => {
    try {
      const user = await this.usersService.getUserById(req.user._id);
      res.render("users/edit-profile", { user });
    } catch (error) {
      console.error("Error rendering edit profile page:", error);
      res.status(500).send("Erreur lors de l'affichage du formulaire");
    }
  };

  // Met à jour le profil
  updateProfile = async (req, res) => {
    try {
      await this.usersService.updateUser(req.user._id, req.body);
      res.redirect("/api/users/my-profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).send("Erreur lors de la mise à jour du profil");
    }
  };
}

module.exports = new UsersController();
