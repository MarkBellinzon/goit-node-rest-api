const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

module.exports = { createContactSchema, updateContactSchema };

// const Joi = require("joi");

// const createContactSchema = Joi.object({});

// const updateContactSchema = Joi.object({});

// module.exports = { createContactSchema, updateContactSchema };

// import Joi from "joi";

// export const createContactSchema = Joi.object({

// })

// export const updateContactSchema = Joi.object({

// })
