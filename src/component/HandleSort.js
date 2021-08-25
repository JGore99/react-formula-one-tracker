import React from "react";
import '../App.css';
//import HandleDriverData from "./TestFile";
//import HandleDisplayData from "./HandleDisplayData";

const HandleSort = (props) => {
  return (
    <div>
      <select className="selectDropdown"
        onChange={
          (e) => props.callBack(e.target.value) //callback is a value in props being passed up. This could be passed through multiple components
        }
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
  );
};

export default HandleSort;
