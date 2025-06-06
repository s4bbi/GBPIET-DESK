const Admin = require("../models/adminModel");
const CrudRepository = require("./crudRepository");

class AdminRepository extends CrudRepository {
  constructor() {
    super(Admin);
  }
  async findByEmail(email) {
    try {
      const admin = await Admin.findOne({ email: email });
      return admin;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = AdminRepository;
