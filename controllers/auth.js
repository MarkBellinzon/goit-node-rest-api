const { Users } = require("../model/users");


const getAllUsers = async (req, res) => {
    try {
      const users = await Users.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: "Not found" });
    }
  };

const userAdd = async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        res.status(400).json({ message: "Name, email, and phone are required" });
        return;
      }
      const newUser = await Users.create({ name, email });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: "Not found" });
    }
  };

module.exports = {
    userAdd,
  getAllUsers,
  // getOneUsers,
};
