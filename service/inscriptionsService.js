const inscriptionsRepository = require("../repositories/inscriptionsRepository");
const moment = require("moment");

class InscriptionsService {
  constructor() {
    this.inscriptionsRepository = inscriptionsRepository;
    this.moment = moment;
  }

  // Récupère toutes les inscriptions
  async getAllInscriptions() {
    try {
      const allInscriptions = await this.inscriptionsRepository.findAll();
      return allInscriptions;
    } catch (error) {
      throw new Error("Error fetching inscriptions: " + error.message);
    }
  }

  // Récupère une inscription par son id
  async getInscriptionsById(id) {
    try {
      const inscription = await this.inscriptionsRepository.findByPk(id);
      if (!inscription) {
        return new Error("No inscription found");
      }
      return inscription;
    } catch (error) {
      throw new Error("Error fetching inscription: " + error.message);
    }
  }

  // Crée une nouvelle inscription
  async createInscription(inscriptionData) {
    try {
      const newInscription = await this.inscriptionsRepository.create(inscriptionData);
      if (!newInscription) {
        return new Error("No inscriptions found");
      }
      return { success: true, newInscription };
    } catch (error) {
      throw new Error("Error creating inscription: " + error.message);
    }
  }

  // Met à jour une inscription par son id
  async updateInscription(id, inscriptionData) {
    try {
      const inscription = await this.inscriptionsRepository.findByPk(id);
      if (!inscription) {
        throw new Error("Inscription not found");
      }
      const updated = await this.inscriptionsRepository.update(id, inscriptionData);
      if (!updated) {
        return new Error("No inscriptions found");
      }
      return { message: "Inscription updated successfully" };
    } catch (error) {
      throw new Error("Error updating inscription: " + error.message);
    }
  }

  // Récupère une inscription pour édition
  async editInscriptions(id) {
    try {
      const inscription = await this.inscriptionsRepository.findByPk(id);
      if (!inscription) {
        throw new Error("Inscription not found");
      }
      return inscription;
    } catch (error) {
      throw new Error("Error editing inscription: " + error.message);
    }
  }

  // Supprime une inscription
  async deleteInscription(id) {
    try {
      const inscription = await this.inscriptionsRepository.findByPk(id);
      if (!inscription) {
        throw new Error("Inscription not found");
      }
      await this.inscriptionsRepository.destroy(id);
      return { message: "Inscription deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting inscription: " + error.message);
    }
  }

  // Change le statut "done" d'une inscription
  async toggleDone(id) {
    try {
      const inscription = await this.inscriptionsRepository.findByPk(id);
      if (!inscription) {
        throw new Error("Inscription not found");
      }
      inscription.done = !inscription.done;
      await inscription.save();
      return { message: "Inscription status toggled successfully" };
    } catch (error) {
      throw new Error("Error toggling inscription status: " + error.message);
    }
  }

  // Récupère une inscription pour un utilisateur et un voyage donnés
  async findByUserAndTravel(userId, travelId) {
    return inscriptionsRepository.findByUserAndTravel(userId, travelId);
  }

  // Crée une inscription (doublon, à fusionner avec createInscription)
  async createInscription(data) {
    return inscriptionsRepository.create(data);
  }
  
  // Récupère toutes les inscriptions d'un utilisateur
  async getInscriptionsByUser(userId) {
    return inscriptionsRepository.findByUser(userId);
  }

  // Récupère toutes les inscriptions pour un voyage
  async getInscriptionsByTravel(travelId) {
    return this.inscriptionsRepository.findByTravel(travelId);
  }

  // Marque l'acompte comme payé
  async setAcomptePaid(id) {
    return this.inscriptionsRepository.update(id, { acomptePaid: true, paymentStatus: 'completed' });
  }

  // Met à jour le statut à "confirmed"
  async setStatusConfirmed(id) {
    return this.inscriptionsRepository.update(id, { status: 'confirmed' });
  }

  // Ajoute des documents à une inscription
  async addDocuments(id, docs) {
    return this.inscriptionsRepository.pushDocuments(id, docs);
  }
}

module.exports = new InscriptionsService();