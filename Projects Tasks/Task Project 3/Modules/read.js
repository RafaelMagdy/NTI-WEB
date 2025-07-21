const loadMenu = require('./load.menu.js');

async function displayAvailableMenuItems() {
    console.log("--- Available Menu Items ---");
    try {
        const menuItems = await loadMenu();

        if (menuItems.length === 0) {
            console.log("No menu items found.");
            return;
        }

        const availableItems = menuItems.filter(item => item.availability === true);

        if (availableItems.length === 0) {
            console.log("No available menu items at the moment.");
            return;
        }

        availableItems.forEach(item => {
            console.log(`\nID: ${item.id}`);
            console.log(`Name: ${item.name}`);
            console.log(`Category: ${item.category}`);
            console.log(`Price: $${item.price.toFixed(2)}`);
            console.log(`Availability: ${item.availability ? 'Available' : 'Not Available'}`); // Will always be Available here
        });
        console.log("\n--- End of Available Items ---");

    } catch (error) {
        console.error("Failed to display menu items:", error);
    }
}

displayAvailableMenuItems();