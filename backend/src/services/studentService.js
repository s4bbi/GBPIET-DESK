const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StudentRepository = require("../repositories/studentRepository");
const studentRepository = new StudentRepository();
const {
  BadRequestError,
  UnauthorizedError,
} = require("../errors/customErrors");

// Password validation regex (min 8 chars, uppercase, lowercase, digit, special char)
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signup = async (data) => {
  // Validate password format BEFORE hashing
  if (!passwordPattern.test(data.password)) {
    throw new BadRequestError(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }

  // Check if user already exists by email
  const existingUser = await studentRepository.findByEmail(data.email);
  if (existingUser) {
    throw new BadRequestError("Email already in use, kindly Login.");
  }

  const newStudent = await studentRepository.create(data);

  // Return user info (without password)
  return {
    message: "Student registered successfully.",
    user: {
      name: newStudent.name,
      email: newStudent.email,
      instituteId: newStudent.instituteId,
      department: newStudent.department,
      batch: newStudent.batch,
      _id: newStudent._id,
    },
  };
};

const login = async ({ email, password }) => {
  // Find user by email
  const student = await studentRepository.findByEmail(email);
  if (!student) throw new UnauthorizedError("Invalid credentials");

  // Verify password
  const valid = await bcrypt.compare(password, student.password);
  if (!valid) throw new UnauthorizedError("Invalid credentials");

  // Create JWT token
  const token = jwt.sign(
    { id: student._id, role: "student", department: student.department },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    message: "Login successful",
    token,
    user: {
      name: student.name,
      email: student.email,
      instituteId: student.instituteId,
      department: student.department,
      batch: student.batch,
      _id: student._id,
    },
  };
};
async function updateStudentProfile(id, data, resume) {
  try {
    if (resume) {
      data.resume = resume;
    }
    const updatedStudent = await studentRepository.updateStudentProfile(
      id,
      data
    );
    if (!updatedStudent) {
      throw new BadRequestError("Student not found", { id });
    }
    return updatedStudent;
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
    console.error("Error updating student profile:", error);
    throw error;
  }
}
module.exports = {
  signup,
  login,
  updateStudentProfile,
};
