const HttpError = require("../helpers/HttpError");
const Contact = require("../model/contacts");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
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
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    res.status(200).json(deletedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "Name, email, and phone are required" });
      return;
    }
    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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

    const updatedContact = await Contact.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const updateStatusContact = async (req, res) => {
//   try {
//     const { contactId } = req.params;
//     const { name, email, phone, favorite } = req.body;

//     if (!name || !email || !phone || favorite === undefined) {
//       return res
//         .status(400)
//         .json({ message: "Body must have at least one field" });
//     }

//     const updatedFields = {};
//     if (name !== undefined) {
//       updatedFields.name = name;
//     }
//     if (email !== undefined) {
//       updatedFields.email = email;
//     }
//     if (phone !== undefined) {
//       updatedFields.phone = phone;
//     }
//     if (favorite !== undefined) {
//       updatedFields.favorite = favorite;
//     }

//     const updatedContact = await Contact.findByIdAndUpdate(
//       contactId,
//       updatedFields,
//       {
//         new: true,
//       }
//     );
//     if (!updatedContact) {
//       return res.status(404).json({ message: "Contact not found" });
//     }

//     res.status(200).json(updatedContact);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const updateStatusContact = async (contactId, body) => {
  try {
    const { favorite } = body;

    if (favorite === undefined) {
      return { error: "Body must have 'favorite' field" };
    }

    const updatedFields = { favorite };

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: updatedFields },
      {
        new: true,
      }
    );
    if (!updatedContact) {
      return { error: "Contact not found" };
    }

    return updatedContact;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
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
