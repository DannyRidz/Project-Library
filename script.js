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

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.dataset.id = book.id;

        bookCard.appendChild(removeButton);

        library.appendChild(bookCard);
    }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);

displayBooks();

const bookForm = document.querySelector('#book-form');

const newBookButton = document.querySelector('#new-book-button');

newBookButton.addEventListener("click", function () {
    bookForm.style.display = "block";
});

bookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks();

    bookForm.reset();
    bookForm.style.display = "none";
});