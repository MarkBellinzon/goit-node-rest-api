const express = require("express");
const validateBody = require("../helpers/validateBody.js");
const { schemas } = require("../model/users.js");
const { register
    } = require("../controllers/users.js")

const authRouter = express.Router();

// sign up
// authRouter.get("/", getAllUsers);

// authRouter.get("/:id/register", validateBody(schemas.registerSchema), getOneUsers);

authRouter.post("/register", validateBody(schemas.registerSchema), register);

module.exports = authRouter;