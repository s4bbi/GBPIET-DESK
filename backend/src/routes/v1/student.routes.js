const express = require("express");
const router = express.Router();

const { StudentController } = require("../../controllers");
const { UserMiddleware, AuthMiddleware } = require("../../middlewares");
const upload = require("../../utils/multer");

router.post("/signup", StudentController.createUser);
router.post(
  "/login",
  UserMiddleware.validateUser(["email", "password"]),
  StudentController.loginStudent
);
router.patch(
  "/profile",
  AuthMiddleware.isLoggedIn,
  upload.single("resume"),
  StudentController.updateStudentProfile
);
router.post(
  "/forgot-password",
  UserMiddleware.validateUser(["email"]),
  StudentController.forgorPassword
);
router.post(
  "/reset-password/:token",
  UserMiddleware.validateUser(["newPassword"]),
  StudentController.resetPassword
);

module.exports = router;
