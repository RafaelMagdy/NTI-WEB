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
            return [];
        }
        console.error("Error reading grades file:", error);
        throw error;
    }
}

async function writeGrades(grades) {
    try {
        const jsonString = JSON.stringify(grades, null, 2);
        await fs.promises.writeFile(GRADES_FILE_PATH, jsonString, 'utf8');
        console.log(`Grades successfully updated in ${GRADES_FILE}`);
    } catch (error) {
        console.error("Error writing grades file:", error);
        throw error;
    }
}

async function deleteStudentGradeRecord(identifier) {
    const grades = await readGrades();
    
    let updatedGrades = [];
    let studentFound = false;

    const isId = identifier.toUpperCase().startsWith('S') && identifier.length > 4;

    if (isId) {
        updatedGrades = grades.filter(student => {
            if (student.id.toLowerCase() === identifier.toLowerCase()) {
                studentFound = true;
                return false;
            }
            return true;
        });
        if (studentFound) {
            console.log(`Student with ID "${identifier}" deleted successfully.`);
        } else {
            console.log(`No student found with ID "${identifier}".`);
        }
    } else {
        updatedGrades = grades.filter(student => {
            if (student.name.toLowerCase() === identifier.toLowerCase()) {
                if (!studentFound) {
                    studentFound = true;
                    return false;
                }
            }
            return true;
        });
        if (studentFound) {
            console.log(`Student "${identifier}" deleted successfully.`);
            console.log("Note: If multiple students have this name, only the first one found was deleted.");
        } else {
            console.log(`No student found with name "${identifier}".`);
        }
    }

    if (studentFound) {
        await writeGrades(updatedGrades);
    } else {
        console.log("No changes made to grades.json.");
    }
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length !== 1) {
        console.log("Usage: node delete.grade.js <\"Student ID\" | \"Student Name\">");
        console.log("Example by ID: node delete.grade.js S123456");
        console.log("Example by Name: node delete.grade.js \"Charlie Brown\"");
        process.exit(1);
    }

    const identifier = args[0];

    await deleteStudentGradeRecord(identifier)
        .catch(error => {
            console.error("Failed to delete grade record:", error);
            process.exit(1);
        });
}

main();