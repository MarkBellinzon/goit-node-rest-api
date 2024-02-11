const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/contactsRouter.js");

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

// app.use("/api/contacts/:id", contactsRouter);

// app.use("/api/contacts/:id", (req, res) => {
//   const contactId = req.params.id;
//   // Пошук контакту за його ідентифікатором
//   const contact = contacts.find((contact) => contact.id === contactId);
//   if (contact) {
//     // Якщо контакт знайдено, повертаємо його відповідь
//     res.json(contact);
//   } else {
//     // Якщо контакт не знайдено, повертаємо відповідь з помилкою 404
//     res.status(404).json({ error: "Contact not found" });
//   }
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running. Use our API on port: ${PORT}");
});
