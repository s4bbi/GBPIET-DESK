const Student = require("../models/studentModel");
const CrudRepository = require("./crudRepository");

class StudentRepository extends CrudRepository {
  constructor() {
    super(Student, "Student");
  }

  async findByEmail(email) {
    try {
      return await Student.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  async findByInstituteId(instituteId) {
    try {
      return await Student.findOne({ instituteId });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StudentRepository;
