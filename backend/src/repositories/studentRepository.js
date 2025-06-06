const Student = require("../models/userModel");
const CrudRepository = require("./crudRepository");

class StudentRepository extends CrudRepository {
  constructor() {
    super(Student, "Student");
  }

  async getUserByEmail(email) {
    try {
      const student = await Student.findOne({ email });
      return student;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StudentRepository;
