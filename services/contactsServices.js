// const fs = require("fs/promises");
// // const path = require("path");
// const Contact = require("../model/contacts");

// const crypto = require("crypto");
// const { error } = require("console");

// const listContacts = async (req, res) => {
//   const contacts = await Contact.find();
//   return contacts;
// };

// const getContactById = async (req, res) => {
//   const { id } = req.body;
//   const contacts = await Contact.getById(id);
//   if (!contacts) {
//     throw error.message;
//   }
//   res.json(contacts);
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const contact = contacts.find((el) => el.id === contactId);
//   return contact || null;
// };

// async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((el) => el.id === contactId);
//   if (index === -1) return null;
//   const deletedContact = contacts.splice(index, 1);
//   await fs.writeFile(JSON.stringify(contacts, null, 2));
//   return deletedContact[0];
// }

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = Contact.findByIdAndDelete((el) => el.id === contactId);
//   if (index === -1) return null;
//   const deletedContact = contacts.splice(index, 1);
//   await fs.writeFile(JSON.stringify(contacts, null, 2));
//   return deletedContact[0];
// };

// const removeContact = async (contactId) => {
//   try {
//     const contact = await Contact.findByIdAndDelete(contactId);
//     if (!contact) return null;
//     return contact;
//   } catch (error) {
//     throw new Error("Failed to remove contact");
//   }
// };

// async function addContact(name, email, phone, favorite) {
//   const newContact = new Contact({
//     name,
//     email,
//     phone,
//     favorite,
//   });
//   await newContact.save();
//   return newContact;
// }

// const updateContacts = async (id, newData) => {
//   const contacts = await listContacts();

//   const index = contacts.findIndex((contact) => contact.id === id);

//   if (index !== -1) {
//     const updatedContact = { ...contacts[index] };

//     if (newData.name !== undefined) {
//       updatedContact.name = newData.name;
//     }
//     if (newData.email !== undefined) {
//       updatedContact.email = newData.email;
//     }
//     if (newData.phone !== undefined) {
//       updatedContact.phone = newData.phone;
//     }

//     contacts[index] = updatedContact;

//     await fs.writeFile(JSON.stringify(contacts, null, 2));
//     return { status: 200, data: updatedContact };
//   } else {
//     return { status: 404, message: "Not found" };
//   }
// };

// const updateContacts = async (id, newData) => {
//   try {
//     const updatedContact = await Contact.findByIdAndUpdate(id, newData, {
//       new: true,
//     });

//     if (!updatedContact) {
//       return { status: 404, message: "Contact not found" };
//     }

//     return { status: 200, data: updatedContact };
//   } catch (error) {
//     return { status: 500, message: "Internal server error" };
//   }
// };

// const updateContacts = async (id, newData) => {
//   const index = Contact.findByIdAndUpdate((contact) => contact.id === id);

//   if (index !== -1) {
//     const updatedContact = { ...index };

//     if (newData.name !== undefined) {
//       updatedContact.name = newData.name;
//     }
//     if (newData.email !== undefined) {
//       updatedContact.email = newData.email;
//     }
//     if (newData.phone !== undefined) {
//       updatedContact.phone = newData.phone;
//     }

//     index = updatedContact;

//     await updatedContact.save();
//     return { status: 200, data: updatedContact };
//   } else {
//     return { status: 404, message: "Not found" };
//   }
// };

// module.exports = {};