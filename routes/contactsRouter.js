const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = require("../controllers/contactsControllers.js");
const {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("../schemas/contactsSchemas.js");
const validateBody = require("../helpers/validateBody.js");
const authenticate = require("../middleware/authenticate.js");
// const {isValidById} = require("../helpers/isValidId");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, getOneContact);

contactsRouter.delete("/:id", authenticate, deleteContact);

contactsRouter.post("/", authenticate, validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", authenticate, validateBody(updateContactSchema), updateContact);

contactsRouter.patch(
  "/:contactId/favorite", authenticate,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

module.exports = contactsRouter;
