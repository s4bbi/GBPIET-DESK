const { StatusCodes } = require("http-status-codes");
const { StudentService } = require("../services");

async function createUser(req, res, next) {
  try {
    const user = await StudentService.createStudent({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      department: req.body.department,
      year: req.body.year,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully",
      error: {},
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
async function loginStudent(req, res, next) {
  try {
    const { user, token } = await StudentService.StudentLogin({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User logged in successfully",
      token,
      data: {
        id: user.id,
        role: "student",
        department: user.department, // or add role if needed dynamically
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createUser,
  loginStudent,
};
