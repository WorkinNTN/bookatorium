import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import Book from './entities/book.js';
import User from './entities/user.js';
import BookSearch from './components/bookSearch.js';
import GetEmailAddresses from './components/getEmailAddresses.js';

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
      emailList: '',
    }

  }

  loadBooks(books) {
    this.setState({
      bookList: books,
    })
  }

  loadBook(book) {
    this.setState({
      currentBook: book,
    })
  }

  setAddresses(list) {
    this.setState({emailList: list,});
  }

  cancelled() {

  }

  handleUser() {
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
          <div className="App-user">
            <button onClick={() => this.handleUser()}>{loginButton}</button>
            {(this.state.loggedIn) ? (<button onClick={() => this.showUser()}>{showUserButton}</button>) :(null)}
            <User currentUser={this.state.currentUser} showUser={this.state.showUser}/>
          </div>

          <div className="App-search">
            <BookSearch onSelectedBook={(book) => this.loadBook(book)}/>
          </div>

          <div className="App-email">
            <GetEmailAddresses 
              onSubmitted={(theList) => this.setAddresses(theList)} 
              onCancelled={() => this.cancelled()}
              returnAsArray={false} 
              initialAddresses={"start@one.com,delete@me.com,finish@two.com"}/>
          </div>

          <div className="App-result">
            <Book currentBook={this.state.currentBook}/>
            <div>{this.state.emailList}</div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
