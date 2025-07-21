const loadMenu = require('./load.menu.js');
const saveMenu = require('./save.menu.js');

async function deleteItem(identifier) {
    if (!identifier) {
        console.error("Error: Item ID or Name is required to delete an item.");
        process.exit(1);
    }

    const menuItems = await loadMenu();
    const initialLength = menuItems.length;

    let updatedMenuItems = [];
    let itemFound = false;

    // Heuristic: Check if identifier looks like an ID (starts with 'M' and contains numbers)
    const isId = identifier.toUpperCase().startsWith('M') && /\d/.test(identifier);

    if (isId) {
        updatedMenuItems = menuItems.filter(item => {
            if (item.id.toLowerCase() === identifier.toLowerCase()) {
                itemFound = true;
                return false; // Exclude this item
            }
            return true; // Keep other items
        });
        if (itemFound) {
            console.log(`Item with ID "${identifier}" deleted successfully.`);
        } else {
            console.log(`No item found with ID "${identifier}".`);
        }
    } else {
        // Assume it's a name if not an ID
        updatedMenuItems = menuItems.filter(item => {
            if (item.name.toLowerCase() === identifier.toLowerCase()) {
                if (!itemFound) { // Only delete the first match for a name (to avoid accidental multiple deletes)
                    itemFound = true;
                    return false; // Exclude this item
                }
            }
            return true; // Keep other items
        });
        if (itemFound) {
            console.log(`Item "${identifier}" deleted successfully.`);
            console.log("Note: If multiple items have this name, only the first one found was deleted.");
        } else {
            console.log(`No item found with name "${identifier}".`);
        }
    }

    if (itemFound) {
        await saveMenu(updatedMenuItems);
    } else {
        console.log("No changes made to menu.json.");
    }
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length !== 1) {
        console.log("Usage: node delete.item.js <\"Item ID\" | \"Item Name\">");
        console.log("Example by ID: node delete.item.js M003");
        console.log("Example by Name: node delete.item.js \"Caesar Salad\"");
        process.exit(1);
    }

    const identifier = args[0];

    await deleteItem(identifier)
        .catch(error => {
            console.error("Failed to delete item:", error);
            process.exit(1);
        });
}

main();