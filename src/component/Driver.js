import React from "react";

const Driver = (props) => {
  const { fullName, age, nationality, points, wins, team } = props.driver;
  return (
    <tr key={fullName}>
      <td>{fullName}</td>
      <td>{age}</td>
      <td>{nationality}</td>
      <td>{team}</td>
      <td>{points}</td>
      <td>{wins}</td>
    </tr>
  );
};

export default Driver;
