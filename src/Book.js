import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component{

static propTypes = {
	book: PropTypes.object.isRequired,
	onSwitchShelf: PropTypes.func.isRequired
}

//create function to switch the shelf prop
switchShelf = (event) => {
	this.props.onSwitchShelf(event.target.value)
}

render(){
	console.log("Props", this.props)
	const book = this.props.book
	const bookCover = book.imageLinks.thumbail || book.imageLinks.smallThumbnail

	return (
			<li>
			  <div className="book">
			  <div className="book-top">
			   <div className="book-cover" style={{ 
			   	width: 128, 
			   	height: 193, 
			   	backgroundImage:`url("${bookCover}")`
			   }}></div>
				<div className="book-shelf-changer">
                   <select onChange={this.switchShelf} value={book.shelf}>
                        <option value="moveTo" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                   </div>				
			  	  </div>
			  	  <div className="book-title">{book.title}</div>
			  	  {book.authors && book.authors.map((author, index) => (
			  	  	<div
			  	  	  className="book-authors"
			  	  	  key={index}
			  	  	  >{`${author}`}
			  	    </div>
			  	  ))}
			     </div>
			</li>
	    )
	}
}

export default Book