import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "../Common/Typography";
import Button from "../Common/Button";

const ConfirmBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedServices = [], services = [], selectedDate = null } = location.state || {};

  // Filter the service details by selected IDs
  const selectedServiceDetails = services.filter(service => selectedServices.includes(service.id));

  // Calculate total price (Assuming price is like "$100-$300", picking the lower bound for the example)
  const getServicePrice = (priceStr) => {
    if (!priceStr) return 0;
    // e.g., "$100-$300"
    const match = priceStr.match(/\$?(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };
  const totalAmount = selectedServiceDetails.reduce(
    (sum, service) => sum + getServicePrice(service.price), 0
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-inter">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <Typography variant="h1" className="mb-6 text-primary text-center">
          Confirm Your Booking
        </Typography>

        <section className="mb-6">
          <Typography variant="h2" className="mb-2 text-heading">
            Services Selected
          </Typography>
          <ul className="divide-y divide-gray-200">
            {selectedServiceDetails.map((service) => (
              <li key={service.id} className="py-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{service.name}</span>
                  <span className="text-primary">{service.price}</span>
                  <span className="text-gray-500 text-sm">{service.duration}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Amount:</span>
            <span className="text-green-700">${totalAmount}</span>
          </div>
        </section>

        <section className="mb-8">
          <Typography variant="h2" className="mb-1">Booking Date & Time</Typography>
          <div className="bg-gray-100 p-3 rounded text-heading">
            {selectedDate
              ? new Date(selectedDate).toLocaleString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : <span className="text-red-500">Not Set</span>}
          </div>
        </section>

        <div className="flex gap-4 justify-between">
          <Button
            className="bg-secondary text-foreground rounded-lg px-4 py-2 font-semibold shadow hover:bg-primary/10"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button
            className="bg-primary text-white rounded-lg px-4 py-2 font-semibold shadow hover:bg-primary/90"
            onClick={() => {
              alert("Booking Confirmed!"); // Replace with actual booking submission.
              navigate("/");
            }}
            disabled={selectedServiceDetails.length === 0 || !selectedDate}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
