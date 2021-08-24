import React from "react";
//import HandleDisplayData from "./HandleDisplayData";
//import HandleSort from "./HandleSort";

export default class HandleDriverData extends React.Component {
  state = {
    drivers: [],
    isLoading: true,
    selection: "Sort",
  };

  componentDidMount() {
    fetch("https://ergast.com/api/f1/current/driverStandings.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("nope");
        }
        return response.json();
      })
      .then((data) => this.handleApiData(data));
  }

  handleApiData(data) {
    let driverStandings =
      data["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"];
    const drivers = [];
    for (let i = 0; i < driverStandings.length; i++) {
      let driverLastName = driverStandings[i]["Driver"]["familyName"];
      let driverFirstName = driverStandings[i]["Driver"]["givenName"];
      let fullName = driverFirstName + " " + driverLastName;
      let driverDob = driverStandings[i]["Driver"]["dateOfBirth"];
      let dob = new Date(driverDob);
      let dobYear = dob.getFullYear();
      let todayDate = new Date();
      let todayYear = todayDate.getFullYear();
      let age = todayYear - dobYear;
      let nationality = driverStandings[i]["Driver"]["nationality"];
      let points = driverStandings[i]["points"];
      let wins = driverStandings[i]["wins"];
      let team =
        data["MRData"]["StandingsTable"]["StandingsLists"][0][
          "DriverStandings"
        ][i]["Constructors"][0]["name"];
      drivers.push({
        fullName,
        driverLastName,
        age,
        nationality,
        team,
        points,
        wins,
      }); // pushes an object for each driver into the drivers array
    }

    this.setState(() => ({
      drivers: drivers,
      isLoading: false,
    }));
  }

  handleDataSorting() {
    const driversCopy = this.state.drivers;
    console.log(driversCopy);
    if (this.state.selection === "name") {
      driversCopy.sort((a, b) =>
        a.driverLastName > b.driverLastName ? 1 : -1
      );
    } else if (this.state.selection === "age") {
      driversCopy.sort((a, b) => {
        return a.age - b.age;
      });
    } else if (this.state.selection === "nationality") {
      driversCopy.sort((a, b) => (a.nationality > b.nationality ? 1 : -1));
    } else if (this.state.selection === "points") {
      driversCopy.sort((a, b) => {
        return a.points - b.points;
      });
    } else if (this.state.selection === "wins") {
      driversCopy.sort((a, b) => {
        return a.wins - b.wins;
      });
    }
    this.setState({ drivers: driversCopy }, () => {
      console.log(driversCopy);
    });
  }

  componentDidUpdate() {
    console.log(this.state.selection);
  }

  handleSelect = (e) => { //this is not needed. Make selection = e.target.value. amd [ass that into handleSorting. Then update state just once.]
    this.setState({ selection: e.target.value }, () => {
      this.handleDataSorting();
    });
  };

  render() {
    return (
      <div>
        <div className="table-header">
          <div className="table-headline">
            <h1>Formula 1 Drivers Standing 2021</h1>
          </div>
          <div>
            <select
              onChange={(e) => {
                this.handleSelect(e);
              }}
            >
              <option hidden defaultValue="disabled" id="sort">
                Sort
              </option>
              <option value="name" id="name">
                Name
              </option>
              <option value="age" id="age">
                Age
              </option>
              <option value="nationality" id="nationality">
                Nationality
              </option>
              <option value="team" id="team">
                Team
              </option>
              <option value="points" id="points">
                Points
              </option>
              <option value="wins" id="wins">
                Race Wins
              </option>
            </select>
          </div>
          <table>
            <thead>
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
              {this.state.drivers.map(
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
      </div>
    );
  }
}
