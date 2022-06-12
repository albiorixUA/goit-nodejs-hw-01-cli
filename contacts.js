const fs = require("fs/promises");
const path = require("path");
const id = require("bson-objectid");

const contactPath = path.join(__dirname, "./db/contacts.json");

async function updateContact(contact) {
  await fs.writeFile(contactPath, JSON.stringify(contact, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const idx = data.findIndex((iteam) => iteam.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = data.splice(idx, 1);
  updateContact(data);
  return removeContact;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: id(),
  };
  data.push(newContact);
  updateContact(data);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
