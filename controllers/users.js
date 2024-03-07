const { Users } = require("../model/users");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs/promises");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { PORT } = process.env;
require("dotenv").config();
const { v4: uuid } = require("uuid");
const sendEmail = require("../helpers/sendEmail");

// const HttpError = require("../helpers/HttpError");

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

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

    const avatarURL = gravatar.url(email);

    const verificationToken = uuid();

    const newUser = await Users.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    // res.status(201).json({
    //   email: newUser.email,
    //   name: newUser.name,
    // });

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

// const updateAvatar = async(req, res)=> {
//   const {_id} = req.user;
//   const {path: tempUpload, originalname} = req.file;
//   const filename = `${_id}_${originalname}`;

//   const resultUpload = path.join(avatarsDir, filename);
//   await fs.rename(tempUpload, resultUpload);
//   const avatarURL = path.join("avatars", filename);
//   await Users.findByIdAndUpdate(_id, {avatarURL});

//   res.json({
//       avatarURL,
//   })
// }

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const extension = originalname.split(".").pop();
  const filename = `${_id}.${extension}`;

  Jimp.read(tempUpload, (err, image) => {
    if (err) throw err;
    image.resize(250, 250).quality(60).write(`./public/avatars/${filename}`);
  });

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join(`http://localhost:${PORT}/avatars`, filename);
  await Users.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register,
  getAllUsers,
  login,
  getCurrent,
  logout,
  updateAvatar,
};
