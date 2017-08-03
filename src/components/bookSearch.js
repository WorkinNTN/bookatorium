import React, { Component } from 'react';
var request = require('request');

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', aBook: {}};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value,});
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    let result = await doSearch(this.state.value);
    result = JSON.parse(result);
    let returnValue = [];
    if (result.result === 'success') {
      returnValue = result.list;
    }

    this.props.onSelectedBooks(returnValue);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search for a book:
          <input type="text" placeholder="Enter search criteria" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function doSearch(searchValue)
{
  return new Promise(function(resolve, reject) {
    request('http://localhost:8080/findbooks/' + searchValue, function(error, response, body) {
      let result = body;
      resolve(result)
    })
  })
}

export default BookSearch;