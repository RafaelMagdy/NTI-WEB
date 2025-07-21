const loadEmployees = require('./load.employees.js');
const saveEmployees = require('./save.employees.js');

async function addEmployee(id, name, department, jobTitle) {
    if (!id || !name || !department || !jobTitle) {
        console.error("Error: All fields (ID, Name, Department, Job Title) are required.");
        process.exit(1);
    }

    const employees = await loadEmployees();

    const existingEmployee = employees.find(emp => emp.id.toLowerCase() === id.toLowerCase());

    if (existingEmployee) {
        console.error(`Error: An employee with ID "${id}" already exists.`);
        process.exit(1);
    }

    const newEmployee = {
        id: id,
        name: name,
        department: department,
        jobTitle: jobTitle
    };

    employees.push(newEmployee);

    await saveEmployees(employees);
    console.log(`Employee "${name}" (ID: ${id}) added successfully.`);
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length !== 4) {
        console.log("Usage: node add.employee.js <ID> <\"Name\"> <\"Department\"> <\"Job Title\">");
        console.log("Example: node add.employee.js E004 \"Emily White\" \"Marketing\" \"Marketing Specialist\"");
        process.exit(1);
    }

    const id = args[0];
    const name = args[1];
    const department = args[2];
    const jobTitle = args[3];

    await addEmployee(id, name, department, jobTitle)
        .catch(error => {
            console.error("Failed to add employee:", error);
            process.exit(1);
        });
}

main();