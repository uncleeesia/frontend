import React from 'react';
import styles from './CleaningServiceList.module.css';

const CleaningServiceList = ({ services }) => (
  <div className={styles.CleaningServiceList}>
    <h2>Available Cleaning Services</h2>
    <ul>
      {services.length > 0 ? services.map(service => (
        <li key={service.id}>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
        </li>
      )) : <p>No services found</p>}
    </ul>
  </div>
);

export default CleaningServiceList;
