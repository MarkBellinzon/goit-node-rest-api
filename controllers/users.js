const { Users } = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const HttpError = require("../helpers/HttpError");
const { SECRET_KEY } = process.env;
// console.log(SECRET_KEY);

const getAllUsers = async (req, res) => {
  const users = await Users.find();
  res.status(200).json(users);
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({ email, password: hashPassword });

    const userObject = {
      email: newUser.email,
      subscription: newUser.subscription || "",
    };

    res.status(201).json({ user: userObject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await Users.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email: email || "",
    subscription: subscription || "",
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await Users.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

module.exports = {
  register,
  getAllUsers,
  login,
  getCurrent,
  logout,
};

