// src/controllers/studentController.js
const { StatusCodes } = require("http-status-codes");
const { StudentService } = require("../services");

// const studentService = require("../services/studentService");

const createUser = async (req, res, next) => {
  try {
    const result = await StudentService.signup(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Signup error:", err); // Log full error for debugging
    next(err);
  }
};

const loginStudent = async (req, res, next) => {
  try {
    const result = await StudentService.login(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
async function getProfile(req, res, next) {
  try {
    const studentId = req.user.id; // Provided by auth middleware
    const student = await StudentService.getStudentById(studentId);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
}

async function updateStudentProfile(req, res, next) {
  try {
    const studentId = req.user.id; // Assuming req.user is populated by authentication middleware
    const resumeFile = req.file ? req.file.filename : null; // Assuming multer middleware is used for file upload
    const updatedStudent = await StudentService.updateStudentProfile(
      studentId,
      req.body,
      resumeFile
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
}
// async function forgorPassword(req, res, next) {
//   try {
//     const { email } = req.body;
//     const result = await StudentService.requestPasswordReset(email);
//     if (result) {
//       return res.status(StatusCodes.OK).json({
//         success: true,
//         message: "Password reset link sent to your email",
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// }
async function forgorPassword(req, res, next) {
  try {
    const { email } = req.body;
    const result = await StudentService.requestPasswordReset(email);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: result.message || "Password reset link sent to your email",
      resetToken: result.resetToken, // ✅ Send token in Postman response
    });
  } catch (error) {
    next(error);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { token } = req.params; // Assuming the token is passed as a URL parameter
    const { newPassword } = req.body;
    const result = await StudentService.resetPassword(token, newPassword);
    if (result) {
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Password reset successfully",
      });
    }
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createUser,
  loginStudent,
  updateStudentProfile,
  forgorPassword,
  resetPassword,
};
