import React, { Component } from 'react';

class GetEmailAddresses extends Component {

    constructor(props) {
        super(props);

        let x = this.props.initialAddresses;
        if (!x) {
            x = [];
        } else if (!Array.isArray(x)) {
            x = x.split(",");
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

    handleDelete = (address) => {
        let arr = this.state.addressList.filter(e => e !== address.address);
        this.setState({
            addressList: arr,
        });
    }

    handleSubmitted = () => {
        
        this.handleClear();
        if (this.props.returnAsArray) {
            this.props.onSubmitted(this.state.addressList);
        } else {
            this.props.onSubmitted(this.state.addressList.join());
        }
}

    handleCancel = () => {
        
        this.handleClear();
        this.props.onCancelled();
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
                <div>
                    <span>{address}</span>
                    <button onClick={() => this.handleDelete({address})}>X</button>
                </div>
            </span> );
        }

        return (
        <div>
           <label>
             Enter email address:
              <input type="text" placeholder="Enter email address" value={this.state.emailAddress} onChange={(e) => {this.handleChange(e)}}/>
            </label>
            <button onClick={() => this.handleAdd()}>Add address</button>
            
            <div>
              {listItems}
            </div>

            <div>
                <button onClick={() => this.handleSubmitted()} disabled={this.state.addressList.length === 0}>Submit</button>
                <button onClick={() => this.handleCancel()}>Cancel</button>
                <button onClick={() => this.handleClear()} disabled={this.state.addressList.length === 0}>Clear List</button>
            </div>

          </div>
        );
    }
    
}

export default GetEmailAddresses;