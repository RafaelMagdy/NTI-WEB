const { spawn } = require('child_process');

function showUsage() {
    console.log("Usage: node main.js <command> [arguments]");
    console.log("\nCommands:");
    console.log("  read                                   - Displays all student grades.");
    console.log("  add    <\"Student Name\"> <\"Subject\"> <Grade> - Adds a new grade record or updates if subject exists.");
    console.log("  update <\"Student ID\" | \"Student Name\"> <\"Subject\"> <New Grade> - Updates an existing student's grade for a specific subject.");
    console.log("  delete <\"Student ID\" | \"Student Name\">      - Deletes an entire student's grade record.");
    console.log("\nExamples:");
    console.log("  node main.js read");
    console.log("  node main.js add \"Jane Doe\" \"Chemistry\" 88");
    console.log("  node main.js update S001 \"Math\" 92");
    console.log("  node main.js delete \"John Smith\"");
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
            executeScript('read.grades.js', []);
            break;
        case 'add':
            if (commandArgs.length !== 3) {
                console.error("Error: 'add' command requires <\"Student Name\"> <\"Subject\"> <Grade>.");
                showUsage();
                process.exit(1);
            }
            executeScript('add.grade.js', commandArgs);
            break;
        case 'update':
            if (commandArgs.length !== 3) {
                console.error("Error: 'update' command requires <\"Student ID\" | \"Student Name\"> <\"Subject\"> <New Grade>.");
                showUsage();
                process.exit(1);
            }
            executeScript('update.grade.js', commandArgs);
            break;
        case 'delete':
            if (commandArgs.length !== 1) {
                console.error("Error: 'delete' command requires <\"Student ID\" | \"Student Name\">.");
                showUsage();
                process.exit(1);
            }
            executeScript('delete.grade.js', commandArgs);
            break;
        default:
            console.error(`Unknown command: "${command}"`);
            showUsage();
            process.exit(1);
    }
}

main();