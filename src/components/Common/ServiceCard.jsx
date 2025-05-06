import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({
  title,
  price,
  description,
  rating,
  reviews,
  image,
  additionalClass,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/service-details");
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-card ${
        additionalClass || ""
      }`}
    >
      <img src={image} alt={title} className="w-full h-70 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-heading">{title}</h3>
          {price ? (
            <span className="text-primary font-bold">${price}/hr</span>
          ) : (
            ""
          )}
        </div>
        <p className="text-accent mb-3">{description}</p>
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`w-4 h-4 ${
                  index < rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-accent">({reviews} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
