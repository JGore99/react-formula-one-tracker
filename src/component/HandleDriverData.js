import React from "react";
import Driver from "./Driver";
import HandleSort from "./HandleSort";
import "../App.css";

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

  handleDataSorting = (selection) => {
    //this needs to be a stand alone function, or be bound by this.handleDataSorting
    const driversCopy = this.state.drivers;
    console.log(this.state);
    if (selection === "name") {
      driversCopy.sort((a, b) =>
        a.driverLastName > b.driverLastName ? 1 : -1
      );
    } else if (selection === "age") {
      driversCopy.sort((a, b) => {
        return a.age - b.age;
      });
    } else if (selection === "nationality") {
      driversCopy.sort((a, b) => (a.nationality > b.nationality ? 1 : -1));
    } else if (selection === "team") {
      driversCopy.sort((a, b) => (a.team > b.team ? 1 : -1));
    } else if (selection === "points") {
      driversCopy.sort((a, b) => {
        return b.points - a.points;
      });
    } else if (selection === "wins") {
      driversCopy.sort((a, b) => {
        return b.wins - a.wins;
      });
    }
    this.setState({ drivers: driversCopy, selection: selection }, () => {
      console.log(driversCopy);
    });
  };

  render() {
    return (
      <div className="backgroundStyle">
        <div className="tableContainer">
          <div className="tableHeader">
            <div className="tableHeadline">
              <h1>Formula 1 Drivers Standing 2021</h1>
            </div>
            <div>
              <HandleSort callBack={this.handleDataSorting} />
            </div>
          </div>
          <div className="tableBody">
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
                {" "}
                {this.state.isLoading ? (
                  <h3>Data loading....</h3>
                ) : (
                  <>
                    {" "}
                    {this.state.drivers.map((driver) => (
                      <Driver driver={driver} />
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

/* 
async componentDidMount() {
    const response = await fetch("https://ergast.com/api/f1/current/driverStandings.json");
    const apiData = await response.json();
    const driverData = apiData["MRData"]["StandingsTable"]["StandingsLists"][0][
        "DriverStandings"
      ];
      driverData.map(drivers => ({driver}))
      
      
      //this.setState({driver: driverData, loading: false})
      //console.log(this.state);
}


<div key={driver.fullName}>
            <div>{driver.fullName}</div>
            <div>{driver.age}</div>
            <div>{driver.nationality}</div>
            <div>{driver.team}</div>
            <div>{driver.points}</div>
            <div>{driver.wins}</div>
          </div>
*/
//handleTableHeader = (driverData) => {
//    return Object.keys.map(driverData => <th key={attr}>{attr.toUpperCase()}</th>)
// }
