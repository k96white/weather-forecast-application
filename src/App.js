import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home/Home";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import Header from "./common/Header/Header";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route
            exact
            path="/:cityName/:day"
            component={HourlyForecast}
          ></Route>
          <Route exact path="*" component={PageNotFound}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
