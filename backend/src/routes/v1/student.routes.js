const express = require("express");
const router = express.Router();
const { StudentController } = require("../../controllers");
const { AuthMiddleware, UserMiddleware } = require("../../middlewares");
const upload = require("../../utils/multer"); 

const validateStudentId = (req, res, next) => {
  if (!req.params.id || req.params.id.length < 12) {
    return res.status(400).json({ error: "Invalid student ID" });
  }
  next();
};

router.post("/signup", StudentController.createUser);
router.post("/login", UserMiddleware.validateUser(["email", "password"]), StudentController.loginStudent);

router.get("/profile/:id", AuthMiddleware.isLoggedIn, validateStudentId, StudentController.getStudentProfile);

router.put(
  "/profile/:id",
  AuthMiddleware.isLoggedIn,
  upload.single("resume"),  // now .single() works
  StudentController.updateStudentProfile
);

router.post("/forgot-password", UserMiddleware.validateUser(["email"]), StudentController.forgorPassword);
router.post("/reset-password/:token", UserMiddleware.validateUser(["newPassword"]), StudentController.resetPassword);

module.exports = router;