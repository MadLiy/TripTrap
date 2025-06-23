const travelsService = require("../service/travelsService");
const inscriptionsService = require("../service/inscriptionsService");

class TravelsController {
    constructor() {
        this.travelsService = travelsService;
        this.inscriptionsService = inscriptionsService;
    }
    index = async (req, res) => {
        try {
        const travels = await this.travelsService.getAllTravels();
        return res.render("travels/travels", { travels, user: req.user });
        } catch (error) {
        console.error("Error fetching travels:", error);
        return res.status(500).send("Internal Server Error");
        }
    };

    show = async (req, res) => {
        try {
            const travel = await this.travelsService.getTravelById(req.params.id);
            if (!travel) {
                return res.status(404).send("Travel not found");
            }
            const inscription = await this.inscriptionsService.findByUserAndTravel(req.user?._id, travel._id);
            const isAlreadyRegistered = !!inscription;
            return res.render("travels/travel", { travel, user: req.user, isAlreadyRegistered });
        } catch (error) {
            console.error("Error fetching travel:", error);
            return res.status(500).send("Internal Server Error");
        }
    };

    store = async (req, res) => {
        try {
        await this.travelsService.createTravel(req.body);
        return res.redirect("/api/travels/all");
        } catch (error) {
        console.error("Error creating travel:", error);
        return res.status(500).send("Internal Server Error");
        }
    };

    create = (req, res) => {
        try {
        res.render("travels/create", { user: req.user });
        } catch (error) {
        console.error("Error rendering create travel page:", error);
        return res.status(500).send("Internal Server Error");
        }
    };

    update = async (req, res) => {
        try {
        await this.travelsService.updateTravel(req.params.id, req.body);
        res.redirect("/api/travels/all");
        } catch (error) {
        console.error("Error updating travel:", error);
        return res.status(500).send("Internal Server Error");
        }
    };

    edit = async (req, res) => {
        try {
        const travel = await this.travelsService.editTravels(req.params.id);
        res.render("travels/edit", { travel: travel, user: req.user });
        } catch (error) {
        console.error("Error rendering edit travel page:", error);
        return res.status(500).send("Internal Server Error");
        }
    };

    delete = async (req, res) => {
        try {
        await this.travelsService.deleteTravel(req.params.id);
        res.redirect("/api/travels/all");
        } catch (error) {
        console.error("Error deleting travel:", error);
        return res.status(500).send("Internal Server Error");
        }
    };

    toggleDone = async (req, res) => {
        try {
        await this.travelsService.toggleDone(req.params.id);
        res.redirect("/api/travels/all");
        } catch (error) {
        console.error("Error toggling travel done status:", error);
        return res.status(500).send("Internal Server Error");
        }
    };
}

module.exports = new TravelsController();
