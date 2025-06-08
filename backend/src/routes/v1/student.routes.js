const express = require("express");
const router = express.Router();

const { StudentController } = require("../../controllers");
const { UserMiddleware } = require("../../middlewares");

router.post("/signup", StudentController.createUser);
router.post(
  "/login",
  UserMiddleware.validateUser(["email", "password"]),
  StudentController.loginStudent
);

module.exports = router;
