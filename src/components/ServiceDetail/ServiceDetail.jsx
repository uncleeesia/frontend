import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import ReviewCard from "../Common/ReviewCard";

const ServiceDetail = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      icon: <FaHome className="text-4xl text-primary" />,
      name: "Residential Cleaning",
      description: "Complete home cleaning services tailored to your needs",
      price: "$100-$300",
      duration: "3-5 hours",
    },
    {
      id: 2,
      icon: <FaBuilding className="text-4xl text-primary" />,
      name: "Commercial Cleaning",
      description: "Professional cleaning solutions for businesses",
      price: "$200-$500",
      duration: "4-8 hours",
    },
    {
      id: 3,
      icon: <FaBroom className="text-4xl text-primary" />,
      name: "Deep Cleaning",
      description: "Thorough cleaning for spotless results",
      price: "$150-$400",
      duration: "5-7 hours",
    },
    {
      id: 4,
      icon: <FaTools className="text-4xl text-primary" />,
      name: "Specialized Services",
      description: "Carpet, window, and post-construction cleaning",
      price: "$180-$450",
      duration: "4-6 hours",
    },
  ];

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

  // Remove icons before passing services via state
  const serializableServices = services.map(({ icon, ...rest }) => rest);

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="bg-primary py-8 text-white">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
            alt="Company Logo"
            className="h-16 mb-3 rounded object-cover shadow-md"
          />
          <Typography variant="h1" className="mb-2 text-white font-heading">
            Professional Cleaning Services
          </Typography>
          <p className="text-body text-white opacity-90">
            Your Trusted Partner in Cleanliness
          </p>
        </div>
      </header>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-12">
        <Typography variant="h2" className="text-primary mb-8">
          Our Services
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-6 bg-card rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-border flex flex-col items-start`}
            >
              <div className="mb-5 text-5xl text-primary">{service.icon}</div>
              <Typography variant="h3" className="mb-1 text-heading font-bold">
                {service.name}
              </Typography>
              <p className="text-accent mb-4 h-20">{service.description}</p>
              <div className="text-base font-medium mt-auto text-gray-700">
                <span className="mr-3 bg-gray-100 px-2 py-1 rounded text-xs">
                  Price:{" "}<span className="font-semibold text-primary">
                    {service.price}
                  </span>
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                  Duration:{" "}<span className="font-semibold">
                    {service.duration}
                  </span>
                </span>
              </div>
              <div className="mt-auto">
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
          ))}
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
                services: services.map(({ icon, ...rest }) => rest)
              }
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
