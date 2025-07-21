const loadMenu = require('./load.menu.js');
const saveMenu = require('./save.menu.js');

async function updateMenuItem(identifier, fieldToUpdate, newValue) {
    if (!identifier || !fieldToUpdate || newValue === undefined) {
        console.error("Error: Item ID/Name, field to update, and new value are all required.");
        console.error("Usage: node update.item.js <ID/Name> <\"name\"|\"category\"|\"price\"|\"availability\"> <\"New Value\">");
        process.exit(1);
    }

    const menuItems = await loadMenu();
    let itemToUpdate = null;
    let itemIndex = -1;

    // Heuristic: Check if identifier looks like an ID
    const isId = identifier.toUpperCase().startsWith('M') && /\d/.test(identifier);

    if (isId) {
        itemIndex = menuItems.findIndex(item => item.id.toLowerCase() === identifier.toLowerCase());
        if (itemIndex !== -1) {
            itemToUpdate = menuItems[itemIndex];
        }
    }

    if (!itemToUpdate) {
        itemIndex = menuItems.findIndex(item => item.name.toLowerCase() === identifier.toLowerCase());
        if (itemIndex !== -1) {
            itemToUpdate = menuItems[itemIndex];
        }
    }

    if (!itemToUpdate) {
        console.error(`Error: Item with identifier "${identifier}" not found.`);
        process.exit(1);
    }

    let parsedValue = newValue;

    switch (fieldToUpdate.toLowerCase()) {
        case 'name':
        case 'category':
            parsedValue = String(newValue);
            break;
        case 'price':
            parsedValue = parseFloat(newValue);
            if (isNaN(parsedValue) || parsedValue <= 0) {
                console.error("Error: New price must be a positive number.");
                process.exit(1);
            }
            break;
        case 'availability':
            const lowerCaseValue = String(newValue).toLowerCase();
            if (lowerCaseValue === 'true' || lowerCaseValue === 'yes' || lowerCaseValue === '1') {
                parsedValue = true;
            } else if (lowerCaseValue === 'false' || lowerCaseValue === 'no' || lowerCaseValue === '0') {
                parsedValue = false;
            } else {
                console.error(`Error: Invalid value for availability. Use 'true' or 'false'.`);
                process.exit(1);
            }
            break;
        default:
            console.error(`Error: Invalid field to update. Can only update 'name', 'category', 'price', or 'availability'.`);
            process.exit(1);
    }

    menuItems[itemIndex][fieldToUpdate.toLowerCase()] = parsedValue;

    await saveMenu(menuItems);
    console.log(`Item "${itemToUpdate.name}" (ID: ${itemToUpdate.id})'s ${fieldToUpdate} updated to "${parsedValue}" successfully.`);
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length !== 3) {
        console.log("Usage: node update.item.js <\"Item ID\" | \"Item Name\"> <\"name\"|\"category\"|\"price\"|\"availability\"> <\"New Value\">");
        console.log("Example by ID: node update.item.js M001 \"price\" 16.50");
        console.log("Example by Name: node update.item.js \"Caesar Salad\" \"availability\" false");
        process.exit(1);
    }

    const identifier = args[0];
    const field = args[1];
    const value = args[2];

    await updateMenuItem(identifier, field, value)
        .catch(error => {
            console.error("Failed to update item:", error);
            process.exit(1);
        });
}

main();