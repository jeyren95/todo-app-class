import React from "react";

import "./App.css";

import Header from "./header/Header";
import Activity from "./Activity";
import Status from "./Status";

class App extends React.Component {
  state = {
    activityList: [],
    completedList: [],
    listChoice: "All",
    isLightTheme: true
  }

  //When the user submits the form in the Header component, add that activity to activityList
  addActivity = (activity) => {
    if (this.state.activityList.includes(activity)) {
      alert("Activity is already on the list!")
    } else {
      this.setState({activityList: [...this.state.activityList, activity]})
      console.log("Activity added")
    }
  }


  //When the user clicks the cross of that particular activity, remove that activity from activityList
  //This is based on the index of that activity in activityList
  deleteActivity = (index) => {
    const listToBeUpdated = this.state.activityList
    listToBeUpdated.splice(index, 1)

    this.setState({activityList: listToBeUpdated})
    console.log("Activity deleted")
  }

  //When the user clicks either "All", "Completed" or "active", set the listChoice state accordingly
  selectListChoice = (selectedChoice) => {
    this.setState({listChoice: selectedChoice})
    console.log(`${selectedChoice} list selected`)
  }

  //When the user checks the activity, add the activity to the completedList
  addCompletedActivity = (activity) => {
    this.setState({completedList: [...this.state.completedList, activity]})
    console.log("Completed activity added to the list of completed activities")
  }


  //When the user checks and then unchecks the activity, delete the activity that was added to the completedList
  deleteFromCompletedList = (activity) => {
    const completedListToBeUpdated = this.state.completedList
    const indexOfCompletedActivity = this.state.completedList.indexOf(activity)
    completedListToBeUpdated.splice(indexOfCompletedActivity, 1)

    this.setState({completedList: completedListToBeUpdated})
    console.log("Activity deleted from completed list")
  }

  //When the user wants to clear the completedList
  //For each activity in the completedList, find the index of that activity in activityList
  //Then delete it from activityList
  //Also reset the completedList state to an empty array
  clearCompletedList = () => {
    const listToBeUpdated = this.state.activityList

    this.state.completedList.forEach((completedActivity) => {
        const indexOfCompletedActivity = this.state.activityList.indexOf(completedActivity)
        listToBeUpdated.splice(indexOfCompletedActivity, 1)
    })

    this.setState({
      activityList: listToBeUpdated,
      completedList: []
    })
  }


  //When user clicks the theme button, change the theme state to the opposite of whatever it was
  changeThemeColor =  () => {
    this.setState({isLightTheme: !this.state.isLightTheme})
    console.log("Change theme color")
  }


  renderList() {
    return this.state.activityList.map((activity) => {
      return (
          <Activity
          key={activity}
          index={this.state.activityList.indexOf(activity)}
          eachActivity={activity}
          deleteActivity={this.deleteActivity}
          listChoice={this.state.listChoice}
          addCompletedActivity={this.addCompletedActivity}
          deleteFromCompletedList={this.deleteFromCompletedList}
          isLightTheme={this.state.isLightTheme}
          />
      )
    });
  }


  //On dragging over the activity, i want to allow the dragging over to actually happen
  //And not the default event
  handleDragOver = (e) => {
    e.preventDefault();
  }


  handleDrop = (e) => {
    //On dropped the activity, i want to get hold of the data that is being dropped
    //This is done by the e.dataTransfer.getData(key) function
    const activityToBeDropped = e.dataTransfer.getData("activity_id")
    console.log(`Activity to be dropped is ${activityToBeDropped}`)

    //After which i find the index of that activity in the current activity list
    const activityToBeDroppedIndex = this.state.activityList.indexOf(activityToBeDropped)

    //I also want to find the index that i want to drop the activity at
    const indexToBeDroppedAt = this.state.activityList.indexOf(e.target.innerHTML)
    console.log(`Index position to be dropped at is ${indexToBeDroppedAt}`)

    //I will splice out the activity that needs to be dropped from the list
    const listToBeUpdated = this.state.activityList
    listToBeUpdated.splice(activityToBeDroppedIndex, 1)

    //And then add that activity to the desired index in the activity list
    listToBeUpdated.splice(indexToBeDroppedAt, 0, activityToBeDropped)

    this.setState({activityList: listToBeUpdated})
    console.log(`Rearranged activity list: ${this.state.activityList}`)
  }

  render() {
    return (
      <div>
        <Header
        addActivity={this.addActivity}
        isLightTheme={this.state.isLightTheme}
        changeThemeColor={this.changeThemeColor}
        />
        <div className="list-and-functions">
          <div
          className="activity-list"
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop}
          >
            {this.renderList()}
          </div>
          <Status
          activityList={this.state.activityList.length}
          itemsCompleted={this.state.completedList.length}
          clearCompletedList={this.clearCompletedList}
          selectListChoice={this.selectListChoice}
          listChoice={this.state.listChoice}
          isLightTheme={this.state.isLightTheme}
          />
        </div>
        <div className="drag-and-drop-sign">
          <p
          style={{color: this.state.isLightTheme ? "hsl(236, 9%, 61%)" : "hsl(234, 11%, 52%)"}}
          >
            Drag and drop to reorder list
          </p>
        </div>

      </div>
    )
  }
}

export default App
