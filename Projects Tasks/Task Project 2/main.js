const { spawn } = require('child_process');

function showUsage() {
    console.log("Usage: node main.js <command> [arguments]");
    console.log("\nCommands:");
    console.log("  read                                   - Displays all employee records.");
    console.log("  add    <ID> <\"Name\"> <\"Department\"> <\"Job Title\"> - Adds a new employee record.");
    console.log("  update <ID> <\"name\"|\"department\"|\"jobTitle\"> <\"New Value\"> - Edits details of a specific employee.");
    console.log("  delete <ID>                            - Deletes an employee record by ID.");
    console.log("\nExamples:");
    console.log("  node main.js read");
    console.log("  node main.js add E005 \"Sarah Connor\" \"Cybersecurity\" \"Security Analyst\"");
    console.log("  node main.js update E001 \"department\" \"Product Development\"");
    console.log("  node main.js delete E003");
}

function executeScript(scriptName, args) {
    const child = spawn('node', [scriptName, ...args], { stdio: 'inherit' });

    child.on('error', (err) => {
        console.error(`Failed to start ${scriptName} script:`, err);
    });

    child.on('close', (code) => {
        if (code !== 0) {
            console.error(`\n${scriptName} exited with code ${code}`);
        }
    });
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const commandArgs = args.slice(1);

    if (!command) {
        showUsage();
        process.exit(1);
    }

    switch (command.toLowerCase()) {
        case 'read':
            if (commandArgs.length !== 0) {
                console.error("Error: 'read' command takes no arguments.");
                showUsage();
                process.exit(1);
            }
            executeScript('read.employees.js', []);
            break;
        case 'add':
            if (commandArgs.length !== 4) {
                console.error("Error: 'add' command requires <ID> <\"Name\"> <\"Department\"> <\"Job Title\">.");
                showUsage();
                process.exit(1);
            }
            executeScript('add.employee.js', commandArgs);
            break;
        case 'update':
            if (commandArgs.length !== 3) {
                console.error("Error: 'update' command requires <ID> <\"name\"|\"department\"|\"jobTitle\"> <\"New Value\">.");
                showUsage();
                process.exit(1);
            }
            executeScript('update.employee.js', commandArgs);
            break;
        case 'delete':
            if (commandArgs.length !== 1) {
                console.error("Error: 'delete' command requires <ID>.");
                showUsage();
                process.exit(1);
            }
            executeScript('delete.employee.js', commandArgs);
            break;
        default:
            console.error(`Unknown command: "${command}"`);
            showUsage();
            process.exit(1);
    }
}

main();