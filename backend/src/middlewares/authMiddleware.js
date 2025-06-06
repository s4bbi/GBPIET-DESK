const UnauthorizedRequest = require("../errors/unauthorizedError");
const Auth = require("../utils/common/Auth");

function isLoggedIn(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedRequest(
      "Invalid credentials.",
      "You must be logged in to access this resource."
    );
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = Auth.verifyToken(token); // contains: { id, role }
    console.log("Logged-in Admin ID:", decodedToken.id);
  } catch (error) {
    throw new UnauthorizedRequest(
      "Invalid credentials.",
      "You must be logged in to access this resource."
    );
  }

  req.user = {
    id: decodedToken.id,
    role: decodedToken.role,
    department: decodedToken.department || null,
  };

  console.log("Authenticated Admin:", req.user);
  next();
}
function requireadmin(req, res, next) {
  if (req.user.role !== "superadmin" && req.user.role !== "admin") {
    throw new UnauthorizedRequest(
      "Access denied.",
      "You do not have permission to access this resource."
    );
  }
  next();
}
function requireSuperadmin(req, res, next) {
  if (req.user.role !== "superadmin") {
    throw new UnauthorizedRequest(
      "Access denied.",
      "You do not have permission to access this resource."
    );
  }
  next();
}
module.exports = {
  isLoggedIn,
  requireSuperadmin,
  requireadmin,
};
