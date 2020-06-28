import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Bar } from "react-chartjs-2";

const apiKey = "375e5eb955b65131baa0137af4930919";

class HourlyForecast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: this.props.location.state.lat,
      long: this.props.location.state.long,
      day: this.props.location.state.dt,

      hourData: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Temperature in Kelvin",
            data: [],
            backgroundColor: "blue",
            borderWidth: 2,
            borderColor: "black",
          },
        ],
      },
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.long}&exclude=current,daily&appid=` +
          apiKey
      )
      .then((res) => {
        const hourData = res.data.hourly.filter(
          (item) => moment(item.dt * 1000).format("dddd") === this.state.day
        );

        hourData.forEach((item) => {
          this.state.chartData.labels.push(moment(item.dt * 1000).format("LT"));
          this.state.chartData.datasets[0].data.push(item.temp);
        });
        this.setState({
          hourData: hourData,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <h1>Hourly Forecast</h1>
        <div
          style={{
            border: "1px solid black",
            padding: "5px",
            display: "inline",
          }}
          title="Back to 5 day forecast"
        >
          <Link to="/">← Back To 5 day Forecast</Link>
        </div>
        <br />
        <br />
        {this.state.hourData.length > 0 ? (
          <Bar
            data={this.state.chartData}
            width={100}
            height={100}
            options={{
              title: {
                display: true,
                text: "Hourly Forecast for " + this.state.day,
                fontSize: 25,
              },
              legend: {
                position: "top",
              },
              layout: {
                padding: {
                  left: 50,
                  right: 50,
                  bottom: 0,
                  top: 5,
                },
              },
              maintainAspectRatio: false,
            }}
          />
        ) : (
          <h3>No Data To Show for this Day.</h3>
        )}
      </div>
    );
  }
}

export default withRouter(HourlyForecast);
