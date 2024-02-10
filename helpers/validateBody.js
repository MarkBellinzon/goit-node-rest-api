const { createContactSchema } = require("./schemas/contactsSchemas");
const HttpError = require("./HttpError.js");
const { addContact } = require("./contactsService");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  };
  return func;
};


// const HttpError = req("./HttpError.js");

// const validateBody = (schema) => {
//   const func = (req, _, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       next(HttpError(400, error.message));
//     }
//     next();
//   };

//   return func;
// };

// module.exports = validateBody;
