const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex(({ id }) => id === contactId);

  if (indexContact === -1) return null;

  const [result] = contacts.splice(indexContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(4),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.export = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
