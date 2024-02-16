const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
} = require("../services/contactsServices");
const HttpError = require("../helpers/HttpError");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Not found" });
  }
};

const getOneContact = async (req, res) => {
  try {
    const { _id } = req.params;
    const contact = await getContactById(_id);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Not found" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedContact = await removeContact(_id);
    if (!deletedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(deletedContact);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Not found" });
  }
};

const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "Name, email, and phone are required" });
      return;
    }
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Not found" });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!(name || email || phone)) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }

    const updatedFields = {};
    if (name !== undefined) {
      updatedFields.name = name;
    }
    if (email !== undefined) {
      updatedFields.email = email;
    }
    if (phone !== undefined) {
      updatedFields.phone = phone;
    }

    const result = await updateContacts(id, updatedFields);

    if (result.status === 200) {
      return res.status(200).json(result.data);
    } else if (result.status === 404) {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
