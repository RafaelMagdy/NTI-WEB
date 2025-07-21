const fs = require('fs');
const path = require('path');

const GRADES_FILE = 'grades.json';
const GRADES_FILE_PATH = path.join(__dirname, GRADES_FILE);

async function saveGrades(grades) {
    try {
        const jsonString = JSON.stringify(grades, null, 2);
        await fs.promises.writeFile(GRADES_FILE_PATH, jsonString, 'utf8');
        console.log(`Grades successfully saved to ${GRADES_FILE}`);
    } catch (error) {
        console.error("Error saving grades file:", error);
        throw error;
    }
}

module.exports = saveGrades;