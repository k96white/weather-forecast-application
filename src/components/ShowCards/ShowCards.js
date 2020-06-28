import React from "react";
import moment from "moment";
import styles from "./ShowCards.module.css";

function ShowCards(props) {
  const { cardData, cityData } = props;

  let date = new Date();
  date.setTime(cardData.dt * 1000);

  return (
    <div className={styles.WeatherCard}>
      <h3>{moment(date).format("dddd")}</h3>
      <span>
        <em>{moment(date).format("LL")}</em>
      </span>
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${cardData.weather[0].icon}@2x.png`}
          alt="weatherPic"
        ></img>
      </div>
      <div>{cardData.weather[0].main}</div>
      <div>
        <strong>Max Temp :</strong> {cardData.main.temp_max} K
      </div>
      <div>
        <strong>Min Temp :</strong> {cardData.main.temp_min} K
      </div>
      <div>
        <strong>Coordinates :</strong> {cityData.coord.lat}° N,
        {cityData.coord.lon}° E
      </div>
      <div>
        <strong>Humidity :</strong> {cardData.main.humidity}%
      </div>
      <div>
        <strong>Sunrise :</strong>{" "}
        {moment(cityData.sunrise * 1000).format("LT")}
      </div>
      <div>
        <strong>Sunset :</strong> {moment(cityData.sunset * 1000).format("LT")}
      </div>
    </div>
  );
}

export default ShowCards;
