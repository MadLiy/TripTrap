const inscriptionsService = require("../service/inscriptionsService");

class InscriptionsController {
    constructor() {
        this.inscriptionsService = inscriptionsService;
    }

    // Affiche la liste de toutes les inscriptions (admin)
    index = async (req, res) => {
        try {
            const inscriptions = await this.inscriptionsService.getAllInscriptions();
            return res.render("inscriptions/index", { inscriptions });
        } catch (error) {
            console.error("Error fetching inscriptions:", error);
            return res.status(500).send("Internal Server Error");
        }
    };

    // Affiche le détail d'une inscription
    show = async (req, res) => {
        try {
            const inscription = await this.inscriptionsService.getInscriptionsById(req.params.id);
            if (!inscription) {
                return res.status(404).send("Inscription not found");
            }
            return res.render("inscriptions/inscription", { inscription });
        } catch (error) {
            console.error("Error fetching inscription:", error);
            return res.status(500).send("Internal Server Error");
        }
    };

    // Crée une nouvelle inscription (user)
    store = async (req, res) => {
        try {
            const userId = req.user._id;
            const travelId = req.body.travel;
            // Vérifie si déjà inscrit
            const existing = await inscriptionsService.findByUserAndTravel(userId, travelId);
            if (existing) {
                return res.status(400).send("Vous êtes déjà inscrit à ce voyage.");
            }
            // Crée l'inscription
            const inscription = await inscriptionsService.createInscription({ userId, travel: travelId });
            res.redirect(`/api/inscriptions/pay-acompte/${inscription._id}`);
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            res.status(500).send("Erreur serveur");
        }
    };

    // Affiche le formulaire de création d'inscription
    create = (req, res) => {
        try {
            res.render("inscriptions/create");
        } catch (error) {
            console.error("Error rendering create inscription page:", error);
            return res.status(500).send("Internal Server Error");
        }
    };

    // Met à jour une inscription
    update = async (req, res) => {
        try {
            await this.inscriptionsService.updateInscription(req.params.id, req.body);
            res.redirect("/inscriptions");
        } catch (error) {
            console.error("Error updating inscription:", error);
            return res.status(500).send("Internal Server Error");
        }
    };

    // Affiche le formulaire d'édition d'une inscription
    edit = async (req, res) => {
        try {
            const inscription = await this.inscriptionsService.editInscriptions(req.params.id);
            res.render("inscriptions/edit", { inscription: inscription });
        } catch (error) {
            console.error("Error rendering edit inscription page:", error);
            return res.status(500).send("Internal Server Error");
        }
    };

    // Supprime une inscription (user)
    delete = async (req, res) => {
        try {
            const inscription = await this.inscriptionsService.getInscriptionsById(req.params.id);
            if (!inscription || String(inscription.userId) !== String(req.user._id)) {
                return res.status(403).send("Action non autorisée");
            }
            await this.inscriptionsService.deleteInscription(req.params.id);
            res.redirect("/api/inscriptions/mes-inscriptions");
        } catch (error) {
            console.error("Error deleting inscription:", error);
            return res.status(500).send("Internal Server Error");
        }
    };

    // Change le statut "done" d'une inscription (admin)
    toggleDone = async (req, res) => {
        try {
            await this.inscriptionsService.toggleDone(req.params.id);
            res.redirect("/inscriptions");
        } catch (error) {
            console.error("Error toggling inscription done status:", error);
            return res.status(500).send("Internal Server Error");
        }
    };

    // Affiche les inscriptions de l'utilisateur connecté
    myInscriptions = async (req, res) => {
        try {
            const userId = req.user._id;
            const inscriptions = await inscriptionsService.getInscriptionsByUser(userId);
            res.render('inscriptions/mes-inscriptions', { inscriptions });
        } catch (error) {
            res.status(500).send("Erreur lors de la récupération de vos inscriptions");
        }
    };

    // Affiche les inscriptions pour un voyage donné (admin)
    inscriptionsByTravel = async (req, res) => {
        try {
            const travelId = req.params.travelId;
            const inscriptions = await this.inscriptionsService.getInscriptionsByTravel(travelId);
            res.render('inscriptions/by-travel', { inscriptions });
        } catch (error) {
            console.error("Error fetching inscriptions by travel:", error);
            res.status(500).send("Erreur lors de la récupération des inscriptions pour ce voyage");
        }
    };

    // Affiche la page de paiement d'acompte et d'upload de documents
    showPayAcompte = async (req, res) => {
        const inscription = await this.inscriptionsService.getInscriptionsById(req.params.id);
        const travel = await require('../service/travelsService').getTravelById(inscription.travel);
        const requiredDocuments = travel.requiredDocuments || [];
        const errorMsg = req.query.errorMsg || null;
        res.render('inscriptions/pay-acompte', { inscription, travel, requiredDocuments, errorMsg });
    };

    // Marque l'acompte comme payé
    payAcompte = async (req, res) => {
        await this.inscriptionsService.setAcomptePaid(req.params.id);
        res.redirect('/api/inscriptions/mes-inscriptions');
    };

    // Valide le statut d'une inscription (admin)
    validateStatus = async (req, res) => {
        try {
            const inscription = await this.inscriptionsService.getInscriptionsById(req.params.id);
            await this.inscriptionsService.setStatusConfirmed(req.params.id);
            res.redirect('/api/inscriptions/travel/' + inscription.travel);
        } catch (error) {
            console.error("Erreur validation statut:", error);
            res.status(500).send("Erreur lors de la validation du statut");
        }
    };

    // Upload de documents pour une inscription
    uploadDocuments = async (req, res) => {
        try {
            const inscriptionId = req.params.id;
            const files = req.files;
            const titles = req.body.titles;
            const titlesArray = Array.isArray(titles) ? titles : [titles];
            const docs = files.map((file, i) => ({
                title: titlesArray[i],
                url: `/uploads/${file.filename}`
            }));
            await this.inscriptionsService.addDocuments(inscriptionId, docs);
            res.redirect('/api/inscriptions/mes-inscriptions');
        } catch (error) {
            // Gestion de l'erreur de type de fichier Multer
            if (error.message.includes('Seuls les fichiers PDF, JPEG et PNG sont autorisés')) {
                const inscription = await this.inscriptionsService.getInscriptionsById(req.params.id);
                const travel = await require('../service/travelsService').getTravelById(inscription.travel);
                const requiredDocuments = travel.requiredDocuments || [];
                return res.render('inscriptions/pay-acompte', {
                    inscription,
                    travel,
                    requiredDocuments,
                    errorMsg: error.message
                });
            }
            res.status(500).send("Erreur lors de l'upload des documents");
        }
    };
}

module.exports = new InscriptionsController();