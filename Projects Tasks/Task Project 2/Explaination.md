🧑‍💼 Task: Employee Directory
===========================

📁 Goal:
Create a system to manage a list of employees in a company.

📂 Structure:

employee_directory/
├── data/
│   └── employees.json

├── modules/
│   ├── add.employee.js
│   ├── delete.employee.js
│   ├── read.employees.js
│   ├── update.employee.js
│   └── save.employees.js
└── main.js

📝 Description:
- employees.json: Stores an array of employee objects.
- add.employee.js: Adds a new employee with name, ID, department, and job title.
- delete.employee.js: Deletes employee record by ID.
- read.employees.js: Reads from file and displays all employees.
- update.employee.js: Edits details of a specific employee.
- save.employees.js: Writes the updated list to JSON.
- main.js: Entry point to test functionality via command line.
