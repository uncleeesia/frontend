import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import CleanerStats from "./components/CleanerStats/CleanerStats";
import CleanerProfile from "./components/CleanerPage/CleanerPage";
import Showcase from "./components/Common/Showcase/Showcase";
import axios from "axios";
import ServiceDetail from "./components/ServiceDetail/ServiceDetail";
import ConfirmBooking from "./components/ConfirmBooking/ConfirmBooking";
import Feedback from "./components/Feedback/Feedback";
import EditProfile from './components/EditProfile/EditProfile';
const port = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

function App() {
  useEffect(() => {
    axios
      .get(`${port}`)
      .then((res) => console.log(res.data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/service-details" element={<ServiceDetail />} />
          <Route path="/summary" element={<ConfirmBooking />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/cleanerstats" element={<CleanerStats />} />
          <Route path="/cleanerprofile" element={<CleanerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
