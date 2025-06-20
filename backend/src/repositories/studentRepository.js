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
  async updateStudentProfile(id, data) {
    try {
      const response = await Student.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = StudentRepository;
