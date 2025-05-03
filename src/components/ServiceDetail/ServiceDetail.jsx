import React, { useEffect, useState } from "react";
import styles from "./ServiceDetail.module.css";
import ReviewCard from "../Common/ReviewCard";
import axios from "axios";

const ServiceDetail = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // ("https://sim-assignment-csit314-9e613de15308.herokuapp.com/api/getReviews")
    axios
      .get("http://127.0.0.1:5000/api/getReviews")
      .then((response) => {
        setReviews(response.data.reviews);
        console.log(response.data.reviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  return (
    <div className={styles.ServiceDetail}>
      <div class="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <ReviewCard
            additionalClassname={"w-full"}
            key={review.id}
            author={review.author}
            rating={review.rating}
            review={review.review}
            date={review.date}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceDetail;
