import React, { Component } from "react";
import Form from "./Form";
import Result from "./Result";
import "./App.css";

const APIkey = "6b494f2d0c855ebc548a8019555da908";

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    err: "",
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  componentDidUpdate(prevState) {
    if (prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIkey}&units=metric`;

      fetch(API)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("Nie udało się");
        })
        .then((response) => response.json())
        .then((data) => {
          const time = new Date().toLocaleString();
          this.setState((prevState) => ({
            city: prevState.value,
            err: false,
            date: time,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            wind: data.wind.speed,
          }));
        })
        .catch((err) => {
          console.log(err);
          this.setState((prevState) => ({
            err: true,
            city: prevState.value,
          }));
        });
    }
  }
  render() {
    return (
      <div className="App">
        <p className="Title">Aplikacja Pogodowa</p>
        <Form value={this.state.value} change={this.handleInputChange} />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
