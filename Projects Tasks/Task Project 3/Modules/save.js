const fs = require('fs');
const path = require('path');

const MENU_FILE = 'menu.json';
const MENU_FILE_PATH = path.join(__dirname, MENU_FILE);

async function saveMenu(menuItems) {
    try {
        const jsonString = JSON.stringify(menuItems, null, 2);
        await fs.promises.writeFile(MENU_FILE_PATH, jsonString, 'utf8');
        console.log(`Menu data successfully saved to ${MENU_FILE}`);
    } catch (error) {
        console.error("Error saving menu file:", error);
        throw error;
    }
}

module.exports = saveMenu;