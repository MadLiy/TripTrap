const inscriptions = require("../model/inscriptions");

class inscriptionsRepository {
  constructor() {
    this.inscriptions = inscriptions;
  }

  // Récupère toutes les inscriptions
  async findAll() {
    return this.inscriptions.find();
  }

  // Récupère une inscription par son id
  async findByPk(id) {
    return this.inscriptions.findById(id);
  }

  // Crée une nouvelle inscription
  async create(userData) {
    return this.inscriptions.create(userData);
  }

  // Met à jour une inscription par son id
  async update(id, userData) {
    return this.inscriptions.findByIdAndUpdate(id, userData, { new: true });
  }

  // Supprime une inscription par son id
  async destroy(id) {
    return this.inscriptions.findByIdAndDelete(id);
  }

  // Récupère une inscription selon des critères
  async findOne(options) {
    return this.inscriptions.findOne(options);
  }

  // Récupère une inscription pour un utilisateur et un voyage donnés
  async findByUserAndTravel(userId, travelId) {
    return this.inscriptions.findOne({ userId, travel: travelId });
  }

  // Récupère toutes les inscriptions d'un utilisateur et remplace l'id du voyage par l'objet complet (populate)
  async findByUser(userId) {
    return this.inscriptions.find({ userId }).populate('travel');
  }

  // Récupère toutes les inscriptions pour un voyage et remplace l'id de l'utilisateur par l'objet complet (populate)
  async findByTravel(travelId) {
    return this.inscriptions.find({ travel: travelId }).populate('userId');
  }

  // Ajoute des documents à une inscription
  async pushDocuments(id, docs) {
    return this.inscriptions.findByIdAndUpdate(
      id,
      { $push: { document: { $each: docs } } },
      { new: true }
    );
  }
}

module.exports = new inscriptionsRepository();