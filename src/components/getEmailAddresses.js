import React, { Component } from 'react';

class GetEmailAddresses extends Component {

    constructor(props) {
        super(props);

        let x = this.props.addresses;
        if (!x) {
            x = [];
        } else if (!Array.isArray(x)) {
            x = [];
        }

        this.state = {
            addressList: x,
            emailAddress: '',
        }
    }

    handleChange = (event) => {
        this.setState({emailAddress: event.target.value,});
    }

    handleAdd = () => {
        let temp = this.state.addressList;
        temp.push(this.state.emailAddress);
        this.setState({
            addressList: temp,
            emailAddress: ''
        });
    }

    handleDone = (completed) => {
        alert("Completed is " + completed)
    }

    handleCancel = () => {
        alert("Cancelling operation")
    }

    handleClear = () => {
        this.setState({
            addressList: [],
            emailAddress: ''
        });
    }

    render() {
        const addresses = this.state.addressList;
        let listItems = null
        if (addresses)
        {
            listItems = addresses.map((address) => 
            <span key={address}>
                <li>{address}</li>
            </span> );
        }

        return (
        <div>
           <label>
             Enter email address:
              <input type="text" placeholder="Enter email address" value={this.state.emailAddress} onChange={(e) => {this.handleChange(e)}}/>
            </label>
            <button onClick={() => this.handleAdd()}>Add address</button>
            
            <ul>
              {listItems}
            </ul>

            <div>
                <button onClick={() => this.handleDone(true)}>Submit</button>
                <button onClick={() => this.handleDone(false)}>Cancel</button>
                <button onClick={() => this.handleClear()}>Clear List</button>
            </div>

          </div>
        );
    }
    
}

export default GetEmailAddresses;