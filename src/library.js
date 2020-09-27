const library = document.getElementById("app3");
library.innerHTML = `
<div id="library" data-aos="fade-up">
    <div id="sidebar">
        <form id="form">
            <input class="full-size" type="text" id="book-name" name="book-name" placeholder="Book" required>
            <input class="full-size" type="text" id="author-name" name="author-name" placeholder="Author">
            <input class="half-size" type="number" id="page-count" name="page-count" placeholder="Pages"><!--
        --><div class="half-size center">
                <label for="read-check">Read </label>
                <input type="checkbox" id="read-check" name="read"></div>
            <button class="half-size" type="button" id="add-book">Add Book</button><!--
        --><div class="half-size center"><a id="reset">Reset</a></div>
        </form>
    </div>
    <div id="book-list">
    </div>
</div>
`;

let myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(name, author, pages, read) {
  let b = new Book(name, author, pages, read);
  myLibrary.push(b);
}

function render() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";
  for (let idNum = 0; idNum < myLibrary.length; idNum++) {
    bookList.innerHTML += `
            <div class="list-item ${
              myLibrary[idNum].read ? "read-item" : ""
            }" data-id="${idNum}">
                <div class="item-left">
                    <h3>${myLibrary[idNum].name}</h3>
                    <p>${myLibrary[idNum].author}</p>
                    <p>${myLibrary[idNum].pages} pages</p>
                </div>
                <div class="item-right">
                    <label for="read-item-${idNum}">Read </label>
                    <input type="checkbox" id="read-item-${idNum}" name="read" onchange="checkedItem(${idNum});" ${
      myLibrary[idNum].read ? "checked" : ""
    }>
                    <a class="delete-item" data-index="${idNum}" onclick="deleteEntry(${idNum});">[delete]</a>
                </div>
            </div>
        `;
  }
}

function deleteEntry(id) {
  const listItem = document.querySelector(`[data-id="${id}"]`);
  listItem.classList.add("poof");
  setTimeout(() => {
    myLibrary.splice(id, 1);
    render();
  }, 250);
}

function checkedItem(item) {
  myLibrary[item].read = !myLibrary[item].read; //toggle the boolean
  let a = event.target;
  const listItem = document.querySelector(`[data-id="${item}"]`);
  if (a.checked) {
    listItem.classList.add("read-item");
  } else {
    listItem.classList.remove("read-item");
  }
}

let submit = document.getElementById("add-book");
submit.addEventListener("click", () => {
  let bookName = document.getElementById("book-name").value;
  let authorName = document.getElementById("author-name").value;
  let pageCount = document.getElementById("page-count").value;
  let readCheck = document.getElementById("read-check").checked;

  if (bookName == "") {
    return;
  }
  if (authorName == "") {
    authorName = "unknown author";
  }
  if (pageCount == "") {
    pageCount = "?";
  }

  addBookToLibrary(bookName, authorName, pageCount, readCheck);
  render();
  document.getElementById("form").reset();
});

var reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  document.getElementById("form").reset();
});

addBookToLibrary(
  "The Lord of the Rings: The Fellowship of the Ring",
  "J.R.R. Tolkien",
  480,
  true
);
addBookToLibrary("Dune", "Frank Herbert", 896, false);
addBookToLibrary(
  "The Hitchhiker's Guide to the Galaxy",
  "Douglas Adams",
  224,
  true
);
addBookToLibrary("Uzumaki", "Junji Ito", 648, true);
render();
