const express = require("express");
const inscriptionRouter = express.Router();
const controller = require("../controller/inscriptionsController");
const { auth, isAdmin } = require('../middleware/auth');
const multer = require('multer');
const { createInscription, inscriptionId } = require('../validator/inscriptionsValidator');
const { validationResult } = require('express-validator');
const path = require('path');

// Multer storage personnalisé
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Récupère les infos nécessaires depuis req.body et req.user
    // titles[] est envoyé dans le même ordre que les fichiers
    // On suppose que req.body.titles existe et que req.user est bien rempli par le middleware auth

    // Récupère l'index du fichier courant
    const index = req.files ? req.files.length : 0;
    // Récupère le titre du document requis (nomdudocumentrequis)
    let docTitle = '';
    if (Array.isArray(req.body.titles)) {
      docTitle = req.body.titles[index] || 'document';
    } else {
      docTitle = req.body.titles || 'document';
    }
    // Nettoie le titre
    docTitle = docTitle.replace(/[^a-zA-Z0-9\-_]/g, '');

    // Récupère l'id du voyage
    const idTravel = req.params.id || (req.body.travel || 'travel');

    // Récupère le prénom et nom de l'utilisateur
    const firstname = req.user?.firstname ? req.user.firstname.replace(/[^a-zA-Z0-9]/g, '') : 'user';
    const lastname = req.user?.lastname ? req.user.lastname.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() : 'USER';

    // Extension du fichier
    const ext = path.extname(file.originalname);

    // Construit le nom final
    const filename = `${docTitle}-${idTravel}-${firstname}${lastname}${ext}`;
    cb(null, filename);
  }
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers PDF, JPEG et PNG sont autorisés !'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

inscriptionRouter.post(
  '/upload-documents/:id',
  auth,
  upload.array('documents'),
  controller.uploadDocuments
);

// Routes statiques d'abord
inscriptionRouter.get("/index", controller.index);
inscriptionRouter.get('/travel/:travelId', auth, isAdmin, controller.inscriptionsByTravel);
inscriptionRouter.get('/mes-inscriptions', auth, controller.myInscriptions);
inscriptionRouter.get("/create", controller.create);

// Routes dynamiques ensuite
inscriptionRouter.get("/edit/:id", controller.edit);
inscriptionRouter.get("/toggle-done/:id", controller.toggleDone);
inscriptionRouter.get("/:id", controller.show);

inscriptionRouter.get('/pay-acompte/:id', auth, controller.showPayAcompte);
inscriptionRouter.post('/pay-acompte/:id', auth, controller.payAcompte);
inscriptionRouter.post('/validate-status/:id', auth, isAdmin, controller.validateStatus);

inscriptionRouter.post("/store", auth, createInscription, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  controller.store(req, res, next);
});

inscriptionRouter.post("/update/:id", auth, inscriptionId, createInscription, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  controller.update(req, res, next);
});
inscriptionRouter.delete("/delete/:id", auth, controller.delete);

module.exports = inscriptionRouter;