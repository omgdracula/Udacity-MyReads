import React from 'react'
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import ListBooks from './ListBooks'
import BookSearch from './BookSearch'

class BooksApp extends React.Component {
  state = {
    books: []
  }

//fetch books from the BooksAPI then set the state of books to all books
//retrieved from the API
  fetchBookDetails =() =>{
    BooksAPI.getAll().then((books) =>{
      this.setState({books: books})
    })
  }

  componentDidMount(){
    this.fetchBookDetails()
  }

//update BooksAPI with corresponding book and new shelf
  updateBook = (book, shelf) =>{
    BooksAPI.update(book, shelf).then(() =>{
      this.fetchBookDetails()
    })
  }



  render() {
    return (
      <div className="app">
        <div className="list-books">
            
         <Route exact path='/' render ={() => (
            <ListBooks 
            books={this.state.books}
            onSwitchShelf = {this.updateBook}
           />
          )}/>
          
        <Route path='/search' render={({history}) => (<BookSearch 
              books={this.state.books}
              onSwitchShelf = {this.updateBook}/>
          )}/>
      </div>
       <div className="open-search">
          <Link
              to="/search">
              Add a book
          </Link>
        </div>
    </div>
    )
  }
}

export default BooksApp
