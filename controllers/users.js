const { Users } = require("../model/users");

const getAllUsers = async (req, res) => {
  const users = await Users.find();
  res.status(200).json(users);
  
};

const register = async (req, res) => {
const newUser = await Users.create(req.body);

res.status(201).json(newUser);
};

module.exports = {
    register,
    getAllUsers

};
