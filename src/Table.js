import React from 'react';



const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Remove</th>
            </tr>
        </thead>
    );
}

const TableBody = props => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index} onClick={() =>  props.onClickHandler(row.ID)}>
                <td>Edit</td>
                <td>{row.FirstName}</td>
                <td>{row.LastName}</td>
                <td>{row.Email}</td>
                <td><button onClick={() => props.removeCharacter(index)}>Delete</button></td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { characterData, removeCharacter,onClickHandler } = props;
    return (
        <table>
            <TableHeader />
            <TableBody characterData={characterData} removeCharacter={removeCharacter} onClickHandler={onClickHandler}/>
        </table>
    );
}

export default Table;