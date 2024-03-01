// const HttpError = require("../helpers/HttpError");
const Contact = require("../model/contacts");

const getAllContacts = async (req, res) => {
  const { _id } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filterValue = favorite ? { owner: _id, favorite } : { owner: _id };

  const contacts = await Contact.find(filterValue, "", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.status(200).json(contacts);
};
  

const getOneContact = async (req, res) => {
  const id = req.params.id;
  const owner = req.user._id;
  try {
    const contact = await Contact.findOne({ id, owner });
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
  const id = req.params.id;
  const owner = req.user._id;
  try {
    const deletedContact = await Contact.findOneAndDelete({ owner, id });
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
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const owner = req.user._id;
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }

    const updatedContact = await Contact.findOneAndUpdate(
      { id, owner },
      req.body,
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

const updateStatusContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const owner = req.user._id;
    const { favorite } = req.body;

    if (typeof favorite !== "boolean") {
      return res
        .status(400)
        .json({ message: "The favorite field must be of boolean type" });
    }

    const updatedFields = { favorite };

    const updatedContact = await Contact.findOneAndUpdate(
      { contactId, owner },
      updatedFields,
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
