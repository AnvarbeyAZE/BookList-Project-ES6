///Book Constructor

function Book(titel,author,isbn){

  this.titel = titel;
  this.author = author;
  this.isbn = isbn;

}


///UI Constructor


function UI(){
  //EMPTY FUNCTION , EVERYTHING WILL BE INSIDE PROTOTYPE
}
//ADD book list
UI.prototype.addBookToList = function(book){
  const list  = document.getElementById('book-list');
  //Create element
  const row =document.createElement('tr');
  //Insert calls
  row.innerHTML = `
  <td>${book.titel}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href= "#" class ="delete">X</a></td>
  `
  list.appendChild(row);

}
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';

}

UI.prototype.showAlert = function(msg,class_name){
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
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){

      target.parentElement.parentElement.remove();
    }

}


//Event listeners
document.getElementById("book-form").addEventListener('submit',function(e){
  //Get form values
  const titel = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value  ;

//Instantiate book
  const book = new Book(titel,author,isbn);

//Instantiate UI object

  const ui = new UI();

  //Validation
  if(titel === '' || author === '' || isbn === ''){
      ui.showAlert('Please fill in all fields','error');
  }else{
      //ADD book to list
    ui.addBookToList(book);
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
  //show alert
  ui.showAlert('Book was deleted!','success');
  e.preventDefault();
})




