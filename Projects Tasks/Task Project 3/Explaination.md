🍽️ Task: Food Menu Manager
=============================

📁 Goal:
Develop a restaurant menu management system that allows CRUD operations on food items.

📂 Structure:

food_menu_manager/
├── data/
│   └── menu.json

├── modules/
│   ├── add.item.js
│   ├── delete.item.js
│   ├── read.menu.js
│   ├── update.item.js
│   └── save.menu.js
└── main.js

📝 Description:
- menu.json: Contains a list of food items (name, category, price, availability).
- add.item.js: Adds a new food item.
- delete.item.js: Removes a food item by name or ID.
- read.menu.js: Reads from file and displays all available menu items.
- update.item.js: Edits item details (e.g., price or availability).
- save.menu.js: Persists changes to the file.
- main.js: Entry point to test functionality via command line.
