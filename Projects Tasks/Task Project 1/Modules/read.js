const fs = require('fs');
const path = require('path');

const GRADES_FILE = 'grades.json';
const GRADES_FILE_PATH = path.join(__dirname, GRADES_FILE);

async function readGrades() {
    try {
        const data = await fs.promises.readFile(GRADES_FILE_PATH, 'utf8');
        if (data.trim() === '') {
            return [];
        }
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`The file "${GRADES_FILE}" was not found. No grades to display.`);
            return [];
        }
        console.error("Error reading grades file:", error);
        throw error;
    }
}

async function displayAllGrades() {
    console.log("--- Student Grades ---");
    try {
        const grades = await readGrades();

        if (grades.length === 0) {
            console.log("No student grade records found.");
            return;
        }

        grades.forEach(student => {
            console.log(`\nStudent ID: ${student.id}`);
            console.log(`Name: ${student.name}`);
            if (student.grades && student.grades.length > 0) {
                console.log("Grades:");
                student.grades.forEach(grade => {
                    console.log(`  - ${grade.course}: ${grade.score}`);
                });
            } else {
                console.log("  No grades recorded for this student.");
            }
        });
        console.log("\n--- End of Grades ---");

    } catch (error) {
        console.error("Failed to display grades:", error);
    }
}

displayAllGrades();