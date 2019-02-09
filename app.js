class Book{
  constructor(title,author,isbn){
    this.title  = title;
    this.author = author;
    this.isbn  =isbn;

  }

}

class UI{

  addBooktoList(book){

  const list  = document.getElementById('book-list');
  //Create element
  const row =document.createElement('tr');
  //Insert calls

  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href= "#" class ="delete">X</a></td>
  `
  list.appendChild(row);
  }

  showAlert(msg,class_name){
    const div = document.createElement('div');
    div.className = `alert ${class_name}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const  form = document.querySelector('#book-form');
    container.insertBefore(div,form);
    setTimeout(function(){
      document.querySelector('.alert').remove();
    },2500);
  }

  deleteBook(target){

    if(target.className === 'delete'){

      target.parentElement.parentElement.remove();
    }

  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

  }

}

//Local storage
class Store{
  static  getBooks(){
      let books;
      if(localStorage.getItem('books') === null){


        books =[];
      }else {

        books = JSON.parse(localStorage.getItem('books'));
      }

      return books;

  }
//Fetch book from local storage
  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;
      ui.addBooktoList(book);
    })
  }

  static addBook(book){
   const books  = Store.getBooks();
    books.push(book);

    localStorage.setItem('books',JSON.stringify(books));

  }


  static removeBook(target){
      const books  = Store.getBooks();

      books.forEach(function(book,index){
          if(book.isbn === target){
            books.splice(index,1);
          }
      })
      localStorage.setItem('books',JSON.stringify(books));



  }


}


document.addEventListener('DOMContentLoaded',Store.displayBooks);


//Event listeners
document.getElementById("book-form").addEventListener('submit',function(e){
  //Get form values
  const titel = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value  ;

//Instantiate book
console.log(titel);
  const book = new Book(titel,author,isbn);

//Instantiate UI object

  const ui = new UI();
  console.log(ui);

  //Validation
  if(titel === '' || author === '' || isbn === ''){
      ui.showAlert('Please fill in all fields','error');
  }else{
      //ADD book to lisxt
    ui.addBooktoList(book);


    //add to local storage

    Store.addBook(book);




    ui.showAlert('Book was added !','success');
    ui.clearFields();
  }







        console.log(book);
    e.preventDefault();
})
//Delete book

document.querySelector('#book-list').addEventListener('click',function(e){
  console.log('clicked')
//Instantiate UI object
const ui = new UI();
  ui.deleteBook(e.target);
  //Remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //console.log(e.target.parentElement.previousElementSibling.textContent);
  //show alert
  ui.showAlert('Book was deleted!','success');
  e.preventDefault();
})


