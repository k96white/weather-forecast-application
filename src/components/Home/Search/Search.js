import React, { useState } from "react";
import styles from "./Search.module.css";

function Search({ getCityName }) {
  const [cityName, setCityName] = useState("");
  const [showError, setShowError] = useState(false);
  const handleInput = () => {
    if (cityName === "") {
      setShowError(true);
    } else {
      getCityName(cityName);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter A city name to search...."
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        className={styles.InputBox}
      ></input>
      <button type="submit" onClick={handleInput} className={styles.SearchBtn}>
        Search
      </button>
      {showError ? <h5>Please Enter a City Name</h5> : <div></div>}
    </div>
  );
}

export default Search;
