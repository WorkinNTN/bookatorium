import React, { Component } from 'react';

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

  handleSubmit(event) {
    event.preventDefault();
    
    this.props.onSelectedBooks(
    [
        {
            id: 1,
            series: "Hank the Cowdog",
            seriesNo: 1,
            title: "The Case of the Wandering Goat",
            yearPublished: 2010,
            isbn: new Date().toISOString(),
        },
        {
            id: 2,
            series: "Hank the Cowdog",
            seriesNo: 2,
            title: "The Sheet Monster",
            yearPublished: 2015,
            isbn: new Date().toISOString(),
        },
        {
            id: 3,
            series: "Hank the Cowdog",
            seriesNo: 3,
            title: "Eddie the Rac",
            yearPublished: 2017,
            isbn: new Date().toISOString(),
        },
        {
            id: 4,
            title: "Once Upon A Time In America",
            yearPublished: 1950,
            isbn: new Date().toISOString(),
        },
    ],)
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

export default BookSearch;