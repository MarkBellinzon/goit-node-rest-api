// rOpZvwVQkR6ipzdk

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const isValidId = require("../helpers/isValidId");
const contactsRouter = require("./routes/contactsRouter.js");
const mongoose = require("mongoose");
const authRouter = require("./routes/users.js")

// const dotenv = require('dotenv');
// dotenv.config();
require("dotenv").config();
const {DB_HOST, PORT = 3000} = process.env;


mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());


app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});