import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'
import {PropTypes} from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

import Book from './Book'

class BookSearch extends Component{

state = {
	Books: [],
	query: ''
}

static propTypes = {
	books: PropTypes.array.isRequired,
	onSwitchShelf: PropTypes.func.isRequired
}

//update the search query
updateQuery = (searchTerms) => {
  let search = searchTerms.target.value.trim();
  this.setState({query: search})
  this.searchAPI(search)
}

assignShelf = (books) =>{
	let allBooks = this.props.books
	for(let book of books){
		book.shelf = 'none'
		for(let b of allBooks){
			if(b.id === book.id){
				book.shelf = b.shelf
			}
		}
	}
	return books
}

searchAPI = (search) =>{
	if (search.length !== 0 ){
		BooksAPI.search(search, 10).then((books) =>{
			if(books.length > 0 && this.state.query){
				let showingBooks, newBooks, displayBooks
				const match = new RegExp(escapeRegExp(search), 'i')
				newBooks = books.filter((book) =>(book.imageLinks))
				showingBooks = newBooks.filter((book) => match.test(book.title) || match.test(book.authors[0]))
				displayBooks = this.assignShelf(showingBooks)
				displayBooks.sort(sortBy('title'))

				this.setState(() =>{
					return {Books: displayBooks}
				})
			}
		})
	}else {
		this.setState({Books: [], query: ''})
	}
}

addBook = (book, shelf) =>{
	this.props.onSwitchShelf(book, shelf)
}

render(){

	return(
	 <div className="search-books">
	  <div className="search-books-bar">
	   <Link className="close-search" to="/">Back</Link>
	   <div className="search-books-input-wrapper">
	   	 <input
			type="text"
			placeholder="Search By Title Or Author"
			onChange={this.updateQuery}
		   />
	      </div>
         </div>
	      <div className="search-book-results">
	      	<ol className="books-grid">
	      	  {this.state.Books.map((book, index) =>(
	      	  		<Book
	      	  		  book={book}
             		  key={book.id}
             		  onSwitchShelf={(shelf) =>{
             			this.addBook(book, shelf)
             		}} 
	      	  	   />
	      	  	))}
	      	</ol>
	      </div>   
	   </div>
	)
}

}

export default BookSearch
	   
	    
		