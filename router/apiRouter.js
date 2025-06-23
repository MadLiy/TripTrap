const express = require("express");
const apiRouter = express.Router();

const authRouter = require("./authRouter");
const inscriptionsRouter = require("./inscriptionsRouter");
const travelsRouter = require("./travelsRouter");
const usersRouter = require("./usersRouter");
const { auth, isAdmin } = require('../middleware/auth');

// Page d'accueil API
apiRouter.get('/', (req, res) => {
  res.render('home');
});

// Dashboard (protégé)
apiRouter.get('/dashboard', auth, (req, res) => {
  res.render('dashboard', { user: req.user });
});

// Authentification
apiRouter.use("/auth", authRouter);

// Inscriptions (protégé)
apiRouter.use("/inscriptions", auth, inscriptionsRouter);

// Voyages (public)
apiRouter.use("/travels", travelsRouter);

// Utilisateurs (protégé)
apiRouter.use("/users", auth, usersRouter);

module.exports = apiRouter;