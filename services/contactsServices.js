const fs = require("fs/promises");
const path = require("path");
const Contact = require("../model/contacts");

const crypto = require("crypto");

const contactsPath = path.join(
  __dirname,
  "..",
  "db",
  "db-contacts.contacts.json"
);

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts(Contact);
  const contact = contacts.find((el) => el._id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts(Contact);
  const index = contacts.findIndex((el) => el._id === contactId);
  if (index === -1) return null;

  const deletedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact[0];
}

async function addContact(name, email, phone, favorite) {
  const contacts = await listContacts(Contact);
  const newContact = {
    _id: crypto.randomUUID(),
    name,
    email,
    phone,
    favorite,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function updateContacts(_id, newData) {
  const contacts = await listContacts(Contact);

  const index = contacts.findIndex((contact) => contact._id === _id);

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
