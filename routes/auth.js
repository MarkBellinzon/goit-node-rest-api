const express = require("express");
const validateBody = require("../helpers/validateBody.js");
const {schemas} = require("../model/users.js");
const { userAdd, getAllUsers
    } = require("../controllers/auth.js")

const authRouter = express.Router();

// sign up
authRouter.get("/", getAllUsers);

// authRouter.get("/:id/register", validateBody(schemas.registerSchema), getOneUsers);

authRouter.post("/", validateBody(schemas.registerSchema), userAdd);

module.exports = authRouter;