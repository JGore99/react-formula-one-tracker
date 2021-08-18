import React from "react";
import HandleDriverData from "./HandleDriverData";

export default class HandleDisplayData extends React.Component {
  

    render () {
        //const {driverData}=this.props;  
    return (
            <div>
                
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Nationality</td>
                        <td>Team</td>
                        <td>Championship Pts.</td>
                        <td>Race Wins</td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td>{this.props.drivers}</td>  
                        
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
}

/*{this.props.driver.map(() => (
            
    optionText={details}
    handleDeleteOption={props.handleDeleteOption}
);
*/