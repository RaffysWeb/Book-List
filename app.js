// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.querySelector('#book-list');
  // Create tr element
  const row = document.createElement('tr');
  //Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function (message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  // insert in the form before the div
  container.insertBefore(div, form);

  //Timout after 3 seconts
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}


//Clear fields
UI.prototype.clearFields = function () {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}

// Event Listeners add Book
document.querySelector('#book-form').addEventListener('submit', function (e) {
  //Get form values
  const title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    //Error Alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    //Show Success
    ui.showAlert('Book Added!', 'success');
    //Clear fields
    ui.clearFields();
  }
  e.preventDefault();
});

// Event listener for del
document.querySelector('#book-list').addEventListener('click', function (e) {
  // Instantiate UI
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book Removed!', 'success');
  e.preventDefault();
});