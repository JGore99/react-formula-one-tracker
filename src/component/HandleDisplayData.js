import React from "react";

export default class HandleDisplayData extends React.Component {
  render() {
    const isLoading = this.props.isLoading;
    console.log(isLoading);
    if (isLoading) {
      return (
        <div>
          <h3>Data loading....</h3>;
        </div>
      );
    } else {
      return (
        
    
    }
  }
}

/*{this.props.driver.map(() => (
            
    optionText={details}
    handleDeleteOption={props.handleDeleteOption}
);
*/
