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

    handleChange = (id, event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            ID: id
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        let { FirstName, LastName, Email } = this.state;
        if (this.props.editRecord != null) {
            if (FirstName === "") {
                FirstName = this.props.editRecord.FirstName;
            }
            if (LastName === "") {
                LastName = this.props.editRecord.LastName;
            }
            if (Email === "") {
                Email = this.props.editRecord.Email;
            }
        }
        this.props.handleSubmit(FirstName,LastName,Email, this.state.ID);
        this.setState(this.initialState);
    }

    render() {
        let { FirstName, LastName, Email, ID } = this.state;
        let buttonValue = 'Add Record'

        if (this.props.editRecord != null) {
            buttonValue = 'Update Record'
            if (ID !== "") {
                if (FirstName === "") {
                    FirstName = this.props.editRecord.FirstName;
                }
                if (LastName === "") {
                    LastName = this.props.editRecord.LastName;
                }
                if (Email === "") {
                    Email = this.props.editRecord.Email;
                }
            } else {
                FirstName = this.props.editRecord.FirstName;
                LastName = this.props.editRecord.LastName;
                Email = this.props.editRecord.Email;
                ID = this.props.editRecord.ID;
            }
        }

        return (
            <span>
            <h3>{buttonValue}</h3>
            <form onSubmit={this.onFormSubmit}>
                <input type="hidden" value={ID} name="ID" id="ID" />
                <label htmlFor="FirstName">First Name</label>
                <input
                    type="text"
                    name="FirstName"
                    id="FirstName"
                    value={FirstName}
                    // onChange={this.handleChange} />
                    onChange={(e) => this.handleChange(ID, e)} />
                <label htmlFor="LastName">Last Name</label>
                <input
                    type="text"
                    name="LastName"
                    id="LastName"
                    value={LastName}
                    // onChange={this.handleChange} />
                    onChange={(e) => this.handleChange(ID, e)} />

                <label htmlFor="Email">Email</label>
                <input
                    type="text"
                    name="Email"
                    id="Email"
                    value={Email}
                    // onChange={this.handleChange} />
                    onChange={(e) => this.handleChange(ID, e)} />
                <button type="submit">
                    {buttonValue}
                </button>
                <span>&nbsp;</span>
                <button type="reset">
                    Clear Values
                </button>
            </form>
            </span>
        );
    }
}

export default Form;