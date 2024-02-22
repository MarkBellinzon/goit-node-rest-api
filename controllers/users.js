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
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    res.status(409).json({ message: "Email already in use" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await Users.create({ ...req.body, password: hashPassword });
  res.status(201).json(newUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Email or password invalid" });
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return res.status(401).json({ message: "Email or password invalid" });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

//   user.token = token;
//  await user.save();

  await Users.findByIdAndUpdate(user._id, { token });

    
  res.json({
    token,
  });
};

const getCurrent = async(req, res) =>{
const {email, password} = req.user;

res.json({
  email,
  password,
 
})
}


const logout = async(req, res) =>{
  const {_id} = req.user;

  await Users.findByIdAndUpdate( _id, { token: ""});
  
  res.json({
    message: "Logout succsess",
   
  })
  }


module.exports = {
  register,
  getAllUsers,
  login,
  getCurrent,
  logout,
}