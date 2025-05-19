import React, { useState } from "react";
import Typography from "../Common/Typography";
import Button from "../Common/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const port = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [username, setUsername] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleAnonymousChange = (e) => {
    setIsAnonymous(e.target.checked);
    if (e.target.checked) {
      setUsername("");
      setContactNumber("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${port}/api/postFeedback`,
        {
          feedback: feedbackText,
          username: isAnonymous ? null : username,
          contactNumber: isAnonymous ? null : contactNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Feedback submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      });

    alert("Thank you for your feedback!");
    setFeedbackText("");
    setUsername("");
    setContactNumber("");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-white via-blue-300 to-purple-300">
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="p-8 rounded-lg shadow-md w-[90%] max-w-lg">
          <Typography variant="h5" className="font-semibold mb-4 text-gray-800">
            Give us your feedback!
          </Typography>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="feedback"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Your Feedback:
              </label>
              <textarea
                id="feedback"
                value={feedbackText}
                onChange={handleInputChange}
                rows="5"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username:
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isAnonymous}
                placeholder={isAnonymous ? "Anonymous" : "Enter your username"}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="contactNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Contact Number:
              </label>
              <input
                id="contactNumber"
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                disabled={isAnonymous}
                placeholder={
                  isAnonymous ? "Not Provided" : "Enter your contact number"
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-gray-100"
              />
            </div>

            <div className="flex items-center">
              <input
                id="anonymous"
                type="checkbox"
                checked={isAnonymous}
                onChange={handleAnonymousChange}
                className="mr-2 leading-tight"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700">
                Submit anonymously
              </label>
            </div>

            <Button type="submit" variant="primary">
              Submit Feedback
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
