import React from "react";


import ListChoice from "./ListChoice"

class Status extends React.Component {
  //After clicking "Clear Completed", call clearCompletedList() in the App component
  handleClearClick = () => {
    this.props.clearCompletedList()
  }

  renderNumberOfItemsLeft() {
    return (this.props.activityList - this.props.itemsCompleted)
  }

  //If the user clicks on "All", call selectListChoice in App component
  //Pass in "All" as the argument
  handleAllChoiceClick = () => {
    this.props.selectListChoice("All")
  }

  //If the user clicks on "Active", call selectListChoice in App component
  //Pass in "Active" as the argument
  handleActiveChoiceClick = () => {
    this.props.selectListChoice("Active")
  }

  //If the user clicks on "Completed", call selectListChoice in App component
  //Pass in "Completed" as the argument
  handleCompletedChoiceClick = () => {
    this.props.selectListChoice("Completed")
  }

  render() {
    return (
      <div
      style={{backgroundColor: this.props.isLightTheme ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)"}}
      className="status"
      >
        <span
        className="items-left"
        style={{color: this.props.isLightTheme ? "hsl(236, 9%, 61%)" : "hsl(234, 11%, 52%)"}}
        >
          {this.renderNumberOfItemsLeft()} {this.renderNumberOfItemsLeft() === 1 ? "item" : "items"} left
        </span>
        <span
        style={{color: this.props.isLightTheme ? "hsl(236, 9%, 61%)" : "hsl(234, 11%, 52%)"}}
        className={this.props.isLightTheme ? "light-clear-button" : "dark-clear-button"}
        type="button"
        onClick={this.handleClearClick}
        >
          Clear Completed
        </span>
        <div
        style={{backgroundColor: this.props.isLightTheme ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)"}}
        className={this.props.isLightTheme ? "light-list-choices" : "dark-list-choices"}
        >
          <ListChoice listChoice={this.props.listChoice} name="All" handleClick={this.handleAllChoiceClick} />
          <ListChoice listChoice={this.props.listChoice} name="Active" handleClick={this.handleActiveChoiceClick} />
          <ListChoice listChoice={this.props.listChoice} name="Completed" handleClick={this.handleCompletedChoiceClick} />
        </div>

      </div>
    )
  }
}

export default Status
