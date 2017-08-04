import React, { Component } from 'react';

class Book extends Component {
    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        const emptyBook = !(this.props.currentBook.title);
        const srchResult = this.props.srchResult;
        return (
            <div>
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
                                    <span style={{fontWeight:"bold"}}>Series:</span>
                                    <span style={{paddingLeft:"10px"}}>{this.props.currentBook.series}</span>
                                </div>
                                <div>
                                    <span style={{fontWeight:"bold"}}>Series #:</span>
                                    <span style={{paddingLeft:"10px"}}>{this.props.currentBook.seriesNo}</span>
                                </div>
                                </span>
                            }
                        </div>
                    }
                    <div>
                        <span style={{fontWeight:"bold"}}>Title:</span>
                        <span style={{paddingLeft:"10px"}}>{this.props.currentBook.title}</span>
                    </div>
                    <div>
                        <span style={{fontWeight:"bold"}}>ISBN:</span>
                        <span style={{paddingLeft:"10px"}}>{this.props.currentBook.isbn}</span>
                    </div>
                    {
                        (!srchResult) &&
                        <div>
                        <div>
                            <span style={{fontWeight:"bold"}}>Year Published:</span>
                            <span style={{paddingLeft:"10px"}}>{this.props.currentBook.yearPublished}</span>
                        </div>
                        <div>
                            <span style={{fontWeight:"bold"}}>Author:</span>
                            <span style={{paddingLeft:"10px"}}>{this.props.currentBook.author}</span>
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
