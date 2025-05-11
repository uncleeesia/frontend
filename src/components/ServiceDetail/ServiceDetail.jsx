import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaBuilding,
  FaBroom,
  FaTools,
  FaArrowLeft,
  FaArrowRight,
  FaComments,
} from "react-icons/fa";
import Typography from "../Common/Typography";
import Button from "../Common/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReviewCard from "../Common/ReviewCard";
import axios from "axios";
// const port = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const port = "http://127.0.0.1:5000";

const ServiceDetail = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [services, setServices] = useState(null);  // Start with null to avoid issues before data is fetched
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    axios
      .get(`${port}/api/getServicesById`, { params: { id } })
      .then((response) => {
        // Ensure the services data is in the correct structure
        if (response.data && response.data.services && Array.isArray(response.data.services)) {
          setServices(response.data.services[0]); // Assuming services is an array
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setServices([]); // Set to an empty array if there's an error
      });
  }, [id]);

  // Ensure the services data is properly checked before rendering
  if (!services) {
    return <p>Loading...</p>;  // Or a loading spinner if you prefer
  }

  const reviews = [
    {
      id: 1,
      name: "John Smith",
      rating: 5,
      review: "Exceptional service! My house has never been cleaner.",
      verified: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      rating: 4,
      review: "Very professional team and great attention to detail.",
      verified: true,
    },
    {
      id: 3,
      name: "Mike Brown",
      rating: 5,
      review: "Outstanding results! Will definitely use again.",
      verified: true,
    },
  ];

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const isValidBooking = selectedDate && selectedServices.length > 0;

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="bg-primary py-8">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <img
            src={services.image}  // Ensure this field exists in the fetched data
            alt="Company Logo"
            className="h-50 rounded object-cover shadow-md"
          />
          <Typography variant="h1" className="my-4 ">
            Professional Cleaning Services
          </Typography>
          <Typography variant="p" className="text-body opacity-90">
            Your Trusted Partner in Cleanliness
          </Typography>
        </div>
      </header>

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <Typography variant="h2" className="text-primary mb-8">
          Our Services
        </Typography>
        <div className="flex justify-center mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.cleaningTypes && services.cleaningTypes.length > 0 ? (
              services.cleaningTypes.map((service) => (
                <div
                  key={service.id}
                  className={`p-6 bg-card rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-border flex flex-col items-start`}
                >
                  <div className="mb-5 text-3xl text-primary">
                    {service.type}
                  </div>
                  <Typography
                    variant="h3"
                    className="mb-1 text-heading font-bold"
                  >
                    {service.name}
                  </Typography>
                  <p className="text-accent mb-4 h-20">{service.summary}</p>
                  <div className="flex flex-wrap gap-2 text-base font-medium mt-auto text-gray-700">
                    <span className="mr-3 bg-gray-200 px-2 py-1 rounded text-xs">
                      Price:{" "}
                      <span className="font-semibold text-primary">
                        ${service.price}
                      </span>
                    </span>
                    <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                      Duration:{" "}
                      <span className="font-semibold">
                        {service.duration} in minutes
                      </span>
                    </span>
                  </div>
                  <div className="mt-0">
                    <Button
                      onClick={() => handleServiceToggle(service.id)}
                      className={`mt-4 px-5 py-2 rounded-lg font-semibold transition-colors duration-200 shadow ${
                        selectedServices.includes(service.id)
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-secondary text-foreground hover:bg-primary hover:text-white"
                      }`}
                    >
                      {selectedServices.includes(service.id)
                        ? "Selected"
                        : "Select"}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p>No services available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Select Date Section */}
      <section className="flex justify-center">
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <label className="text-sm font-medium text-gray-700">
            Select Date & Time
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            placeholderText="Choose date and time"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </section>

      {/* Booking actions */}
      <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between gap-4 items-center">
        <Button
          className="px-6 py-3 bg-secondary text-foreground rounded-lg hover:bg-primary hover:text-white shadow transition-colors flex items-center"
          onClick={() => {
            navigate("/");
          }}
        >
          <FaArrowLeft />
        </Button>
        <Button
          disabled={!isValidBooking}
          onClick={() =>
            navigate("/summary", {
              state: {
                selectedServices,
                selectedDate,
                services: services.cleaningTypes.map(({ icon, ...rest }) => rest),
              },
            })
          }
          className={`px-6 py-3 rounded-lg font-bold shadow-lg transition-colors duration-200 ${
            isValidBooking
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-muted text-muted-foreground opacity-60 cursor-not-allowed"
          }`}
        >
          Proceed to Booking
        </Button>
      </div>

      {/* Reviews Section */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <Typography variant="h2" className="mb-8 text-primary">
            Customer Reviews
          </Typography>
          <div className="flex justify-center items-center gap-4 w-full">
            <Button
              onClick={() =>
                setCurrentReviewIndex((prev) =>
                  prev > 0 ? prev - 1 : reviews.length - 1
                )
              }
              className="p-2 rounded-full bg-white shadow hover:bg-primary hover:text-white transition-colors"
              aria-label="Previous review"
            >
              <FaArrowLeft className="text-blue-300" />
            </Button>
            <ReviewCard
              author={reviews[currentReviewIndex].name}
              review={reviews[currentReviewIndex].review}
              rating={reviews[currentReviewIndex].rating}
            />
            <Button
              onClick={() =>
                setCurrentReviewIndex((prev) =>
                  prev < reviews.length - 1 ? prev + 1 : 0
                )
              }
              className="p-2 rounded-full bg-white shadow hover:bg-primary hover:text-white transition-colors"
              aria-label="Next review"
            >
              <FaArrowRight className="text-blue-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <Button
        className="fixed bottom-4 right-4 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90"
        aria-label="Open chat"
      >
        <FaComments className="text-2xl" />
      </Button>
    </div>
  );
};

export default ServiceDetail;
