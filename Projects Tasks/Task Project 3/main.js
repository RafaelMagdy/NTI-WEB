const { spawn } = require('child_process');

function showUsage() {
    console.log("Usage: node main.js <command> [arguments]");
    console.log("\nCommands:");
    console.log("  read                                   - Displays all available menu items.");
    console.log("  add    <\"Name\"> <\"Category\"> <Price> [\"Availability\" (true/false)] - Adds a new food item.");
    console.log("  update <\"Item ID\" | \"Item Name\"> <\"name\"|\"category\"|\"price\"|\"availability\"> <\"New Value\"> - Edits details of a specific item.");
    console.log("  delete <\"Item ID\" | \"Item Name\">      - Removes a food item by name or ID.");
    console.log("\nExamples:");
    console.log("  node main.js read");
    console.log("  node main.js add \"Veggie Burger\" \"Main Course\" 10.99 true");
    console.log("  node main.js update M001 \"price\" 16.50");
    console.log("  node main.js delete \"Coca-Cola\"");
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
            executeScript('read.menu.js', []);
            break;
        case 'add':
            if (commandArgs.length < 3 || commandArgs.length > 4) {
                console.error("Error: 'add' command requires <\"Name\"> <\"Category\"> <Price> [\"Availability\" (true/false)].");
                showUsage();
                process.exit(1);
            }
            executeScript('add.item.js', commandArgs);
            break;
        case 'update':
            if (commandArgs.length !== 3) {
                console.error("Error: 'update' command requires <\"Item ID\" | \"Item Name\"> <\"name\"|\"category\"|\"price\"|\"availability\"> <\"New Value\">.");
                showUsage();
                process.exit(1);
            }
            executeScript('update.item.js', commandArgs);
            break;
        case 'delete':
            if (commandArgs.length !== 1) {
                console.error("Error: 'delete' command requires <\"Item ID\" | \"Item Name\">.");
                showUsage();
                process.exit(1);
            }
            executeScript('delete.item.js', commandArgs);
            break;
        default:
            console.error(`Unknown command: "${command}"`);
            showUsage();
            process.exit(1);
    }
}

main();