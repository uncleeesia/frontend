import React, { useState } from 'react';
import styles from './Home.module.css';
import SearchBar from '../SearchBar/SearchBar';
import CleaningServiceList from '../CleaningServiceList/CleaningServiceList';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';

const Home = () => {
  const [filteredServices, setFilteredServices] = useState([]);
  
  const handleSearch = (query) => {
    const allServices = [
      { id: 1, name: 'Sparkle Cleaners', description: 'We make your home shine.' },
      { id: 2, name: 'Fresh & Clean', description: 'Quality cleaning services.' },
    ];

    const matchedServices = allServices.filter(service => 
      service.name.toLowerCase().includes(query.toLowerCase()) || 
      service.description.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredServices(matchedServices);
  };

  return (
    <div className={styles.Home}>
      <ProfileAvatar />
      <h1>Welcome to the Cleaning Service App</h1>
      <SearchBar onSearch={handleSearch} />
      <CleaningServiceList services={filteredServices} />
    </div>
  );
};

export default Home;
