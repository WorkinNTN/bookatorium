import React, { Component } from 'react';
import Book from '../entities/book.js';

class SearchResults extends Component {
    bookPicked(selectedBook) {
        this.props.onSelectedBook(selectedBook);
    }

    render () {
        const books = this.props.books;
        let listItems = null
        if (books)
        {
            listItems = books.map((book) => 
            <span key={book.id}>
                <li onClick={() => this.bookPicked(book)}><Book currentBook={book} srchResult/></li>
            </span> );
        }

        return (
          <ul>
            {listItems}
          </ul>
        );
    }
}

export default SearchResults;
