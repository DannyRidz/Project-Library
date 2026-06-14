const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    const library = document.querySelector('#library');

    library.innerHTML = "";

    for (const book of myLibrary) {
        const bookCard = document.createElement("div");

        bookCard.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read ? "read" : "not read yet"}`;

        library.appendChild(bookCard);
    }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);

displayBooks();