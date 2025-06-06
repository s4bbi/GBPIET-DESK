const Student = require("../models/userModel");
// const User = require("../models/userModel");
const CrudRepository = require("./crudRepository");

class StudentRepository extends CrudRepository {
  constructor() {
    super(Student);
  }
  async getUserByEmail(email) {
    try {
      const response = await Student.findOne({ email: email });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = StudentRepository;
