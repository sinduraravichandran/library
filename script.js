const myLibrary = [];
const newBookButton = document.getElementById("new-book");
const addBookButton = document.getElementById("add-book");
const dialog = document.getElementById("dialog");
const form = document.getElementById("form");
const cardContainer = document.getElementById("books");



function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        let readStatus;
        if (this.read) {
            readStatus = "read"
        } else {
            readStatus = "not read yet"
        }
        return this.title + " by " + this.author + ", " + this.pages + ", " + readStatus;
    }
}

Book.prototype.readStatus = function() {
    this.read = !this.read;
}

//creates all the book elements and adds them to the page
function addBooksToPage() {
    //clear out books
    cardContainer.innerHTML = "";
    
    for (item of myLibrary) {
        //create a new card and add it to the container 
        const card = document.createElement("div");
        card.classList.add("card")
        cardContainer.appendChild(card);

        //create the text on the book
        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerText = `Title: ${item.title}\nAuthor: ${item.author}\nPages: ${item.pages}\nRead: ${item.read ? "Read" : "Not Read Yet"}`;
        card.appendChild(cardText);

        //add ID to card and add button
        card.dataset.id = item.id;
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("type", "button");
        deleteButton.classList.add("delete-button"); 
        deleteButton.innerText = "Delete";
        card.appendChild(deleteButton);

        //add read button
        const readButton = document.createElement("button");
        readButton.setAttribute("type", "button");
        readButton.classList.add("read-button");
        item.read ? readButton.innerText = "Mark as Unread" : readButton.innerText = "Mark as Read"
        card.appendChild(readButton);
    }
}


//open dialog when click 'New Book'
newBookButton.addEventListener('click', () => {
    dialog.showModal();

})

//user clicks add book, create book object, add to myLibrary, clear form
addBookButton.addEventListener('click', () => {
    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    const bookInput = new Book(title, author, pages, read);
    myLibrary.push(bookInput);
    addBooksToPage();
    form.reset()
})

//user clicks 'Delete' on a book
cardContainer.addEventListener("click", (e) => {
     if (!e.target.classList.contains("delete-button")) {
        return;
    }

    //get index of book from array that matches the book that was clicked
    const bookIndex = myLibrary.findIndex((book) => book.id === e.target.closest(".card").dataset.id);
    myLibrary.splice(bookIndex,1);
    addBooksToPage();
    
})

//user clicks 'Read' on a book 
cardContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("read-button")) {
        return;
    }

    //get index of book from array that matches the book that was clicked
    const bookIndex = myLibrary.findIndex((book) => book.id === e.target.closest(".card").dataset.id);
    myLibrary[bookIndex].readStatus();
    addBooksToPage();
})