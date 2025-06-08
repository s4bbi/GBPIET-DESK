// src/controllers/studentController.js
const {StudentService}=require('../services')
// const studentService = require("../services/studentService");

const createUser = async (req, res, next) => {
  try {
    const result = await StudentService.signup(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Signup error:", err);  // Log full error for debugging
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


module.exports = {
  createUser,
  loginStudent,
};
