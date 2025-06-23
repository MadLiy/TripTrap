const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
const cookieParser = require("cookie-parser");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const apiRouter = require("./router/apiRouter");
const cors = require("cors");

const multer = require('multer');
const app = express(); // <-- Place cette ligne AVANT tous les app.use

app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(expressLayout);
app.set("layout", "base");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(cors());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Route 
app.use("/api", apiRouter);

// ... après tous les app.use('/api/inscriptions', inscriptionRouter) etc.

app.use(async (err, req, res, next) => {
  if (err && err.message && err.message.includes('Seuls les fichiers PDF, JPEG et PNG sont autorisés')) {
    // On récupère l'id de l'inscription depuis l'URL
    const inscriptionId = req.params.id || req.body.inscriptionId;
    // On recharge la page d'upload avec le message d'erreur
    // On récupère les infos nécessaires pour la vue
    const inscriptionsService = require('./service/inscriptionsService');
    const inscription = await inscriptionsService.getInscriptionsById(inscriptionId);
    const travel = await require('./service/travelsService').getTravelById(inscription.travel);
    const requiredDocuments = travel.requiredDocuments || [];
    return res.render('inscriptions/pay-acompte', {
      inscription,
      travel,
      requiredDocuments,
      errorMsg: err.message
    });
  }
  next(err);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server run  http://localhost:${port}`);
});