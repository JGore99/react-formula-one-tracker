import React from "react";

export default class HandleSort extends React.Component {
  state = {
    selection: "Sort",
  };

  handleSelect = (e) => {
    this.setState(() => ({ selection: e.target.value }));
  };

  componentDidUpdate(prevState) {
    console.log(this.state);
  }
        
  render() {
    return (
      <div>
        <select onChange={this.handleSelect}>
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
    );
  }
}
