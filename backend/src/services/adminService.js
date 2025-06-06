const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/badRequest");
const NotFoundError = require("../errors/notFound");
const UnauthorizedError = require("../errors/unauthorizedError");
const { AdminRepository } = require("../repositories");
const Auth = require("../utils/common/Auth");
const adminRepository = new AdminRepository();

async function createAdmin(adminData) {
  try {
    const existingAdmin = await adminRepository.findByEmail(adminData.email);
    if (existingAdmin) {
      throw new BadRequestError(
        "Admin already exists with this email",
        adminData.email
      );
    }
    const admin = await adminRepository.create(adminData);
    const token = Auth.generateToken({ role: admin.role, id: admin._id });
    console.log(token);
    return { admin, token };
  } catch (error) {
    console.log(error);
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

    console.log(error);
    throw error;
  }
}
async function signIn(data) {
  try {
    const user = await adminRepository.findByEmail(data.email);
    if (!user) {
      throw new NotFoundError("Admin", data.email);
    }
    const passwordMatch = Auth.checkPassword(data.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError(
        "Invalid credentials",
        `the password you entered for ${data.email} is incorrect. Please try again..`
      );
    }
    const token = Auth.generateToken({ role: user.role, id: user._id });
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
// async function deleteAdmin(adminEmail) {
//   try {
//     const admin = await adminRepository.findByEmail(adminEmail);
//     if (!admin) {
//       throw new NotFoundError("Admin not found", adminEmail);
//     }
//     await adminRepository.destroy(admin.email);
//     return { email: admin.email };
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       const errors = Object.keys(error.errors).map((field) => ({
//         field,
//         message: error.errors[field].message,
//       }));
//       throw new BadRequestError(
//         "Validation failed for the provided data. Please correct the errors and try again.",
//         errors
//       );
//     }
//     throw error;
//   }
// }
async function deleteAdmin(id) {
  try {
    const admin = await adminRepository.get(id);

    if (!admin) {
      throw new NotFoundError("Admin", id);
    }
    if (admin.role === "superadmin") {
      throw new BadRequestError(
        "Cannot delete superadmin",
        "Superadmin account cannot be deleted."
      );
    }
    const response = await adminRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new NotFoundError("Admin", id);
    }
    throw error;
  }
}
module.exports = {
  createAdmin,
  signIn,
  deleteAdmin,
};
