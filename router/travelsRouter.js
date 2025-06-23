const express = require("express");
const travelsRouter = express.Router();
const controller = require("../controller/travelsController");
const { auth, isAdmin } = require('../middleware/auth');
const { createTravel, travelId } = require('../validator/travelsValidator');
const validate = require('../validator/validate');

// === Routes GET (affichage) ===
travelsRouter.get("/all", controller.index);
travelsRouter.get("/create", auth, isAdmin, controller.create);
travelsRouter.get("/edit/:id", auth, isAdmin, controller.edit);
// travelsRouter.get("/inscriptions", controller.inscriptions);
travelsRouter.get("/toggle-done/:id", controller.toggleDone);

// La route dynamique doit être la dernière des GET
travelsRouter.get("/:id", auth, controller.show);

// === Routes POST (actions) ===
travelsRouter.post("/store", auth, isAdmin, createTravel, validate, controller.store);

travelsRouter.post("/update/:id", auth, isAdmin, travelId, createTravel, validate, controller.update);

travelsRouter.post("/delete/:id", auth, isAdmin, travelId, validate, controller.delete);

module.exports = travelsRouter;