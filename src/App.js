import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import uuid from 'uuid-random';

class App extends Component {
  state = {
    characters: [],
    editRecord: null
  };

  componentDidMount() {
    const listurl = "http://localhost:49713/api/ContactAPI";
    fetch(listurl)
      .then(result => result.json())
      .then(result => {
        this.setState({
          characters: result
        })
      }).catch(error => this.handleHTTPGetError(error));
  }


  handleHTTPGetError = (e) => {
    console.log('Failed to fetch via get.');
    // alert('Connection Error! ' + e.message);
  }

  handleHTTPDeleteError = (e) => {
    console.log('Failed to fetch via delete.');
    // alert('Connection Error! ' + e.message);
  }

  handleHTTPPostError = (e) => {
    console.log('Failed to fetch via post.');
    // alert('Connection Error! ' + e.message);
  }

  removeCharacter = index => {
    const { characters } = this.state;
    const deleteurl = "http://localhost:49713/api/ContactAPI";

    let deleteUUID = "";
    this.setState({
      characters: characters.filter((character, i) => {
        deleteUUID = character.ID;
        return i !== index;
      })
    });

    fetch(deleteurl + "/" + deleteUUID, {
      method: 'DELETE'
    }).catch(error => this.handleHTTPDeleteError(error));
  }

  onClickHandler = (e) => {
    const { characters } = this.state;

    let tempRecord = characters.filter((character, i) => {
      return e === character.ID;
    })

    this.setState({
      editRecord: tempRecord[0]
    });

    // this.setState({editRecord:e});
    //const song = e.target.getAttribute('data-item');
    // console.log('We need to get the details for ', e);
  }


  handleSubmit = (FirstName, LastName, Email, ID) => {

    if ((FirstName === LastName) && (Email === LastName)) {
      return false;
    }
    let method = "PUT";
    let posturl = "http://localhost:49713/api/ContactAPI";
    if (ID === "") {
      method = "POST";
      ID = uuid();
    } else {
      posturl = posturl + "/" + ID;
    }

    const character = { "FirstName":FirstName, "LastName":LastName, "Email":Email , "ID":ID};
    let data = JSON.stringify(character);

    fetch(posturl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: method,
      body: data
    }).catch(error => this.handleHTTPPostError(error));

    const { characters } = this.state;
    const filtered = characters.filter((character, i) => {
      return (ID !== character.ID)
    });
    
    const newListing = [...filtered, character];
    
    this.setState({
      characters: newListing,

    } /* , () => console.log(this.state)*/);
  }

  render() {
    const { characters, editRecord } = this.state;

    const result = characters.map((entry, index) => {
      // console.log(JSON.stringify(entry));
      return entry;
    });

    return (
      <div className="container">

        <Table
          onClickHandler={this.onClickHandler}
          characterData={result}
          removeCharacter={this.removeCharacter}
        />
        
        <Form handleSubmit={this.handleSubmit} editRecord={editRecord} />
      </div>
    );
  }
}

export default App;