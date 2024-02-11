const fs = require("fs/promises");
const path = require("path");
// const { nanoid } = require("nanoid");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
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

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    // id: nanoid(),
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

// async function updateContact(contactId, data) {
//   // Перевіряємо, чи передано хоча б одне поле в об'єкті даних
//   if (Object.keys(data).length === 0) {
//     return { message: "Body must have at least one field" };
//   }

//   try {
//     // Перевіряємо валідність даних за схемою updateContactSchema
//     await updateContactSchema.validateAsync(data);
//   } catch (error) {
//     return { message: error.message };
//   }

//   const contacts = await listContacts();
//   const index = contacts.findIndex((el) => el.id === contactId);

//   if (index === -1) {
//     return { message: "Not found" };
//   }

//   // Оновлюємо контакт з вказаним id згідно з переданими даними
//   contacts[index] = { ...contacts[index], ...data };

//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//   return contacts[index];
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
