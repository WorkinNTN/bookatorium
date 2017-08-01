import React, { Component } from 'react';

class User extends Component {
    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        let emptyUser = !(this.props.currentUser.id);
    
        return (
            <div>
            {
                (!emptyUser && this.props.showUser) &&
                <div>
                    {this.props.currentUser.firstName}
                </div>
            }
            </div>
        );
    }
}

export default User;
