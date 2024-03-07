const mongoose = require("mongoose");
// const { Schema, model } = require("mongoose");
const Joi = require("joi");
const mongooseError = require("../middleware/mongooseError");

// const emailRegexp = /([\.-])*@\w+([\.-]?\w+)*(\.\+$/;

const usersSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

usersSchema.post("save", mongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(5).max(255).required().email(),
  subscription: Joi.string().min(6),
  token: [Joi.string(), Joi.number()],
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(4).max(255).required().email(),
  subscription: Joi.string().min(6),
  token: [Joi.string(), Joi.number()],
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

const Users = mongoose.model("Users", usersSchema);

module.exports = {
  Users,
  schemas,
};
