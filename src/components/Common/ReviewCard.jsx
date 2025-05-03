import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ rating, review, author, date, serviceType,additionalClassname }) => {
  return (
    <div className={`p-4 rounded-lg shadow-sm hover:shadow-md bg-card transition-all duration-300`+ {additionalClassname}}>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`w-5 h-5 ${
              index < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-accent">{rating}.0</span>
      </div>
      <p className="text-foreground mb-3">{review}</p>
      <div className="flex justify-between items-center text-sm">
        <div>
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-accent">{serviceType}</p>
        </div>
        <span className="text-accent">{date}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
