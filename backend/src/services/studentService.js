const BadRequestError = require("../errors/badRequest");
const UnauthorizedError = require("../errors/unauthorizedError");
const { StudentRepository } = require("../repositories");
const Auth = require("../utils/common/Auth");
const studentRepository = new StudentRepository();

// DRY helper for validation error handling
function handleValidationError(error) {
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
  throw error;
}

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
    // Use proper logging or remove for production
    console.log("Generated token for new student:", token);
    return { student, token };
  } catch (error) {
    handleValidationError(error);
    console.error("Error creating student:", error);
    throw error;
  }
}

async function studentLogin(data) {
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
        `The password you entered for ${data.email} is incorrect. Please try again.`
      );
    }
    const token = Auth.generateToken({
      role: "student",
      id: user._id,
      department: user.department,
    });
    console.log("Generated token for login:", token);
    return { user, token };
  } catch (error) {
    handleValidationError(error);
    throw error;
  }
}

module.exports = {
  createStudent,
  studentLogin,
};
