const myLibrary = [];
const newBookButton = document.getElementById("new-book");
const addBookButton = document.getElementById("add-book");
const dialog = document.getElementById("dialog");
const form = document.getElementById("form")


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


function addBooksToPage() {

    //get the div that holds all the books
    const cardContainer = document.getElementById("books");
    cardContainer.innerHTML = "";
    
    for (item of myLibrary) {
        //create a new card and add it to the container 
        const card = document.createElement("div");
        card.classList.add("card")
        cardContainer.appendChild(card);

        //create the text on the book
        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerText = item.info();
        card.appendChild(cardText);
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

