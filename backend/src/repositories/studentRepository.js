const { UnauthorizedError } = require("../errors/customErrors");
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
  async generatePasswordResetToken(email) {
    try {
      const student = await Student.findOne({ email });
      if (!student) {
        // throw new Error("No user found with this email");
        throw new UnauthorizedError("No user found with this email", { email });
      }
      const resetToken = student.createResetPasswordToken();
      await student.save({ validateBeforeSave: false });
      return { resetToken, student };
    } catch (error) {
      throw error;
    }
  }
 
  async findByResetToken(hashedToken) {
  try {
    return await Student.findOne({ resetPasswordToken: hashedToken });
  } catch (error) {
    throw error;
  }
}


 async updatePassword(studentId, newPassword) {
    const student = await Student.findById(studentId);
    student.password = newPassword;   // assign plain password
    student.resetPasswordToken = undefined;
    student.resetPasswordExpires = undefined;
    await student.save();  // mongoose pre-save hook will hash it automatically
    return student;
}

}

module.exports = StudentRepository;
