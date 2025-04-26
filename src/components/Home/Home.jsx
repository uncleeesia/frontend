import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import CleaningServiceList from "../CleaningServiceList/CleaningServiceList";
import Typography from "../Common/Typography";
import Input from "../Common/Input";
import axios from "axios";
import Modal from "../Common/Modal";

const Home = () => {
  const [filteredServices, setFilteredServices] = useState([]);
  const [preferences, setPreferences] = useState(false);
  const [showPreferences, setShowPreferences] = useState(true);

  //assuming i am first time logging in
  // fetch("https://sim-assignment-csit314-9e613de15308.herokuapp.com/api/getPreferences")
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/getPreferences")
      .then((response) => {
        setPreferences(response.data);
        // setShowPreferences(response.data);
        console.log(showPreferences)
        if (true) { //to change to dynamic to fit the condition
          setShowPreferences(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleSavePreferences = (preferences) => {
    //some api call to backend to save preferences
    setShowPreferences(false);
  };

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
      <Modal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={handleSavePreferences}
      />
      <Typography variant="h1">Welcome to the Cleaning Service App</Typography>
      <Input type="search" placeholder="Search..." onSearch={handleSearch} />
      <CleaningServiceList services={filteredServices} />
    </div>
  );
};

export default Home;
