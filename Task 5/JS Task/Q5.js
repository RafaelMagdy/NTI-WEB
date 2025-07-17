const inventory = [];

let nextItemId = 101;

function addItem(name, quantity) {
    if (!name || typeof quantity !== 'number' || quantity < 0) {
        console.log("Error: Item must have a name and a non-negative quantity.");
        return;
    }

    const existingItem = inventory.find(item => item.name.toLowerCase() === name.toLowerCase());

    if (existingItem) {
        existingItem.quantity += quantity;
        console.log(`Updated quantity for "${name}". New quantity: ${existingItem.quantity}`);
    } else {
        const newItem = {
            id: nextItemId++,
            name: name,
            quantity: quantity
        };
        inventory.push(newItem);
        console.log(`Item "${name}" (ID: ${newItem.id}) added to inventory with quantity ${quantity}.`);
    }
}

function deleteItem(itemId) {
    const itemIndex = inventory.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        const removedItem = inventory.splice(itemIndex, 1);
        console.log(`Item "${removedItem[0].name}" (ID: ${itemId}) deleted from inventory.`);
    } else {
        console.log(`Item with ID ${itemId} not found in inventory.`);
    }
}

function listInventory() {
    if (inventory.length === 0) {
        console.log("Inventory is empty.");
        return;
    }

    console.log("\n--- Current Inventory ---");
    inventory.forEach(item => {
        console.log(`ID: ${item.id}, Name: "${item.name}", Quantity: ${item.quantity}`);
    });
    console.log("-------------------------");
}

function checkLowStock(threshold = 5) {
    const lowStockItems = inventory.filter(item => item.quantity < threshold);

    if (lowStockItems.length === 0) {
        console.log(`\nNo items are currently low on stock (below ${threshold} units).`);
        return;
    }

    console.log(`\n--- Low Stock Items (Quantity < ${threshold}) ---`);
    lowStockItems.forEach(item => {
        console.log(`ID: ${item.id}, Name: "${item.name}", Quantity: ${item.quantity}`);
    });
    console.log("-----------------------------------");
}

console.log("--- Inventory Management Operations ---");

addItem("Mouse", 10);
addItem("Keyboard", 3);
addItem("Monitor", 7);
addItem("Webcam", 4);
addItem("Headphones", 15);
addItem("Mouse", 5);

listInventory();

checkLowStock();
checkLowStock(8);

console.log("\n--- Deleting Item (ID: 103 - Monitor) ---");
deleteItem(103);

listInventory();

console.log("\n--- Attempting to Delete Non-Existent Item (ID: 999) ---");
deleteItem(999);

console.log("\n--- Adding another item ---");
addItem("USB Drive", 2);

listInventory();
checkLowStock();
