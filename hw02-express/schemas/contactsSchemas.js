const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
 
  // Дополнительные поля, которые могут быть необходимы для создания контакта
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  
  // Дополнительные поля, которые могут быть обновлены в контакте
});

module.exports = { createContactSchema, updateContactSchema };



// import Joi from "joi";

// export const createContactSchema = Joi.object({

// })

// export const updateContactSchema = Joi.object({

// })