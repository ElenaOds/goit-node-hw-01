const path = require('path');
const fs = require('fs').promises;
const {nanoid} = require('nanoid');


const contactsPath = path.join('db', 'contacts.json');


// TODO: returns list of all available contacts
const listContacts = async () => {
    try {
       const allContacts = await fs.readFile(contactsPath);
       const contacts = await JSON.parse(allContacts);
         return contacts;

    } catch (error) {
        console.log(error.message);
    }
  };

  //TODO: returns list of contacts with requested Id
  const getContactById = async (contactId) => {
    try {
        const data = await listContacts();
        const contacts = data.find((item) => item.id === contactId);
        return contacts;

    } catch (error) {
        console.log(error.message);
    }
  };

  //TODO: deletes requested contact
  const removeContact = async (contactId) => {
    try {
        const data = await listContacts();
        const updatedContacts = data.filter(item => item.id !== contactId);
        return updatedContacts;

    } catch (error) {
        console.log(error.message);
    }
  };
  
  //TODO: adds new contact
  const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };

        const addResult = [newContact, ...contacts]
        await fs.writeFile(contactsPath, JSON.stringify(addResult));
        return addResult;

    } catch (error) {
        console.log(error.message);
    }
  };

  module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
}

