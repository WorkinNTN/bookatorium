import React, { Component } from 'react';

class Book extends Component {
    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        const emptyBook = !(this.props.currentBook.title);
        const srchResult = this.props.srchResult;
        return (
            <div className="App-book">
            {
                (!emptyBook) &&
                <span>
                    {
                        (!srchResult) &&
                        <div>
                            {
                                (this.props.currentBook.series) &&
                                <span>
                                <div>
                                    <span className="book-label">Series:</span>
                                    <span className="book-info">{this.props.currentBook.series}</span>
                                </div>
                                <div>
                                    <span className="book-label">Series #:</span>
                                    <span className="book-info">{this.props.currentBook.seriesNo}</span>
                                </div>
                                </span>
                            }
                        </div>
                    }
                    <div>
                        <span className="book-label">Title:</span>
                        <span className="book-info">{this.props.currentBook.title}</span>
                    </div>
                    <div>
                        <span className="book-label">ISBN:</span>
                        <span className="book-info">{this.props.currentBook.isbn}</span>
                    </div>
                    {
                        (!srchResult) &&
                        <div>
                        <div>
                            <span className="book-label">Year Published:</span>
                            <span className="book-info">{this.props.currentBook.yearPublished}</span>
                        </div>
                        <div>
                            <span className="book-label">Author:</span>
                            <span className="book-info">{this.props.currentBook.author}</span>
                        </div>
                        </div>
                    }
                </span>
            }
            </div>
        );
    }
}

export default Book;
