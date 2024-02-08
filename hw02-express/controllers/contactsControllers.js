const contactsService = require("../services/contactsServices");
const HttpError = require('../helpers/HttpError')

export const getAllContacts = async (req, res) => {
    try {
      const contacts = await contactsService.listContacts();
      res.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const getOneContact = async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await contactsService.getContactById(id);
      if (!contact) {
        res.status(404).json({ message: "Contact not found" });
        return;
      }
      res.status(200).json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const deleteContact = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedContact = await contactsService.removeContact(id);
      if (!deletedContact) {
        res.status(404).json({ message: "Contact not found" });
        return;
      }
      res.status(200).json(deletedContact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const createContact = async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      if (!name || !email || !phone) {
        res.status(400).json({ message: "Name, email, and phone are required" });
        return;
      }
      const newContact = await contactsService.addContact(name, email, phone);
      res.status(201).json(newContact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const updateContact = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;
      const existingContact = await contactsService.getContactById(id);
      if (!existingContact) {
        res.status(404).json({ message: "Contact not found" });
        return;
      }
      const updatedContact = {
        id,
        name: name || existingContact.name,
        email: email || existingContact.email,
        phone: phone || existingContact.phone,
      };
          res.status(200).json(updatedContact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  


// export const getAllContacts = (req, res) => {};

// export const getOneContact = (req, res) => {};

// export const deleteContact = (req, res) => {};

// export const createContact = (req, res) => {};

// export const updateContact = (req, res) => {};
