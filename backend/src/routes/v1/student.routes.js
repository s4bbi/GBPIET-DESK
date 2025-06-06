const express = require("express");
const router = express.Router();

const { StudentController } = require("../../controllers");
const { UserMiddleware } = require("../../middlewares");

router.post("/register", StudentController.createUser);
router.post(
  "/login",
  UserMiddleware.validateUser(["email", "password"]),
  StudentController.loginStudent
);

module.exports = router;
