const express = require("express");
const userRouter = express.Router();
const controller = require("../controller/usersController");
const { auth, isAdmin } = require('../middleware/auth');
const userValidator = require('../validator/userValidator');
const { validationResult } = require('express-validator');

userRouter.get("/all", auth, isAdmin,  controller.index);
userRouter.get("/create", auth, isAdmin, controller.create);
userRouter.get("/edit/:id", auth, controller.edit);

userRouter.get("/toggle-done/:id", controller.toggleDone);

userRouter.get("/my-profile", auth, controller.myProfile);
// Editer son profil (affichage du formulaire)
userRouter.get("/edit-profile", auth, controller.editProfile);
// Soumettre la modification
userRouter.post("/update-profile", auth, controller.updateProfile);

// userRouter.get("/:id", auth, controller.show);

userRouter.post("/store", auth, isAdmin, userValidator.register, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  controller.store(req, res, next);
});

userRouter.post("/update/:id", auth, userValidator.userId, userValidator.updateProfile, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  controller.update(req, res, next);
});
userRouter.post("/delete/:id", auth, isAdmin, controller.delete);

module.exports = userRouter;
