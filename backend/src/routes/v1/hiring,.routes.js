const express = require("express");
const router = express.Router();

const { HiringController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");

router.post(
  "/",
  AuthMiddleware.isLoggedIn,
  AuthMiddleware.requireadmin,
  HiringController.createHiring
);
router.get(
  "/",
  AuthMiddleware.isLoggedIn,
  HiringController.getHiringPosts
);
router.delete(
  "/:id",
  AuthMiddleware.isLoggedIn,
  AuthMiddleware.requireadmin,
  HiringController.deletePost
);

module.exports = router;
