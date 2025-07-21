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

function generateStudentId() {
    return 'S' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
}

async function addGrade(studentName, subject, score) {
    if (typeof score !== 'number' || isNaN(score) || score < 0 || score > 100) {
        console.error("Error: Grade must be a number between 0 and 100.");
        process.exit(1);
    }

    const grades = await readGrades();

    let student = grades.find(s => s.name.toLowerCase() === studentName.toLowerCase());

    if (!student) {
        student = {
            id: generateStudentId(),
            name: studentName,
            grades: []
        };
        grades.push(student);
        console.log(`New student "${studentName}" (ID: ${student.id}) added.`);
    }

    const existingGradeIndex = student.grades.findIndex(g => g.course.toLowerCase() === subject.toLowerCase());

    if (existingGradeIndex !== -1) {
        student.grades[existingGradeIndex].score = score;
        console.log(`Updated "${subject}" grade for "${studentName}" to ${score}.`);
    } else {
        student.grades.push({ course: subject, score: score });
        console.log(`Added "${subject}" grade (${score}) for "${studentName}".`);
    }

    await writeGrades(grades);
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length !== 3) {
        console.log("Usage: node add.grade.js <\"Student Name\"> <\"Subject\"> <Grade>");
        console.log("Example: node add.grade.js \"Alice Smith\" \"Physics\" 85");
        process.exit(1);
    }

    const studentName = args[0];
    const subject = args[1];
    const grade = parseFloat(args[2]);

    await addGrade(studentName, subject, grade)
        .catch(error => {
            console.error("Failed to add grade:", error);
            process.exit(1);
        });
}

main();