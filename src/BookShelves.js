import React, {Component} from 'react'
import Book from './Book'
import {PropTypes} from 'prop-types'

class BookShelves extends Component{

static propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onSwitchShelf: PropTypes.func.isRequired
}

//list 3 shelves and map over books to list them for 
//each shelf
updateShelf = (book, shelf) => {
	this.props.onSwitchShelf(book, shelf)
}

render(){
	// console.log("Prop", this.props)
	return (
      <div className="bookshelf">
       <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
             {this.props.books.map((book, index) =>(
             	<Book 
             		book={book}
             		key={book.id}
             		onSwitchShelf={(shelf) =>{
             			this.updateShelf(book, shelf)
             		}} 
             	/>
             ))}
          </ol>
        </div>
      </div>
	)
}

}

export default BookShelves