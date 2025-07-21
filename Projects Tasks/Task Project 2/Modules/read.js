const loadEmployees = require('./load.employees.js');

async function displayAllEmployees() {
    console.log("--- Employee Records ---");
    try {
        const employees = await loadEmployees();

        if (employees.length === 0) {
            console.log("No employee records found.");
            return;
        }

        employees.forEach(employee => {
            console.log(`\nID: ${employee.id}`);
            console.log(`Name: ${employee.name}`);
            console.log(`Department: ${employee.department}`);
            console.log(`Job Title: ${employee.jobTitle}`);
        });
        console.log("\n--- End of Records ---");

    } catch (error) {
        console.error("Failed to display employees:", error);
    }
}

displayAllEmployees();