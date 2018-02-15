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

    componentDidMount() {
        this.postBack();
    }

    handleChange = (event) => {
        this.setState({emailAddress: event.target.value,});
    }

    add = () => {
        let temp = this.state.addressList;
        temp.push(this.state.emailAddress);
        this.setState({
            addressList: temp,
            emailAddress: ''
        }, () => {this.postBack();});
        
    }

    delete = (address) => {
        let arr = this.state.addressList.filter(e => e !== address.address);
        this.setState({
            addressList: arr,
        }, () => {this.postBack();});
        
    }

    postBack = () => {
        
        // this.handleClear();
        if (this.props.returnAsArray) {
            this.props.onSubmitted(this.state.addressList);
        } else {
            this.props.onSubmitted(this.state.addressList.join());
        }
    }

    clearAll = () => {
        this.setState({
            addressList: [],
            emailAddress: ''
        }, () => {this.postBack();});
    }

    submitted(event) {
        event.preventDefault();
        this.add();
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
                    <button onClick={() => this.delete({address})}>X</button>
                </div>
            </span> );
        }

        return (
            <form onSubmit={this.submitted}>
                <label>
                    Enter email address:
                    <input type="text" placeholder="Enter email address" value={this.state.emailAddress} onChange={this.handleChange}/>
                </label>
                <button onClick={() => this.add()}>Add</button>
                <button onClick={() => this.clearAll()} disabled={this.state.addressList.length === 0}>Clear All</button>
            
                <div>
                    {listItems}
                </div>
          </form>
        );
    }
    
}

export default GetEmailAddresses;