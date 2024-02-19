const { isValidObjectId } = require("mongoose");

// const { HttpError } = require("../helpers");

const isValidById = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).send(`${id} is not a valid id`);
  }
  next();
};



module.exports = {isValidById};
