const students = [];

let nextStudentId = 1;

function addStudent(name, grades) {
    if (!Array.isArray(grades) || grades.some(grade => typeof grade !== 'number' || grade < 0)) {
        console.log(`Error: Grades for ${name} must be an array of non-negative numbers.`);
        return;
    }

    const newStudent = {
        id: nextStudentId++,
        name: name,
        grades: [...grades]
    };
    students.push(newStudent);
    console.log(`Student "${name}" (ID: ${newStudent.id}) added with grades: ${grades.join(', ')}`);
}

function calculateAverage(grades) {
    if (!Array.isArray(grades) || grades.length === 0) {
        return 0;
    }
    const sum = grades.reduce((total, grade) => total + grade, 0);
    return sum / grades.length;
}

function listStudents() {
    if (students.length === 0) {
        console.log("No students in the gradebook yet.");
        return;
    }

    console.log("\n--- All Students ---");
    students.forEach(student => {
        const average = calculateAverage(student.grades);
        console.log(`ID: ${student.id}, Name: ${student.name}, Grades: [${student.grades.join(', ')}], Average: ${average.toFixed(2)}`);
    });
    console.log("--------------------");
}

function filterPassed() {
    const passedStudents = students.filter(student => {
        const average = calculateAverage(student.grades);
        return average >= 60;
    });

    if (passedStudents.length === 0) {
        console.log("\nNo students have passed yet (average >= 60).");
        return;
    }

    console.log("\n--- Students Who Passed (Average >= 60) ---");
    passedStudents.forEach(student => {
        const average = calculateAverage(student.grades);
        console.log(`ID: ${student.id}, Name: ${student.name}, Average: ${average.toFixed(2)}`);
    });
    console.log("-------------------------------------------");
}

console.log("--- Student Gradebook Operations ---");

addStudent("Alice Smith", [85, 90, 78, 92]);
addStudent("Bob Johnson", [55, 60, 62, 58]);
addStudent("Charlie Brown", [70, 75, 68, 80]);
addStudent("Diana Prince", [95, 98, 100, 97]);
addStudent("Eve Adams", [40, 35, 50, 45]);

listStudents();

filterPassed();

console.log("\n--- Adding another student ---");
addStudent("Frank Miller", [65, 70, 55, 60]);

listStudents();

filterPassed();

console.log("\n--- Attempting to add student with invalid grades ---");
addStudent("Invalid Student", [70, "eighty", 90]);
addStudent("No Grades", []);

listStudents();
