import React from 'react';
import Typography from '../Common/Typography';
import styles from './CleaningServiceList.module.css';

const CleaningServiceList = ({ services }) => (
  <div className={styles.CleaningServiceList}>
    <Typography variant="h2">Available Cleaning Services</Typography>
    <ul>
      {services.length > 0 ? services.map(service => (
        <li key={service.id}>
          <Typography variant="h3">{service.name}</Typography>
          <Typography variant="p">{service.description}</Typography>
        </li>
      )) : <Typography variant="p">No services found</Typography>}
    </ul>
  </div>
);

export default CleaningServiceList;
