const travels = require("../model/travels");

class travelsRepository {
  constructor() {
    this.travels = travels;
  }

  // Récupère tous les voyages
  async findAll() {
    return this.travels.find();
  }

  // Récupère un voyage par son id
  async findByPk(id) {
    return this.travels.findById(id);
  }

  // Crée un nouveau voyage
  async create(travelData) {
    return this.travels.create(travelData);
  }

  // Met à jour un voyage par son id
  async update(id, travelData) {
    return this.travels.findByIdAndUpdate(id, travelData, { new: true });
  }

  // Supprime un voyage par son id
  async destroy(id) {
    return this.travels.findByIdAndDelete(id);
  }

  // Récupère un voyage selon des critères spécifiques
  async findOne(options) {
    return this.travels.findOne(options);
  }

}

module.exports = new travelsRepository();