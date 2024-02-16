// rOpZvwVQkR6ipzdk


const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/contactsRouter.js");
const mongoose = require('mongoose');
const DB_HOST = "mongodb+srv://MarkBell:rOpZvwVQkR6ipzdk@cluster0.w2gctqm.mongodb.net/db-contacts?retryWrites=true&w=majority";

// mongoose.set('strictquery', true);

mongoose.connect(DB_HOST)
.then(() => {
app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
})})
.catch(error => {
  console.log(error.message);
  process.exit(1);
})





const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running. Use our API on port: ${PORT}`);
// });
