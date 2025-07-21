const loadMenu = require('./load.menu.js');
const saveMenu = require('./save.menu.js');

function generateItemId() {
    return 'M' + Date.now().toString().slice(-7) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}

async function addItem(name, category, price, availabilityString) {
    if (!name || !category || !price) {
        console.error("Error: Name, Category, and Price are required.");
        process.exit(1);
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
        console.error("Error: Price must be a positive number.");
        process.exit(1);
    }

    let availability = true;
    if (availabilityString !== undefined) {
        const lowerCaseAvailability = availabilityString.toLowerCase();
        if (lowerCaseAvailability === 'true' || lowerCaseAvailability === 'yes' || lowerCaseAvailability === '1') {
            availability = true;
        } else if (lowerCaseAvailability === 'false' || lowerCaseAvailability === 'no' || lowerCaseAvailability === '0') {
            availability = false;
        } else {
            console.warn(`Warning: Invalid availability value "${availabilityString}". Defaulting to 'true'.`);
            availability = true;
        }
    }

    const menuItems = await loadMenu();

    const newItem = {
        id: generateItemId(),
        name: name,
        category: category,
        price: parsedPrice,
        availability: availability
    };

    menuItems.push(newItem);

    await saveMenu(menuItems);
    console.log(`Item "${name}" (ID: ${newItem.id}) added successfully.`);
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length < 3 || args.length > 4) {
        console.log("Usage: node add.item.js <\"Name\"> <\"Category\"> <Price> [\"Availability\" (true/false)]");
        console.log("Example: node add.item.js \"Cheeseburger\" \"Main Course\" 12.50 true");
        console.log("Example: node add.item.js \"Coffee\" \"Beverage\" 3.00");
        process.exit(1);
    }

    const name = args[0];
    const category = args[1];
    const price = args[2];
    const availabilityString = args[3];

    await addItem(name, category, price, availabilityString)
        .catch(error => {
            console.error("Failed to add item:", error);
            process.exit(1);
        });
}

main();