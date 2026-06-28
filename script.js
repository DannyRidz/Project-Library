const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  const library = document.querySelector("#library");

  library.innerHTML = "";

  for (const book of myLibrary) {
    const bookCard = document.createElement("div");

    bookCard.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read ? "read" : "not read yet"}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.dataset.id = book.id;

    removeButton.addEventListener("click", function () {
      const bookId = removeButton.dataset.id;
      const bookIndex = myLibrary.findIndex(function (book) {
        return book.id === bookId;
      });

      myLibrary.splice(bookIndex, 1);
      displayBooks();
    });

    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = book.read ? "Mark Not Read" : "Mark Read";
    toggleReadButton.dataset.id = book.id;

    toggleReadButton.addEventListener("click", function () {
      const bookId = toggleReadButton.dataset.id;
      const bookToToggle = myLibrary.find(function (book) {
        return book.id === bookId;
      });

      bookToToggle.toggleRead();
      displayBooks();
    });

    bookCard.appendChild(toggleReadButton);

    bookCard.appendChild(removeButton);

    library.appendChild(bookCard);
  }
}

displayBooks();

const newBookButton = document.querySelector("#new-book-button");

newBookButton.addEventListener("click", function () {
  bookForm.style.display = "block";
});

const bookForm = document.querySelector("#book-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
// const newBookButton = document.querySelector("#new-book-button");

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (
    !titleInput.validity.valid ||
    !authorInput.validity.valid ||
    !pagesInput.validity.valid
  ) {
    showErrors();
  } else {
    clearErrors();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = document.querySelector("#read").checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks();

    bookForm.reset();
    bookForm.style.display = "none";
  }
});

function showErrors() {
  const titleError = titleInput.nextElementSibling;
  if (titleInput.validity.valueMissing) {
    titleError.textContent = "Please enter a book title.";
    titleError.classList.add("active");
  } else {
    titleError.textContent = "";
    titleError.classList.remove("active");
  }

  const authorError = authorInput.nextElementSibling;
  if (authorInput.validity.valueMissing) {
    authorError.textContent = "Please provide an author name.";
    authorError.classList.add("active");
  } else if (authorInput.validity.tooShort) {
    authorError.textContent = `Author name must be at least ${authorInput.minLength} characters. You only typed ${authorInput.value.length}.`;
    authorError.classList.add("active");
  } else {
    authorError.textContent = "";
    authorError.classList.remove("active");
  }

  const pagesError = pagesInput.nextElementSibling;
  if (pagesInput.validity.valueMissing) {
    pagesError.textContent = "Please enter the number of pages.";
    pagesError.classList.add("active");
  } else if (pagesInput.validity.rangeUnderflow) {
    pagesError.textContent = "A book must have at least 1 page.";
  } else {
    pagesError.textContent = "";
    pagesError.classList.add("active");
  }
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-msg");
  errorMessages.forEach((msg) => {
    msg.textContent = "";
    msg.classList.remove("active");
  });
}

titleInput.addEventListener("input", showErrors);
authorInput.addEventListener("input", showErrors);
pagesInput.addEventListener("input", showErrors);
