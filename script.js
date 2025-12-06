const myLibrary = [];
const newBookButton = document.getElementById("new-book");
const addBookButton = document.getElementById("add-book");
const dialog = document.getElementById("dialog");
const formElement = document.querySelector("#form");

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

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title,author,pages,read));
    console.log(myLibrary);

}

function addBooksToPage() {

    for (item of myLibrary) {
        //get the div that holds all the books
        const cardContainer = document.getElementById("books");

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

function addBookToLibrary() {


}

addBookToLibrary("wedding people","sindura",300,false);
addBooksToPage();

//open dialog when click 'New Book'
newBookButton.addEventListener('click', () => {
    dialog.showModal();

})

//user clicks add book
addBookButton.addEventListener('click', () => {
    const formData = new FormData(formElement);
    console.log(formData);
})


