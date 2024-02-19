const mongoose = require("mongoose");
// const {isValidById} = require("../helpers/isValidId");
const {Schema, model} = require("mongoose");
const Joi = require("joi");
const {isValidById} = require("../helpers/isValidId");

const usersSchema = new Schema ({
    name: {
        type: String,
        required: [true, "Set name for contact"],
      },
  password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },

}, {versionKey: false, timestamps: true});

usersSchema.post("save", isValidById);

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    subscription:Joi.string().min(6).required(),
    token: [
        Joi.string(),
        Joi.number()
    ],
})

const loginSchema = Joi.object({
    password: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(4).max(255).required().email(),
    subscription:Joi.string().min(6).required(),
    token: [
        Joi.string(),
        Joi.number()
    ],
})

const schemas = {
    registerSchema,
    loginSchema,
}

const Users = model("users", usersSchema);
module.exports = {
    Users,
    schemas,
};