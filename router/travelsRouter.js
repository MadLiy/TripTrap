const express = require("express");
const travelsRouter = express.Router();
const controller = require("../controller/travelsController");
const { auth, isAdmin } = require('../middleware/auth');
const { createTravel, travelId } = require('../validator/travelsValidator');
const { validationResult } = require('express-validator');

// === Routes GET (affichage) ===
travelsRouter.get("/all", controller.index);
travelsRouter.get("/create", auth, isAdmin, controller.create);
travelsRouter.get("/edit/:id", auth, isAdmin, controller.edit);
// travelsRouter.get("/inscriptions", controller.inscriptions); // Ajoute ici d'autres routes statiques si besoin
travelsRouter.get("/toggle-done/:id", controller.toggleDone);

// La route dynamique doit être la dernière des GET
travelsRouter.get("/:id", auth, controller.show);

// === Routes POST (actions) ===
travelsRouter.post("/store", auth, isAdmin, createTravel, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  controller.store(req, res, next);
});

travelsRouter.post("/update/:id", auth, isAdmin, travelId, createTravel, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  controller.update(req, res, next);
});

travelsRouter.post("/delete/:id", auth, isAdmin, controller.delete);

module.exports = travelsRouter;