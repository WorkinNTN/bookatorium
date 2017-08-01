import React, { Component } from 'react';

class Book extends Component {
    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        const emptyBook = !(this.props.currentBook.title);
        const srchResult = this.props.srchResult;
        return (
            <div>
                {emptyBook ? (null) : (
                    <div>
                        <div>
                            <span style={{fontWeight:"bold"}}>Title:</span>
                            <span style={{paddingLeft:"10px"}}>{this.props.currentBook.title}</span>
                        </div>
                        <div>
                            <span style={{fontWeight:"bold"}}>ISBN:</span>
                            <span style={{paddingLeft:"10px"}}>{this.props.currentBook.isbn}</span>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Book;
