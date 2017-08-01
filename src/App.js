import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import Book from './entities/book.js';
import User from './entities/user.js';
import BookSearch from './components/bookSearch.js';

/**
 * Bookatorium app
 */
class App extends Component {
  constructor (props)
  {
    super(props);
    this.state = {
      /** Book currently working on */
      bookList: null,
      currentBook: {},
      currentUser: {},
      showUser: false,
      loggedIn: false,
    }

    this.loadBooks = this.loadBooks.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.showUser = this.showUser.bind(this);
  }

  loadBooks(books) {
    this.setState({
      bookList: books,
    })
  }

  loadUser() {
    this.setState((prevState) => {
      if (prevState.loggedIn) {
        return {currentUser: {}, loggedIn: false,}
      } else {
        return {currentUser: {
          id: 1,
          userId: 'workinntn@hotmail.com',
          firstName: 'Rodney',
          lastName: 'Dixon',},
         loggedIn: true,
        }
      }
    });
  }

  showUser() {
    this.setState((prevState) => {
      return {showUser: !prevState.showUser};
    });    
  }

  render() {
    let loginButton = (this.state.loggedIn) ? 'Logout' : 'Login';
    let showUserButton = (this.state.showUser) ? 'Hide User' : 'Show User';

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Welcome to the Bookatorium <span>{this.state.currentUser.firstName}</span>
          </h2>
        </div>
        <div className="App-intro">
          <div>
            <button onClick={this.loadUser}>{loginButton}</button>
            {(this.state.loggedIn) ? (<button onClick={this.showUser}>{showUserButton}</button>) :(null)}
            <User currentUser={this.state.currentUser} showUser={this.state.showUser}/>
          </div>
          <div>
            <BookSearch onSelectedBooks={this.loadBooks}/>
            <SearchResults books={this.state.bookList} />
          </div>
          
        </div>
      </div>
    );
  }
}

function ListItem({book}) {
  // Correct! There is no need to specify the key here:
  return (<li id={'sr' + book.id}><Book currentBook={book} srchResult/></li>);
}

function  SearchResults(props)
{
  const books = props.books;
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

export default App;
