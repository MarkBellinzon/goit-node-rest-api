const HttpError = require("../helpers/HttpError");
const Contact = require("../model/contacts");

const getAllContacts = async (req, res) => {
  const {id: owner} = req.headers;
  try {
    const contacts = await Contact.find({owner});
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Not found" });
  }
};

const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
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
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
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
  const {id: owner} = req.headers;
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "Name, email, and phone are required" });
      return;
    }
    const newContact = await Contact.create( {name, email, phone, owner} );
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

    if (!name && !email && !phone) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Not found" });
  }
};

const updateStatusContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const updatedFields = { favorite };

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
