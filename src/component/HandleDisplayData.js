import React from "react";
import HandleSort from "./HandleSort";
//import HandleDriverData from "./HandleDriverData";

export default class HandleDisplayData extends React.Component {
  render() {
    return (
      <div>
        <h1>Formula 1 Drivers Standing 2021</h1>
        <table>
          <thead>
            <tr className="top-row">
              <td className="head-title">Formula 1 Drivers Standing 2021</td>
              <td>
                < HandleSort />
              </td>
            </tr>
            <tr key="subject" className="subject-row">
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
      </div>
    );
  }
}

/*{this.props.driver.map(() => (
            
    optionText={details}
    handleDeleteOption={props.handleDeleteOption}
);
*/
