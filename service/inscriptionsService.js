const inscriptionsRepository = require("../repositories/inscriptionsRepository");
const moment = require("moment");

class InscriptionsService {
  constructor() {
    this.inscriptionsRepository = inscriptionsRepository;
    this.moment = moment;
  }

  async getAllInscriptions() {
    try {
      const allInscriptions = await this.inscriptionsRepository.findAll();
      return allInscriptions;
    } catch (error) {
      throw new Error("Error fetching inscriptions: " + error.message);
    }
  }

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

  async deleteInscription(id) {
    try {
      const inscription = await this.inscriptionsRepository.findByPk(id);
      if (!inscription) {
        throw new Error("Inscription not found");
      }
      await this.inscriptionsRepository.destroy( id );
      return { message: "Inscription deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting inscription: " + error.message);
    }
  }

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

  async findByUserAndTravel(userId, travelId) {
    return inscriptionsRepository.findByUserAndTravel(userId, travelId);
  }

  async createInscription(data) {
    return inscriptionsRepository.create(data);
  }
  
  async getInscriptionsByUser(userId) {
    return inscriptionsRepository.findByUser(userId);
  }

  async getInscriptionsByTravel(travelId) {
      return this.inscriptionsRepository.findByTravel(travelId);
  }

  async setAcomptePaid(id) {
    return this.inscriptionsRepository.update(id, { acomptePaid: true, paymentStatus: 'completed' });
  }

  async setStatusConfirmed(id) {
    return this.inscriptionsRepository.update(id, { status: 'confirmed' });
  }

  async addDocuments(id, docs) {
    return this.inscriptionsRepository.pushDocuments(id, docs);
  }
}

module.exports = new InscriptionsService();