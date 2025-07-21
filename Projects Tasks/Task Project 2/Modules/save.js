const fs = require('fs');
const path = require('path');

const EMPLOYEES_FILE = 'employees.json';
const EMPLOYEES_FILE_PATH = path.join(__dirname, EMPLOYEES_FILE);

async function saveEmployees(employees) {
    try {
        const jsonString = JSON.stringify(employees, null, 2);
        await fs.promises.writeFile(EMPLOYEES_FILE_PATH, jsonString, 'utf8');
        console.log(`Employee data successfully saved to ${EMPLOYEES_FILE}`);
    } catch (error) {
        console.error("Error saving employees file:", error);
        throw error;
    }
}

module.exports = saveEmployees;