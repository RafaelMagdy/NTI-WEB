const books = [];

let nextBookId = 1;

function addBook(title, author) {
    if (!title || !author) {
        console.log("Error: Book must have a title and an author.");
        return;
    }

    const newBook = {
        id: nextBookId++,
        title: title,
        author: author
    };
    books.push(newBook);
    console.log(`Book "${title}" by "${author}" (ID: ${newBook.id}) added.`);
}

function removeBook(bookId) {
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        const removedBook = books.splice(bookIndex, 1);
        console.log(`Book "${removedBook[0].title}" (ID: ${bookId}) removed.`);
    } else {
        console.log(`Book with ID ${bookId} not found.`);
    }
}

function listBooks() {
    if (books.length === 0) {
        console.log("The library is empty.");
        return;
    }

    console.log("\n--- All Books in Library ---");
    books.forEach(book => {
        console.log(`ID: ${book.id}, Title: "${book.title}", Author: "${book.author}"`);
    });
    console.log("----------------------------");
}

function searchBooks(authorQuery) {
    if (!authorQuery) {
        console.log("Please provide an author name to search for.");
        return [];
    }
    const lowerCaseQuery = authorQuery.toLowerCase();
    const matchedBooks = books.filter(book =>
        book.author.toLowerCase().includes(lowerCaseQuery)
    );

    if (matchedBooks.length === 0) {
        console.log(`No books found by author "${authorQuery}".`);
    } else {
        console.log(`\n--- Books by Author "${authorQuery}" ---`);
        matchedBooks.forEach(book => {
            console.log(`ID: ${book.id}, Title: "${book.title}", Author: "${book.author}"`);
        });
        console.log("-------------------------------------");
    }
    return matchedBooks;
}

console.log("--- Library Book Manager Operations ---");

addBook("Clean Code", "Robert C. Martin");
addBook("The Pragmatic Programmer", "Andrew Hunt");
addBook("Design Patterns", "Erich Gamma");
addBook("Clean Architecture", "Robert C. Martin");
addBook("Refactoring", "Martin Fowler");

listBooks();

searchBooks("Robert C. Martin");
searchBooks("hunt");
searchBooks("NonExistentAuthor");

console.log("\n--- Removing Book (ID: 3 - Design Patterns) ---");
removeBook(3);

listBooks();

console.log("\n--- Attempting to Remove Non-Existent Book (ID: 99) ---");
removeBook(99);

console.log("\n--- Adding another book ---");
addBook("The Mythical Man-Month", "Frederick Brooks");

listBooks();
