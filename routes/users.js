const express = require("express");
const validateBody = require("../middleware/validateBody.js");
const { schemas } = require("../model/users.js");
const upload = require("../middleware/upload.js");
const {
  register,
  getAllUsers,
  login,
  getCurrent,
  logout,
  updateAvatar,
} = require("../controllers/users.js");
const authenticate = require("../middleware/authenticate.js");

const authRouter = express.Router();

// sign up
authRouter.get("/", getAllUsers);

authRouter.post("/register", validateBody(schemas.registerSchema), register);

authRouter.post("/login", validateBody(schemas.loginSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

module.exports = authRouter;
