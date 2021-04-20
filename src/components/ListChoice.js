import React from "react";

import "./Status.css";

class ListChoice extends React.Component {


  render() {
    return (
      <span
      style={{color: this.props.listChoice === this.props.name ? "hsl(220, 98%, 61%)": "hsl(236, 9%, 61%)"}}
      onClick={this.props.handleClick}
      type="button"
      >
        {this.props.name}
      </span>
    )

  }
}

export default ListChoice
