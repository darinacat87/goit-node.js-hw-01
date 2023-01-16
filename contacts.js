const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((c) => c.id === contactId.toString());
  return contactById ? contactById : null;
};

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToRemove = contacts.findIndex(
    (c) => c.id === contactId.toString()
  );
  if (contactToRemove === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== contactToRemove);
  await updateContacts(newContacts);
  return contacts[contactToRemove];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
