const mongooseError = (error, data, next) => {
    const { email, code } = error;
    const status = email === "MongoServerError" && code === 11000 ? 409 : 400;
    error.status = status;
    next();
  };
  
  module.exports = mongooseError;