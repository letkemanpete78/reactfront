import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            ID: '',
            FirstName: '',
            LastName: '',
            Email: ''
        };
        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        const {FirstName, LastName, Email } = this.state;

        return (
            <form onSubmit={this.onFormSubmit}>
                <label htmlFor="FirstName">First Name</label>
                <input
                    type="text"
                    name="FirstName"
                    id="FirstName"
                    value={FirstName}
                    onChange={this.handleChange} />
                <label htmlFor="LastName">Last Name</label>
                <input
                    type="text"
                    name="LastName"
                    id="LastName"
                    value={LastName}
                    onChange={this.handleChange} />

                <label htmlFor="Email">Email</label>
                <input
                    type="text"
                    name="Email"
                    id="Email"
                    value={Email}
                    onChange={this.handleChange} />
                <button type="submit">
                    Submit
                </button>
            </form>
        );
    }
}

export default Form;