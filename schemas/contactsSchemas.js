const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(4).max(255).required().email(),
  phone: Joi.string().min(4).max(20).required().pattern(/\+?[0-9\s\-\(\)]+/),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(255),
  email: Joi.string().min(4).max(255).email(),
  phone: Joi.string().min(4).max(20).pattern(/\+?[0-9\s\-\(\)]+/),
});

module.exports = { createContactSchema, updateContactSchema };

