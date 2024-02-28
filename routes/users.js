const express = require("express");
const validateBody = require("../middleware/validateBody.js");
const { schemas } = require("../model/users.js");
const { register, getAllUsers, login, getCurrent, logout
    } = require("../controllers/users.js")
    const authenticate = require("../middleware/authenticate.js");

const authRouter = express.Router();

// sign up
authRouter.get("/", getAllUsers);

// authRouter.get("/:id/register", validateBody(schemas.registerSchema), getOneUsers);

authRouter.post("/register", validateBody(schemas.registerSchema), register);

authRouter.post("/login", validateBody(schemas.loginSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

module.exports = authRouter;