const contacts = [];

let nextContactId = 1;

function addContact(name, phone, email = null) {
    if (!name || !phone) {
        console.log("Error: Contact must have a name and a phone number.");
        return;
    }

    const newContact = {
        id: nextContactId++,
        name: name,
        phone: phone,
        email: email
    };
    contacts.push(newContact);
    console.log(`Contact "${name}" (ID: ${newContact.id}) added.`);
}

function removeContact(contactId) {
    const initialLength = contacts.length;
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);

    if (contactIndex !== -1) {
        const removedContact = contacts.splice(contactIndex, 1);
        console.log(`Contact "${removedContact[0].name}" (ID: ${contactId}) removed.`);
    } else {
        console.log(`Contact with ID ${contactId} not found.`);
    }
}

function searchContacts(nameQuery) {
    if (!nameQuery) {
        console.log("Please provide a name to search for.");
        return [];
    }
    const lowerCaseQuery = nameQuery.toLowerCase();
    const matchedContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(lowerCaseQuery)
    );

    if (matchedContacts.length === 0) {
        console.log(`No contacts found matching "${nameQuery}".`);
    } else {
        console.log(`\n--- Contacts Matching "${nameQuery}" ---`);
        matchedContacts.forEach(contact => {
            console.log(`ID: ${contact.id}, Name: ${contact.name}, Phone: ${contact.phone}${contact.email ? `, Email: ${contact.email}` : ''}`);
        });
        console.log("---------------------------------------");
    }
    return matchedContacts;
}

function listContacts() {
    if (contacts.length === 0) {
        console.log("Phonebook is empty.");
        return;
    }

    console.log("\n--- All Contacts ---");
    contacts.forEach(contact => {
        console.log(`ID: ${contact.id}, Name: ${contact.name}, Phone: ${contact.phone}${contact.email ? `, Email: ${contact.email}` : ''}`);
    });
    console.log("--------------------");
}

console.log("--- Simple Phonebook Operations ---");

addContact("Alice Wonderland", "111-222-3333", "alice@example.com");
addContact("Bob The Builder", "444-555-6666");
addContact("Charlie Chaplin", "777-888-9999", "charlie@movies.com");
addContact("Diana Ross", "123-456-7890");

listContacts();

searchContacts("Alice");
searchContacts("bob");
searchContacts("NonExistent");

console.log("\n--- Deleting Contact (ID: 2 - Bob The Builder) ---");
removeContact(2);

listContacts();

console.log("\n--- Attempting to Delete Non-Existent Contact (ID: 99) ---");
removeContact(99);

console.log("\n--- Adding another contact ---");
addContact("Eve Harrington", "000-111-2222");

listContacts();
