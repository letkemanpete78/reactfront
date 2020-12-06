import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import uuid from 'uuid-random';

class App extends Component {
  state = {
    characters: []
  };

  componentDidMount() {
    const listurl = "http://localhost:49713/api/ContactAPI";
    fetch(listurl)
      .then(result => result.json())
      .then(result => {
        this.setState({
          characters: result
        })
      });
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

    fetch(deleteurl, {
      method: 'DELETE',
      body: JSON.stringify(deleteUUID),
    });
  }

  handleSubmit = character => {

    if (character.ID === "") {
      character.ID = uuid();
    }

    this.setState({
      characters: [...this.state.characters, character],
    } /* , () => console.log(this.state)*/);
  }


  render() {
    const { characters } = this.state;

    const result = characters.map((entry, index) => {
      // console.log(JSON.stringify(entry));
      return entry;
    });

    return (
      <div className="container">

        <Table
          characterData={result}
          removeCharacter={this.removeCharacter}
        />
        <h3>Add New</h3>
        <Form handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;