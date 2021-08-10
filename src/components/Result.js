import React from "react";
import "./Result.css";

const Result = (props) => {
  const { err, city, date, sunrise, sunset, temp, pressure, wind} =
    props.weather;
  let content = null;
  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
    content = (
      <>
        <h3>
          Wynik wyszukiwania dla <em>{city}</em>
        </h3>
        <h4>Dane dla dnia i godziny: {date}</h4>
        <h4>Aktualna temperatura: {temp}&#176;C</h4>
        <h4>Wschód o godzinie: {sunriseTime}</h4>
        <h4>Zachód o godzinie: {sunsetTime}</h4>
        <h4>Ciśnienie: {pressure}hPa</h4>
        <h4>Prędkość wiatru: {wind}km/h</h4>
      </>
    );
  }
  return (
    <div className="result">{err ? `Nie mam w bazie ${city}` : content}</div>
  );
};

export default Result;
