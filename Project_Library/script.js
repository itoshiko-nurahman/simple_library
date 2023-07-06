let showFormBtn = document.getElementById("show-form-btn");
let formBox = document.querySelector(".form-box");
let form = document.getElementById("form");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary() {
  // do stuff here
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").value;
  const newBook = new Book(title, author, pages, read);

  // Add the new book to the array
  myLibrary.push(newBook);

  // Function to make list of books appear in the screen
  showBookList();
}

function showBookList() {
  let showBook = document.querySelector(".show-book");
  showBook.innerHTML = ""; // remove any exisiting elements before, so no double
  // Get the list of books
  for (i = 0; i < myLibrary.length; i++) {
    books = myLibrary[i];
    bookTable = document.createElement("div");

    // Memberi index ke setiap buku untuk memudahkan menghapus dan edit
    bookTable.setAttribute("data-index", myLibrary.indexOf(books));
    bookTable.className = "book";
    bookTable.innerHTML = `<h1>${books.title}</h1>
        <p>By ${books.author}</p>
        <p>${books.pages} Pages</p>
        <p>${Boolean(books.read) ? "Done read" : "Not Read Yet"}</p>
        <div class="book-btn">
          <button class="btn" type="button" id="read-btn" onclick="toggleRead(${i})">Read</button>
          <button class="btn" type="button" id="delete-btn" onclick="deleteBook(${i})">Delete</button>
        </div>`;
    showBook.appendChild(bookTable);
  }
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  showBookList();
}

function toggleRead(index) {
  myLibrary[index].toggleRead();
  showBookList();
}

// Show form when button is clicked
showFormBtn.addEventListener("click", () => {
  if (formBox.style.display == "block") {
    return (formBox.style.display = "none");
  } else {
    formBox.style.display = "block";
  }
});

// Submit button action
formBox.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent submit to send the form to the server
  addBookToLibrary();
  formBox.style.display = "none";
  form.reset();
});
