import React, { useEffect, useState } from "react";
import Typography from "../Common/Typography";
import Input from "../Common/Input";
import axios, { all } from "axios";
import Modal from "../Common/Modal";
import ServiceCard from "../Common/ServiceCard";
import Card from "../Common/Card";
import { useNavigate } from "react-router-dom";
const port = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
// const port = "http://127.0.0.1:5000";

const ViewHome = () => {
  const [preferences, setPreferences] = useState({
    id: 1,
    theme: "light",
    HouseCleaning: false,
    CarCleaning: false,
    BathroomCleaning: true,
    WindowCleaning: true,
    Indonesian: true,
    Filipino: false,
    Burmese: false,
    Vietnamese: false,
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const [allServiceProvider, setAllServiceProvider] = useState([]);
  const [preferredServices, setPreferredServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [user_id, setUserId] = useState(
    !!localStorage.getItem("user_id") ? localStorage.getItem("user_id") : null
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!user_id) {
      axios
        .get(`${port}/api/getServiceProviders`)
        .then((response) => {
          const allServiceraw = [];
          const allService = [];
          response.data.serviceProviders.forEach((data) => {
            allServiceraw.push(data.service_list);
          });
          allServiceraw.forEach((data) => {
            data.forEach((service) => {
              allService.push(service);
            });
          });

          setFilteredServices(allService);
          setAllServiceProvider(allService);
          if (!prefResponse.data.preferences.id) {
            setShowPreferences(true);
          } else if (prefResponse.data.preferences.id) {
            setShowPreferences(false);
            setPreferences(prefResponse.data.preferences);
            searchPreferenceService(
              prefResponse.data.preferences,
              response.data.serviceProviders
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      axios
        .get(`${port}/api/getPreferences?user_id=${user_id}`)
        .then((prefResponse) => {
          setPreferences(prefResponse.data.preferences);

          axios
            .get(`${port}/api/getServiceProviders`)
            .then((response) => {
              const allServiceraw = [];
              const allService = [];
              response.data.serviceProviders.forEach((data) => {
                allServiceraw.push(data.service_list);
              });
              allServiceraw.forEach((data) => {
                data.forEach((service) => {
                  allService.push(service);
                });
              });

              setFilteredServices(allService);
              setAllServiceProvider(allService);
              if (!prefResponse.data.preferences.id) {
                setShowPreferences(true);
              } else if (prefResponse.data.preferences.id) {
                setShowPreferences(false);
                setPreferences(prefResponse.data.preferences);
                searchPreferenceService(
                  prefResponse.data.preferences,
                  allService
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
    }
  }, []);

  const searchPreferenceService = (preferences, serviceProviders) => {
    const matchedServices = serviceProviders
      .filter((service) => {
        const cleaningTypeMatch =
          (!preferences.HouseCleaning ||
            service.cleaningTypes.includes("HouseCleaning")) &&
          (!preferences.CarCleaning ||
            service.cleaningTypes.includes("CarCleaning")) &&
          (!preferences.BathroomCleaning ||
            service.cleaningTypes.includes("BathroomCleaning")) &&
          (!preferences.WindowCleaning ||
            service.cleaningTypes.includes("WindowCleaning"));

        const nationalityMatch =
          (!preferences.Indonesian || service.nationality === "Indonesian") &&
          (!preferences.Filipino || service.nationality === "Filipino") &&
          (!preferences.Burmese || service.nationality === "Burmese") &&
          (!preferences.Vietnamese || service.nationality === "Vietnamese");

        return cleaningTypeMatch || nationalityMatch;
      })
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 3);

    setPreferredServices(matchedServices);
  };

  const handleSavePreferences = (_preferences) => {
    setShowPreferences(false);
    searchPreferenceService(_preferences, allServiceProvider);
    axios
      .post(`${port}/api/UpdatePreferences`, {
        preferences: _preferences,
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
      <Modal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={handleSavePreferences}
        preferences={preferences}
      />
      <Typography variant="h1">Welcome to the Cleaning Service App</Typography>
      <Input type="search" placeholder="Search..." onChange={handleSearch} />
      {preferredServices.length > 0 ? (
        <div className="mb-5">
          <Typography variant="h3">Services Based On Preference</Typography>
          <div className="flex justify-around">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-30">
              {preferredServices.map((services, i) => (
                <Card
                  additionalClass="w-70 mb-5"
                  key={services.id}
                  image="https://placehold.co/600x400"
                  variant="image"
                  title={services.name}
                  content={services.description}
                  onClick={() => {
                    navigate(`/service-details?id=${services.id}`);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Typography variant="h3" className="mb-10">
        All Service Provider
      </Typography>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-40">
          {filteredServices.map((services) => {
            <ServiceCard
              additionalClass="w-90"
              key={services.service_id}
              id={services.service_id}
              title={services.service_name}
              description={services.service_description}
              image={services.picture_url}
            />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewHome;
