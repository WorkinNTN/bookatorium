import React, { Component } from 'react';
import Book from '../entities/book.js';

class SearchResults extends Component {

  render () {
    const books = this.props.books;
    const listItems = (books === null) ? (null) : books.map((book) =>
        // Correct! Key should be specified inside the array.
        <ListItem key={book.id}
                book={book} />
    );

    return (
        <ul>
        {listItems}
        </ul>
    )
  }
}

function ListItem({book}) {
  // Correct! There is no need to specify the key here:
  return (<li id={'sr' + book.id}><Book currentBook={book} srchResult/></li>);
}

export default SearchResults;
