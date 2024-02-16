const fs = require("fs/promises");
// const path = require("path");
const Contact = require("../model/contacts");

const crypto = require("crypto");

// const contactsPath = path.join(__dirname, "..", "db", "contacts.json");
// const contactsPath = path.join(__dirname, "..", "model", "contacts");

async function listContacts() {
  const contacts = await Contact.find();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index === -1) return null;
  const deletedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact[0];
}

// async function addContact(name, email, phone, favorite) {
//   const contacts = await listContacts();
//   const newContact = {
//     id: crypto.randomUUID(),
//     name,
//     email,
//     phone,
//     favorite,
//   };

//   contacts.push(newContact);
//   await fs.writeFile(JSON.stringify(contacts, null, 2));
//   return newContact;
// }

async function addContact(name, email, phone, favorite) {
  const newContact = new Contact({
    name,
    email,
    phone,
    favorite,
  });
  await newContact.save();
  return newContact;
}

async function updateContacts(id, newData) {
  const contacts = await listContacts(Contact);

  const index = contacts.findIndex((contact) => contact.id === id);

  if (index !== -1) {
    const updatedContact = { ...contacts[index] };

    if (newData.name !== undefined) {
      updatedContact.name = newData.name;
    }
    if (newData.email !== undefined) {
      updatedContact.email = newData.email;
    }
    if (newData.phone !== undefined) {
      updatedContact.phone = newData.phone;
    }

    contacts[index] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return { status: 200, data: updatedContact };
  } else {
    return { status: 404, message: "Not found" };
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
};
