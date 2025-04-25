import React, { useState } from "react";
import styles from "./Home.module.css";
import CleaningServiceList from "../CleaningServiceList/CleaningServiceList";
import Typography from "../Common/Typography";
import Input from "../Common/Input";

const Home = () => {
  const [filteredServices, setFilteredServices] = useState([]);

  const handleSearch = (query) => {
    const allServices = [
      {
        id: 1,
        name: "Sparkle Cleaners",
        description: "We make your home shine.",
      },
      {
        id: 2,
        name: "Fresh & Clean",
        description: "Quality cleaning services.",
      },
    ];

    const matchedServices = allServices.filter(
      (service) =>
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredServices(matchedServices);
  };

  return (
    <div className={styles.Home}>
      <Typography variant="h1">Welcome to the Cleaning Service App</Typography>
      <Input type="search" placeholder="Search..." onSearch={handleSearch} />
      <CleaningServiceList services={filteredServices} />
    </div>
  );
};

export default Home;
