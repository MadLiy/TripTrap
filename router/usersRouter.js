const express = require("express");
const userRouter = express.Router();
const controller = require("../controller/usersController");
const { auth, isAdmin } = require('../middleware/auth');
const userValidator = require('../validator/userValidator');
const validate = require('../validator/validate');
const { validationResult } = require('express-validator');

// === Routes GET (affichage) ===
userRouter.get("/all", auth, isAdmin, controller.index);
userRouter.get("/create", auth, isAdmin, controller.create);
userRouter.get("/edit/:id", auth, controller.edit);
userRouter.get("/toggle-done/:id", controller.toggleDone);
userRouter.get("/my-profile", auth, controller.myProfile);
userRouter.get("/edit-profile", auth, controller.editProfile);

// === Routes POST (actions) ===
userRouter.post("/store", auth, isAdmin, userValidator.register, validate, controller.store);

userRouter.post("/update/:id", auth, userValidator.userId, userValidator.updateProfile, validate, controller.update);

userRouter.post("/update-profile", auth, userValidator.updateProfile, validate, controller.updateProfile);

userRouter.post("/delete/:id", auth, isAdmin, userValidator.userId, validate, controller.delete);

module.exports = userRouter;