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
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
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

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await removeContact(id);
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
    res.status(500).json({ message: "Internal server error" });
  }
};


const updateContact = async (req, res) => {
  try {
    // Отримуємо id з параметрів запиту
    const { id } = req.params;
    // Отримуємо дані з тіла запиту
    const { name, email, phone } = req.body;

    // Перевірка, чи передано хоча б одне поле в тілі запиту
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Body must have at least one field" });
    }
    // Оновлення контакту за допомогою функції updateContact
    const result = await updateContacts(id, { name, email, phone });

    if (result.status === 200) {
      // Якщо контакт оновлено успішно, повертаємо оновлені дані
      return res.status(200).json(result.data);
    } else if (result.status === 404) {
      // Якщо контакт не знайдено, повертаємо відповідь зі статусом 404
      return res.status(404).json({ message: "Not found" });
    } else {
      // Інакше повертаємо відповідь зі статусом 500
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    // Якщо сталася помилка, повертаємо відповідь зі статусом 500
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};

// export const getAllContacts = (req, res) => {};

// export const getOneContact = (req, res) => {};

// export const deleteContact = (req, res) => {};

// export const createContact = (req, res) => {};

// export const updateContact = (req, res) => {};
