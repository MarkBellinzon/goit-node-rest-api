const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = require("../controllers/contactsControllers.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");
const validateBody = require("../helpers/validateBody.js");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:_id", getOneContact);

contactsRouter.delete("/:_id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:_id", validateBody(updateContactSchema), updateContact);

// contactsRouter.PATCH("/:contactId/favorite ", validateBody(updateContactSchema), updateContact);

module.exports = contactsRouter;
