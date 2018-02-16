import React, { Component } from 'react';
import Book from '../entities/book.js';
import axios from 'axios';

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

  handleChange = (event) => {
    this.setState({value: event.target.value,});
  }

  bookPicked = (selectedBook) => {
    let self = this;
    getBook(selectedBook).then(function (success) {
      let result = success.data;
      if (result.result === 'success') {
        self.props.onSelectedBook(result.book);
      } else {
        console.log("Server side issue: " + result.result);
        self.props.onSelectedBook({});
      }
    })
    .catch(function (error) {
      console.log("Error:" + error);
      self.props.onSelectedBook({});
    });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSelectedBook({});
    let self = this;
    
    doSearch(this.state.value).then(function (success) {
      let result = success.data;
      let returnValue = [];
      if (result.result === 'success') {
        returnValue = result.list;
      }
      self.setState({books: returnValue});
    })
    .catch(function (error) {
      console.log("Error:" + error);
    });
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
          <span>Book search:</span>
          <input type="text" placeholder="Enter search criteria" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />

        <ul className="result-list">
          {listItems}
        </ul>
      </form>
      
    );
  }
}

function doSearch(searchValue) {
  return axios.get('http://localhost:8080/searchbooks/' + searchValue);
}

function getBook(book) {
  return axios.get('http://localhost:8080/findbook/' + book.id)
}

export default BookSearch;
