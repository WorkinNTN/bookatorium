import React, { Component } from 'react';
import Book from '../entities/book.js';
var request = require('request');

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
      , book: {}
      , books: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value,});
  }

  async bookPicked(selectedBook) {
    let result = await getBook(selectedBook);
    result = JSON.parse(result);
    if (result.result === 'success') {
      this.props.onSelectedBook(result.book);
    } else {
      this.props.onSelectedBook({});
    }
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    this.props.onSelectedBook({});
    
    let result = await doSearch(this.state.value);
    result = JSON.parse(result);
    let returnValue = [];
    if (result.result === 'success') {
      returnValue = result.list;
    }

    this.setState({books: returnValue});
  }

  render() {
        const books = this.state.books;
        let listItems = null
        if (books)
        {
            listItems = books.map((book) => 
            <span key={book.id}>
                <li onClick={() => this.bookPicked(book)}><Book currentBook={book} srchResult/></li>
            </span> );
        }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search for a book:
          <input type="text" placeholder="Enter search criteria" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />

        <ul>
          {listItems}
        </ul>
      </form>
      
    );
  }
}

function doSearch(searchValue) {
  return new Promise(function(resolve, reject) {
    request('http://localhost:8080/searchbooks/' + searchValue, function(error, response, body) {
      let result = body;
      resolve(result)
    })
  })
}

function getBook(book) {
  return new Promise(function(resolve, reject) {
    request('http://localhost:8080/findbook/' + book.id, function(error, response, body) {
      let result = body;
      resolve(result)
    })
  })
}


export default BookSearch;
