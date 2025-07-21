const loadEmployees = require('./load.employees.js');
const saveEmployees = require('./save.employees.js');

async function deleteEmployee(id) {
    if (!id) {
        console.error("Error: Employee ID is required to delete a record.");
        process.exit(1);
    }

    const employees = await loadEmployees();
    const initialLength = employees.length;

    const updatedEmployees = employees.filter(emp => emp.id.toLowerCase() !== id.toLowerCase());

    if (updatedEmployees.length < initialLength) {
        await saveEmployees(updatedEmployees);
        console.log(`Employee with ID "${id}" deleted successfully.`);
    } else {
        console.log(`Error: No employee found with ID "${id}". No changes made.`);
    }
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length !== 1) {
        console.log("Usage: node delete.employee.js <ID>");
        console.log("Example: node delete.employee.js E003");
        process.exit(1);
    }

    const id = args[0];

    await deleteEmployee(id)
        .catch(error => {
            console.error("Failed to delete employee:", error);
            process.exit(1);
        });
}

main();