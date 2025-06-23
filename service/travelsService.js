const travelsRepository = require("../repositories/travelsRepository");
const moment = require("moment");

class TravelsService {
  constructor() {
    this.travelsRepository = travelsRepository;
    this.moment = moment;
  }

  // Récupère tous les voyages
  async getAllTravels() {
    try {
      const allTravels = await this.travelsRepository.findAll();
      return allTravels;
    } catch (error) {
      throw new Error("Error fetching travels: " + error.message);
    }
  }

  // Récupère un voyage par son id
  async getTravelById(id) {
    try {
      const travel = await this.travelsRepository.findByPk(id);
      if (!travel) {
        return new Error("No travel found");
      }
      return travel;
    } catch (error) {
      throw new Error("Error fetching travel: " + error.message);
    }
  }

  // Crée un nouveau voyage
  async createTravel(travelData) {
    try {
      const newTravel = await this.travelsRepository.create(travelData);
      if (!newTravel) {
        return new Error("No travels found");
      }
      return { success: true, newTravel };
    } catch (error) {
      throw new Error("Error creating travel: " + error.message);
    }
  }

  // Met à jour un voyage par son id
  async updateTravel(id, travelData) {
    try {
      const travel = await this.travelsRepository.findByPk(id);
      if (!travel) {
        throw new Error("Travel not found");
      }
      const updated = await this.travelsRepository.update(id, travelData);
      if (!updated) {
        return new Error("No travels found");
      }
      return { message: "Travel updated successfully" };
    } catch (error) {
      throw new Error("Error updating travel: " + error.message);
    }
  }

  // Récupère un voyage pour édition
  async editTravels(id) {
    try {
      const travel = await this.travelsRepository.findByPk(id);
      if (!travel) {
        throw new Error("Travel not found");
      }
      return travel;
    } catch (error) {
      throw new Error("Error editing travel: " + error.message);
    }
  }

  // Supprime un voyage
  async deleteTravel(id) {
    try {
      const travel = await this.travelsRepository.findByPk(id);
      if (!travel) {
        throw new Error("Travel not found");
      }
      await this.travelsRepository.destroy(id);
      return { message: "Travel deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting travel: " + error.message);
    }
  }

  // Change le statut "done" d'un voyage
  async toggleDone(id) {
    try {
      const travel = await this.travelsRepository.findByPk(id);
      if (!travel) {
        throw new Error("Travel not found");
      }
      travel.done = !travel.done;
      await travel.save();
      return { message: "Travel status toggled successfully" };
    } catch (error) {
      throw new Error("Error toggling travel status: " + error.message);
    }
  }
}

module.exports = new TravelsService();