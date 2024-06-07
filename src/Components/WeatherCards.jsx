import React from "react";
import "./WeatherCards.css";

const WeatherData = ({ data }) => {
  //   Object.keys(data).forEach((key) => console.log("***", key, data[key]));
  return (
    <div className="weather-cards">
      {data
        ? Object.keys(data).map((key) => {
            return (
              <div className="weather-card" key={key}>
                <h3>{key}</h3>
                <p>{data[key]}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};
export default WeatherData;
