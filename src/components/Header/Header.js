import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

const Header = () => (
  <div className={styles.Header}>
    <nav>
            <h1>Welcome to the App</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
  </div>
);

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
