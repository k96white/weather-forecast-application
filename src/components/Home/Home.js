import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Search from "./Search/Search";
import axios from "axios";
import moment from "moment";
import ShowCards from "../ShowCards/ShowCards";

const apiKey = "375e5eb955b65131baa0137af4930919";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dailyData: [],
      cityData: [],
      cityName: "Mumbai",
      isSearched: false,
      isValid: true,
    };
  }

  componentDidMount() {
    this.fetchWeatherDetails();
  }
  componentDidUpdate() {
    if (this.state.isSearched) {
      this.fetchWeatherDetails();
      this.setState({
        isSearched: false,
      });
    }
  }
  fetchWeatherDetails = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&appid=` +
          apiKey
      )
      .then((res) => {
        const dailyData = res.data.list.filter((item) =>
          item.dt_txt.includes("18:00:00")
        );
        console.log(dailyData);
        this.setState({
          dailyData: dailyData,
          cityData: res.data.city,
          isValid: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isValid: false,
        });
      });
  };
  getCityName = (cityName) => {
    this.setState({
      cityName: cityName,
      isSearched: true,
    });
  };
  render() {
    return (
      <div>
        <h2>Weather of {this.state.cityName}</h2>
        <br />
        <Search getCityName={this.getCityName} />
        <br />
        <div>
          {this.state.isValid ? (
            <>
              <h2>5 Day Forecast for {this.state.cityData.name}</h2>
              <div className={styles.CardContainer}>
                {this.state.dailyData.map((item, index) => (
                  <div key={index}>
                    <ShowCards cardData={item} cityData={this.state.cityData} />
                    <Link
                      to={{
                        pathname:
                          "/" +
                          this.state.cityData.name +
                          "/" +
                          moment(item.dt * 1000).format("dddd"),
                        state: {
                          lat: this.state.cityData.coord.lat,
                          long: this.state.cityData.coord.lon,
                          dt: moment(item.dt * 1000).format("dddd"),
                        },
                      }}
                    >
                      <div className={styles.HourlyDataBtn}>Hourly Data</div>
                    </Link>
                  </div>
                ))}
              </div>
              <br />
              <br />
            </>
          ) : (
            <h5>
              Error in fetching data , kindly check searched term or your
              internet connection.
            </h5>
          )}
        </div>
      </div>
    );
  }
}
