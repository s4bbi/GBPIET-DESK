const { StatusCodes } = require("http-status-codes");
const { AdminService } = require("../services");

async function createAdmin(req, res, next) {
  try {
    const admin = await AdminService.createAdmin({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Admin Created Successfully",
      data: admin,
    });
  } catch (error) {
    next(error);
  }
}
async function signIn(req, res, next) {
  try {
    const { user, token } = await AdminService.signIn({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User signed in successfully",
      token, // Send token in response body
      data: {
        id: user.id,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}
async function deleteAdmin(req, res, next) {
  try {
    const { id } = req.params;
    const response = await AdminService.deleteAdmin(id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "admin Deleted Successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createAdmin,
  signIn,
  deleteAdmin,
};
