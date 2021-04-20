import React from "react";

import "./Activity.css";

import cross from "../images/icon-cross.svg";
import check from "../images/icon-check.svg";

class Activity extends React.Component {
  state = {
    isCompleted: false
  }

//On click of the cross, call deleteActivity() from the App component
//Pass in the index of the activity that had its cross clicked
  handleCrossClick = () => {
    console.log(`Activity to be deleted is at position ${this.props.index} in the array`)
    this.props.deleteActivity(this.props.index)
  }

//On click of the check, change the state of activity completed to the opposite of whatever it originally was
//If the activity has been checked, then call addCompletedActivity() in the App Component
//If the activity has been checked, and then unchecked again, call deleteFromCompletedList() in the App Component
  handleCheckClick = async () => {
    await this.setState({isCompleted: !this.state.isCompleted})

    if (this.state.isCompleted) {
      this.props.addCompletedActivity(this.props.eachActivity)
    } else {
      this.props.deleteFromCompletedList(this.props.eachActivity)
    }

  }

//This is to decide on whether i would like to display that activity
//This decision depends on what list the user wants to see
  renderActivityDisplay() {
    if (this.props.listChoice === "Completed") {
      if (!this.state.isCompleted) {
        return "none"
      } else {
        return ""
      }
    } else if (this.props.listChoice === "Active") {
      if (this.state.isCompleted) {
        return "none"
      } else {
        return ""
      }
    } else {
      return ""
    }
  }

  renderActivityFontColor() {
    if (this.props.isLightTheme) {
      if (this.state.isCompleted) {
        return "hsl(233, 11%, 84%)"
      } else {
        return "hsl(235, 19%, 35%)"
      }
    } else {
      if (this.state.isCompleted) {
        return "hsl(233, 14%, 35%)"
      } else {
        return "hsl(234, 39%, 85%)"
      }
    }
  }


  //To make the activity div draggable, i have to first set the draggable attribute to true
  //On drag start of the activity, I shall store the data of the activity that i want to drag
  //This is done through the event.dataTransfer.setData() function
  handleDragStart = (e) => {
    e.dataTransfer.setData("activity_id", e.target.id)
  }


  render() {
    return (
      <div style={{
        display: `${this.renderActivityDisplay()}`,
        backgroundColor: this.props.isLightTheme ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)",
        borderBottom: this.props.isLightTheme ? "solid thin hsl(233, 11%, 84%)" : "solid thin hsl(233, 14%, 35%)"
        }}
        className="activity"
        id={this.props.eachActivity}
        draggable
        onDragStart={this.handleDragStart}
      >
        <div
        style={{border: this.props.isLightTheme ? "solid thin hsl(233, 11%, 84%)" : "solid thin hsl(233, 14%, 35%)"}}
        type="button"
        onClick={this.handleCheckClick}
        className="circle">
          <img src={check} style={{display: this.state.isCompleted ? "" : "none"}} alt="" />
        </div>
        <div className="activity-name">
          <p style={{
            textDecoration: this.state.isCompleted ? "line-through": "",
            color: this.renderActivityFontColor()
          }}>
          {this.props.eachActivity}
          </p>
          <img src={cross} type="button" onClick={this.handleCrossClick} alt="" />
        </div>
      </div>
      )
  }
}

export default Activity
