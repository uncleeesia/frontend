import React from "react";
import styles from "./Header.module.css";
import Typography from "../Common/Typography";

const Header = () => (
  <div className={styles.Header}>
    <nav>
      <Typography variant="h1">Cleaning Haul</Typography>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  </div>
);

export default Header;
