import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherData from "./WeatherCards";
import styles from "./SearchForm.module.css";
import IconImage from "./IconImage";

const API_KEY = "9b6c6c8e1ae342a4a47104402240706";
const API_ENDPOINT = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}`;

const SearchForm = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState({ src: "", alt: "" });

  const fetchData = async (city) => {
    if (city !== "") {
      try {
        let data = await axios.get(API_ENDPOINT, { params: { q: city } });
        let response = await data.data;
        return response;
      } catch (e) {
        alert("Failed to fetch weather data");
        setCity("");
        return null;
      }
    } else {
      alert("Enter city name");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let weatherInfo = await fetchData(city);
    if (weatherInfo) {
      setLoading(false);
      setData({
        Temperature: weatherInfo.current.temp_c + "°C",
        Humidity: weatherInfo.current.humidity + "%",
        Condition: weatherInfo.current.condition.text,
        "Wind Speed": weatherInfo.current.wind_kph + "kph",
      });
      setIcon({
        src: weatherInfo.current.condition.icon,
        alt: weatherInfo.current.condition.text,
      });
    } else {
      setData();
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };
  //   console.log(city);
  return (
    <>
      <div className={styles.searchform}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Enter city name"
          ></input>
          <button type="submit">Search</button>
        </form>
      </div>
      {icon.src ? <IconImage image={icon.src} alt={icon.alt} /> : null}

      {loading ? (
        <p>Loading data...</p>
      ) : data !== undefined ? (
        <WeatherData data={data} />
      ) : null}
    </>
  );
};

export default SearchForm;
