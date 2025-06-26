const express = require("express");
const router = express.Router();

const { HiringController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");

router.post(
  "/post",
  AuthMiddleware.isLoggedIn,
  AuthMiddleware.requireAdmin,
  HiringController.createHiring
);
router.get(
  "/type/:type",
  AuthMiddleware.isLoggedIn,
  HiringController.getPostByType
);
router.delete(
  "/:id",
  AuthMiddleware.isLoggedIn,
  AuthMiddleware.requireAdmin,
  HiringController.deletePost
);

module.exports = router;
