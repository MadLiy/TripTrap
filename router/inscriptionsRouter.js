const express = require("express");
const inscriptionRouter = express.Router();
const controller = require("../controller/inscriptionsController");
const { auth, isAdmin } = require('../middleware/auth');
const multer = require('multer');
const { createInscription, inscriptionId } = require('../validator/inscriptionsValidator');
const validate = require('../validator/validate');
const path = require('path');

// === Multer : configuration du stockage et du filtre de type de fichier ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Construction du nom de fichier personnalisé
    let docTitle = '';
    if (Array.isArray(req.body.titles)) {
      docTitle = req.body.titles[req.files ? req.files.length : 0] || 'document';
    } else {
      docTitle = req.body.titles || 'document';
    }
    docTitle = docTitle.replace(/[^a-zA-Z0-9\-_]/g, '');
    const idTravel = req.params.id || req.body.travel || 'travel';
    const firstname = req.user?.firstname ? req.user.firstname.replace(/[^a-zA-Z0-9]/g, '') : 'user';
    const lastname = req.user?.lastname ? req.user.lastname.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() : 'USER';
    const ext = path.extname(file.originalname);
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

// === Routes d'upload de documents ===
inscriptionRouter.post(
  '/upload-documents/:id',
  auth,
  upload.array('documents'),
  controller.uploadDocuments
);

// === Routes statiques (GET) ===
inscriptionRouter.get("/index", controller.index);
inscriptionRouter.get('/travel/:travelId', auth, isAdmin, inscriptionId, validate, controller.inscriptionsByTravel);
inscriptionRouter.get('/mes-inscriptions', auth, controller.myInscriptions);
inscriptionRouter.get("/create", controller.create);
inscriptionRouter.get("/edit/:id", inscriptionId, validate, controller.edit);
inscriptionRouter.get("/toggle-done/:id", inscriptionId, validate, controller.toggleDone);
inscriptionRouter.get("/:id", inscriptionId, validate, controller.show);
inscriptionRouter.get('/pay-acompte/:id', auth, inscriptionId, validate, controller.showPayAcompte);

// === Actions dynamiques (POST/DELETE) ===
inscriptionRouter.post('/pay-acompte/:id', auth, inscriptionId, validate, controller.payAcompte);
inscriptionRouter.post('/validate-status/:id', auth, isAdmin, inscriptionId, validate, controller.validateStatus);

inscriptionRouter.post("/store", auth, createInscription, validate, controller.store);

inscriptionRouter.post("/update/:id", auth, inscriptionId, createInscription, validate, controller.update);

inscriptionRouter.delete("/delete/:id", auth, inscriptionId, validate, controller.delete);

module.exports = inscriptionRouter;