import React from "react";
import '../App.css';

export default class HandleDisplayData extends React.Component {
  render() {
    return (
      <table className="table">
        <thead>
            {/* <HandleSort callBack={props.handleDataSorting} /> this is how it would look if it needed to pass through this file and up*/}
          <tr key="subject" className="subjectRow">
            <td key="name">Name</td>
            <td key="age">Age</td>
            <td key="nationality">Nationality</td>
            <td key="team">Team</td>
            <td key="championship">Championship Pts.</td>
            <td key="wins">Race Wins</td>
          </tr>
        </thead>
        <tbody>
          {this.props.drivers.map(
            ({ fullName, age, nationality, points, wins, team }) => (
              <tr key={fullName}>
                <td>{fullName}</td>
                <td>{age}</td>
                <td>{nationality}</td>
                <td>{team}</td>
                <td>{points}</td>
                <td>{wins}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  }
}

/*{this.props.driver.map(() => (
            
    optionText={details}
    handleDeleteOption={props.handleDeleteOption}
);
*/
