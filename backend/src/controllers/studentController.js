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

module.exports = {
  createUser,
  loginStudent,
  updateStudentProfile,
};
