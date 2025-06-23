const travels = require("../model/travels");

class travelsRepository {
  constructor() {
    this.travels = travels;
  }

  async findAll() {
    return this.travels.find();
  }

  async findByPk(id) {
    return this.travels.findById(id);
  }

  async create(travelData) {
    return this.travels.create(travelData);
  }

  async update(id, travelData) {
    return this.travels.findByIdAndUpdate(id, travelData, { new: true });
  }

  async destroy(id) {
    return this.travels.findByIdAndDelete(id);
  }

  async findOne(options) {
    return this.travels.findOne(options);
  }

}
module.exports = new travelsRepository();