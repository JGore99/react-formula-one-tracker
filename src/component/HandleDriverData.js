import React from "react";
import HandleDisplayData from "./HandleDisplayData";

export default class HandleDriverData extends React.Component {
  state = {
    drivers: [],
    isLoading: true,
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
    let driverStandings = data["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"];
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
      let team = data["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"][i]["Constructors"][0]["name"];
      drivers.push({fullName, age, nationality, team, points, wins}); // pushes an object for each driver into the drivers array
    };
  
    this.setState({ drivers: drivers, isLoading: false}, () => {
      console.log(this.state);
    });
    
  };

  render() {
    
    return (
      <div>
        {this.state.drivers.map(driver => (
          <HandleDisplayData driver={driver} />
        ))}
      </div>
    );    
  }
 

  
 
};

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