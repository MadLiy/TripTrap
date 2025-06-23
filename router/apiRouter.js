const express = require("express");
const apiRouter = express.Router();

const authRouter = require("./authRouter");
const inscriptionsRouter = require("./inscriptionsRouter");
const travelsRouter = require("./travelsRouter");
const usersRouter = require("./usersRouter");
const { auth, isAdmin } = require('../middleware/auth');


apiRouter.get('/', (req, res) => {
    res.render('home')
});
apiRouter.get('/dashboard', auth, (req, res) => {
    res.render('dashboard', { user: req.user });
});
apiRouter.use("/auth", authRouter);
apiRouter.use("/inscriptions", auth, inscriptionsRouter);
apiRouter.use("/travels", travelsRouter);
apiRouter.use("/users", auth, usersRouter);

module.exports = apiRouter;