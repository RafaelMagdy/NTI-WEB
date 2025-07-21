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
            console.error(`The file "${GRADES_FILE}" was not found. Cannot update grades.`);
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

async function updateStudentGrade(identifier, subject, newScore) {
    if (typeof newScore !== 'number' || isNaN(newScore) || newScore < 0 || newScore > 100) {
        console.error("Error: New grade must be a number between 0 and 100.");
        process.exit(1);
    }

    const grades = await readGrades();
    if (grades.length === 0) {
        console.log("No student records found to update.");
        return;
    }

    let studentToUpdate = null;
    let studentIndex = -1;

    const isId = identifier.toUpperCase().startsWith('S') && identifier.length > 4;
    if (isId) {
        studentIndex = grades.findIndex(s => s.id.toLowerCase() === identifier.toLowerCase());
        if (studentIndex !== -1) {
            studentToUpdate = grades[studentIndex];
        }
    }

    if (!studentToUpdate) {
        studentIndex = grades.findIndex(s => s.name.toLowerCase() === identifier.toLowerCase());
        if (studentIndex !== -1) {
            studentToUpdate = grades[studentIndex];
        }
    }

    if (!studentToUpdate) {
        console.log(`Error: Student with identifier "${identifier}" not found.`);
        return;
    }

    const gradeIndex = studentToUpdate.grades.findIndex(g => g.course.toLowerCase() === subject.toLowerCase());

    if (gradeIndex !== -1) {
        studentToUpdate.grades[gradeIndex].score = newScore;
        await writeGrades(grades);
        console.log(`Updated ${subject} grade for "${studentToUpdate.name}" (ID: ${studentToUpdate.id}) to ${newScore}.`);
    } else {
        console.log(`Error: Subject "${subject}" not found for student "${studentToUpdate.name}".`);
        console.log("If you want to add a new grade for this subject, use add.grade.js.");
    }
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length !== 3) {
        console.log("Usage: node update.grade.js <\"Student ID\" | \"Student Name\"> <\"Subject\"> <New Grade>");
        console.log("Example by ID: node update.grade.js S001 \"Math\" 95");
        console.log("Example by Name: node update.grade.js \"Alice Smith\" \"Science\" 89");
        process.exit(1);
    }

    const identifier = args[0];
    const subject = args[1];
    const newGrade = parseFloat(args[2]);

    await updateStudentGrade(identifier, subject, newGrade)
        .catch(error => {
            console.error("Failed to update grade:", error);
            process.exit(1);
        });
}

main();