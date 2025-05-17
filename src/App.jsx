import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewHome from "./components/ViewHome/ViewHome";
import ViewAbout from "./components/ViewAbout/ViewAbout";
import ViewContact from "./components/ViewContact/ViewContact";
import ViewBlacklistUser from "./components/ViewBlacklistUser/ViewBlacklistUser";
import ViewServiceDetail from "./components/ViewServiceDetail/ViewServiceDetail";
import ViewConfirmBooking from "./components/ViewConfirmBooking/ViewConfirmBooking";
import ViewBookingHistory from "./components/ViewCleanerBookingHistory/ViewCleanerBookingHistory";
import ViewFeedback from "./components/ViewFeedback/ViewFeedback";
import ViewAccountCredential from "./components/ViewAccountCredential/ViewAccountCredential";
import ViewCleanerStats from "./components/ViewCleanerStats/ViewCleanerStats";
import ViewCleanerProfile from "./components/ViewCleanerPage/ViewCleanerPage";
import Showcase from "./components/Common/Showcase/Showcase";
import ViewHeader from "./components/ViewHeader/ViewHeader";
import ViewLogin from "./components/ViewLogin/ViewLogin";
import ViewRegister from "./components/ViewRegister/ViewRegister";
import ViewUploadCert from "./components/ViewUploadCert/ViewUploadCert";
import axios from "axios";

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
        <ViewHeader />
        <Routes>
          <Route path="/" element={<ViewHome />} />
          <Route path="/about" element={<ViewAbout />} />
          <Route path="/contact" element={<ViewContact />} />
          <Route path="/BlacklistUser" element={<ViewBlacklistUser />} />
          <Route path="/login" element={<ViewLogin />} />
          <Route path="/register" element={<ViewRegister />} />
          <Route path="/uploadcert" element={<ViewUploadCert />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/service-details" element={<ViewServiceDetail />} />
          <Route path="/summary" element={<ViewConfirmBooking />} />
          <Route path="/bookinghistory" element={<ViewBookingHistory />} />
          <Route path="/feedback" element={<ViewFeedback />} />
          <Route path="/editProfile" element={<ViewAccountCredential />} />
          <Route path="/cleanerstats" element={<ViewCleanerStats />} />
          <Route path="/cleanerprofile" element={<ViewCleanerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
