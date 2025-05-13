import React, { useEffect, useState } from "react";
import Typography from "../Common/Typography";
import Input from "../Common/Input";
import axios from "axios";
import Modal from "../Common/Modal";
import ServiceCard from "../Common/ServiceCard";
import Card from "../Common/Card";
const port = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const Home = () => {
  const [preferences, setPreferences] = useState();
  const [showPreferences, setShowPreferences] = useState(false);
  const [allServiceProvider, setAllServiceProvider] = useState([]);
  const [preferredServices, setPreferredServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    console.log(`${port}/api/getPreferences`);
    axios
      .get(`${port}/api/getPreferences`)
      .then((PrefResponse) => {
        setPreferences(PrefResponse.data.preferences);
        //to change to dynamic to fit the condition

        axios
          .get(`${port}/api/getServices`)
          .then((response) => {
            setFilteredServices(response.data.services);
            setAllServiceProvider(response.data.services);
            if (!PrefResponse.data.preferences.id) {
              setShowPreferences(true);
            } else if (PrefResponse.data.preferences.id) {
              setShowPreferences(false);
              setPreferences(PrefResponse.data.preferences);
              searchPreferenceService(
                PrefResponse.data.preferences,
                response.data.services
              );
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const searchPreferenceService = (preferences, services) => {
    const matchedServices = services
      .filter((service) => {
        const matchesRating =
          (preferences.rating4 && service.rating >= 4) ||
          (preferences.rating5 && service.rating === 5);

        const matchesReviews =
          (preferences.reviews50 && service.reviews >= 50) ||
          (preferences.reviews200 && service.reviews >= 200);

        const matchesBudget =
          (preferences.budgetLow && service.price < 30) ||
          (preferences.budgetMid &&
            service.price >= 30 &&
            service.price <= 40) ||
          (preferences.budgetHigh && service.price > 40);

        return matchesRating || matchesReviews || matchesBudget;
      })
      .slice(0, 3);
    setPreferredServices(matchedServices);
  };

  const handleSavePreferences = (preferences) => {
    setShowPreferences(false);
    searchPreferenceService(preferences);
    axios
      .post(`${port}/api/UpdatePreferences`, {
        preferences: preferences,
      })
      .then((response) => {
        console.log("Preferences saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving preferences:", error);
      });
    window.location.reload();
  };

  const handleSearch = (query) => {
    const matchedServices = allServiceProvider.filter((service) => {
      return service.name
        .toLowerCase()
        .includes(query.target.value.toLowerCase());
    });
    setFilteredServices(matchedServices);
  };

  return (
    <div className="p-20">
      <div className="flex justify-between items-center mb-4">
      <div></div> {/* Placeholder to align right */}
        <button
          onClick={() => window.location.href = "/EditProfile"}
          className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold py-2 px-4 rounded shadow"
        >
          Edit Profile
        </button>
      </div>

      <Modal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={handleSavePreferences}
        preferences={preferences}
      />
      <Typography variant="h1">Welcome to the Cleaning Service App</Typography>
      <Input type="search" placeholder="Search..." onChange={handleSearch} />
      {!preferredServices ? (
        <div>
          <Typography variant="h3">Services Based On Preference</Typography>
          <div className="flex justify-around">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {preferredServices.map((services, i) => (
                <Card
                  additionalClass="w-70 mb-5"
                  key={services.id}
                  image="https://placehold.co/600x400"
                  variant="image"
                  title={services.name}
                  content={services.description}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Typography variant="h3">All Services</Typography>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {filteredServices.map((services, i) => (
            <ServiceCard
              additionalClass="w-90"
              key={services.id}
              title={services.name}
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
