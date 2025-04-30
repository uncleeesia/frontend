import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Typography from "../Common/Typography";
import Input from "../Common/Input";
import axios from "axios";
import Modal from "../Common/Modal";
import ServiceCard from "../Common/ServiceCard";

const Home = () => {
  const [preferences, setPreferences] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [preferredServices, setPreferredServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  //assuming i am first time logging in
  // fetch("https://sim-assignment-csit314-9e613de15308.herokuapp.com/api/getPreferences")
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/getPreferences")
      .then((response) => {
        setPreferences(response.data.preferences);
        //to change to dynamic to fit the condition
        if (!response.data.preferences.id) {
          setShowPreferences(true);
        }else if (response.data.preferences.id) {
          setShowPreferences(false);
        }
        console.log(response.data.preferences)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // fetch("https://sim-assignment-csit314-9e613de15308.herokuapp.com/api/getServices")
    axios
      .get("http://127.0.0.1:5000/api/getServices")
      .then((response) => {
        setFilteredServices(response.data.services);
        setAllServices(response.data.services);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSavePreferences = (preferences) => {
    //some api call to backend to save preferences
    setShowPreferences(false);
    const matchedServices = allServices.filter((service) => {
      console.log(service)
      return service.rating > preferences.rating;
    });
    //some logic
    setPreferredServices(matchedServices);
    window.location.reload();
  };

  const handleSearch = (query) => {
    const matchedServices = allServices.filter((service) => {
      return service.name
        .toLowerCase()
        .includes(query.target.value.toLowerCase());
    });
    setFilteredServices(matchedServices);
  };

  return (
    <div className="p-20">
      <Modal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={handleSavePreferences}
      />
      <Typography variant="h1">Welcome to the Cleaning Service App</Typography>
      <Input type="search" placeholder="Search..." onChange={handleSearch} />
      <div className="flex">
        {preferredServices.map((services, i) => (
          <ServiceCard
            additionalClass="w-90"
            key={services.id}
            title={services.name}
            price={services.price}
            description={services.description}
            rating={services.rating}
            reviews={services.reviews}
            image={services.image}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {filteredServices.map((services, i) => (
            <ServiceCard
              additionalClass="w-90"
              key={services.id}
              title={services.name}
              price={services.price}
              description={services.description}
              rating={services.rating}
              reviews={services.reviews}
              image={services.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
