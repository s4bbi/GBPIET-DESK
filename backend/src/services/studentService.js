const BadRequestError = require("../errors/badRequest");
const UnauthorizedError = require("../errors/unauthorizedError");
const { StudentRepository } = require("../repositories");
const Auth = require("../utils/common/Auth");
const studentRepository = new StudentRepository();

async function createStudent(data) {
  try {
    const existingStudent = await studentRepository.getUserByEmail(data.email);
    if (existingStudent) {
      throw new BadRequestError("User already exists with this email", {
        email: data.email,
      });
    }
    const student = await studentRepository.create(data);
    const token = Auth.generateToken({ role: "student", id: student._id });
    console.log(token);
    return { student, token };
    // return student;
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map((field) => ({
        field,
        message: error.errors[field].message,
      }));
      throw new BadRequestError(
        "Validation failed for the provided data. Please correct the errors and try again.",
        errors
      );
    }

    console.error("Error creating camping site:", error);
    throw error;
  }
}
async function StudentLogin(data) {
  try {
    const user = await studentRepository.getUserByEmail(data.email);
    if (!user) {
      throw new BadRequestError("User not found with this email", {
        email: data.email,
      });
    }
    const passwordMatch = Auth.checkPassword(data.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError(
        "Invalid credentials",
        `the password you entered for ${data.email} is incorrect. Please try again..`
      );
    }
    const token = Auth.generateToken({
      role: "student",
      id: user._id,
      department: user.department,
    });
    console.log(token);
    return { user, token };
  } catch (error) {
    if (error.name === "ValidationError") {
      // error.errors is an object where each key is the name of an invalid field.
      const errors = Object.keys(error.errors).map((field) => ({
        field, // Field name (e.g., "password")
        message: error.errors[field].message, // Error message (e.g., "Path password (1234) is shorter than the minimum allowed length (8).")
      }));
      throw new BadRequestError(
        "Validation failed for the provided data. Please correct the errors and try again.",
        errors
      );
    }
    throw error;
  }
}
module.exports = {
  createStudent,
  StudentLogin,
};
