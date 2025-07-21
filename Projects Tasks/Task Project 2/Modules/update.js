const loadEmployees = require('./load.employees.js');
const saveEmployees = require('./save.employees.js');

async function updateEmployee(id, fieldToUpdate, newValue) {
    if (!id || !fieldToUpdate || !newValue) {
        console.error("Error: Employee ID, field to update, and new value are all required.");
        console.error("Usage: node update.employee.js <ID> <\"name\"|\"department\"|\"jobTitle\"> <\"New Value\">");
        process.exit(1);
    }

    const employees = await loadEmployees();
    const employeeIndex = employees.findIndex(emp => emp.id.toLowerCase() === id.toLowerCase());

    if (employeeIndex === -1) {
        console.error(`Error: Employee with ID "${id}" not found.`);
        process.exit(1);
    }

    const employee = employees[employeeIndex];

    switch (fieldToUpdate.toLowerCase()) {
        case 'name':
            employee.name = newValue;
            break;
        case 'department':
            employee.department = newValue;
            break;
        case 'jobtitle':
            employee.jobTitle = newValue;
            break;
        default:
            console.error(`Error: Invalid field to update. Can only update 'name', 'department', or 'jobTitle'.`);
            process.exit(1);
    }

    await saveEmployees(employees);
    console.log(`Employee ID "${id}"'s ${fieldToUpdate} updated to "${newValue}" successfully.`);
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length !== 3) {
        console.log("Usage: node update.employee.js <ID> <\"name\"|\"department\"|\"jobTitle\"> <\"New Value\">");
        console.log("Example: node update.employee.js E001 \"department\" \"Research & Development\"");
        console.log("Example: node update.employee.js E002 \"name\" \"Robert Johnson\"");
        process.exit(1);
    }

    const id = args[0];
    const field = args[1];
    const value = args[2];

    await updateEmployee(id, field, value)
        .catch(error => {
            console.error("Failed to update employee:", error);
            process.exit(1);
        });
}

main();