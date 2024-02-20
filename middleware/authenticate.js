const HttpError = require("../helpers/HttpError");
const jwt = require("jsonwebtoken");
const { User } = require("../model/users");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
    // next (res.status(401).json({ message: "Unauthorized" }));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
      // next (res.status(401).json({ message: "User not found 2" }));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
    // next (res.status(401).json({ message: "User not found 3" }));
  }
};

module.exports = authenticate;