const inscriptions = require("../model/inscriptions");

class inscriptionsRepository {
  constructor() {
    this.inscriptions = inscriptions;
  }

  async findAll() {
    return this.inscriptions.find();
  }

  async findByPk(id) {
    return this.inscriptions.findById(id);
  }

  async create(userData) {
    return this.inscriptions.create(userData);
  }

  async update(id, userData) {
    return this.inscriptions.findByIdAndUpdate(id, userData, { new: true });
  }

  async destroy(id) {
    return this.inscriptions.findByIdAndDelete(id);
  }

  async findOne(options) {
    return this.inscriptions.findOne(options);
  }

  async findByUserAndTravel(userId, travelId) {
    return this.inscriptions.findOne({ userId, travel: travelId });
  }

  async create(data) {
    return this.inscriptions.create(data);
  }

  async findByUser(userId) {
    return this.inscriptions.find({ userId }).populate('travel');
  }

  async findByTravel(travelId) {
      return this.inscriptions.find({ travel: travelId }).populate('userId');
  }

  async update(id, data) {
    return this.inscriptions.findByIdAndUpdate(id, data, { new: true });
  }

  async pushDocuments(id, docs) {
    return this.inscriptions.findByIdAndUpdate(
      id,
      { $push: { document: { $each: docs } } },
      { new: true }
    );
  }


}
module.exports = new inscriptionsRepository();
