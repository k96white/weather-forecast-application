import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import sunIcon from "../../utils/icons8-summer-48.png";

function Header() {
  return (
    <div className={styles.HeadContainer}>
      <header>
        <h1>
          <Link to="/" className={styles.Header}>
            <img
              src={sunIcon}
              alt="sunpic"
              style={{ verticalAlign: "baseline" }}
            ></img>
            Weather Forecast App
          </Link>
        </h1>
      </header>
    </div>
  );
}

export default Header;
