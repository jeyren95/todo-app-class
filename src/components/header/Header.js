import React from "react";

import "./Header.css";
import sun from "../../images/icon-sun.svg";
import moon from "../../images/icon-moon.svg";
import lightBackgroundImage from "../../images/bg-desktop-light.jpg";
import darkBackgroundImage from "../../images/bg-desktop-dark.jpg"

class Header extends React.Component {
  state = {
    input: "",
    backgroundImage: lightBackgroundImage,
    themeImage: moon,
    inputBackgroundColor: "hsl(0, 0%, 98%)",
    inputFontColor: "hsl(235, 19%, 35%)",
    circleBorderColor: "hsl(236, 33%, 92%)"
  }

  //When the user types something, change the state of input to what the user typed
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  //When the user submits the form, call addActivity() in the App component
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.addActivity(this.state.input)
    this.setState({input: ""})
  }


  //When the user clicks on the theme color button, call changeThemeColor() in the App component
  //Based on the latest changed theme color, set the image states for the theme button and the background
  onThemeButtonClick = async () => {
    await this.props.changeThemeColor()

    if (this.props.isLightTheme) {
      this.setState({
        backgroundImage: lightBackgroundImage,
        themeImage: moon,
        inputBackgroundColor: "hsl(0, 0%, 98%)",
        inputFontColor: "hsl(235, 19%, 35%)",
        circleBorderColor: "hsl(233, 11%, 84%)"
      })
      document.querySelector("body").style.backgroundColor = "hsl(236, 33%, 92%)"
    } else {
      this.setState({
        backgroundImage: darkBackgroundImage,
        themeImage: sun,
        inputBackgroundColor: "hsl(235, 24%, 19%)",
        inputFontColor: "hsl(234, 39%, 85%)",
        circleBorderColor: "hsl(233, 14%, 35%)"
      })
      document.querySelector("body").style.backgroundColor = "hsl(235, 21%, 11%)"
    }
  }

  render() {
    return (
      <div className="header" style={{backgroundImage: `url(${this.state.backgroundImage})`}}>
        <div className="title">
          <h1>TODO</h1>
          <img onClick={this.onThemeButtonClick} src={this.state.themeImage} type="button" alt="" />
        </div>
        <div className="new-activity" style={{backgroundColor: this.state.inputBackgroundColor}}>
          <div style={{border: `solid thin ${this.state.circleBorderColor}`}} className="circle">
          </div>
          <form onSubmit={this.onFormSubmit}>
            <input
            style={{backgroundColor: this.state.inputBackgroundColor, color: this.state.inputFontColor}}
            placeholder="What's next to be done?"
            value={this.state.input}
            onChange={this.onInputChange}
            />
          </form>
        </div>
      </div>
    )
  }
}

export default Header
