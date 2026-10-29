import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Notification from "./Components/Notification/Notification";
import LandingPage from "./Components/Landing_Page/LandingPage";
import SignUp from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import BookingConsultation from "./Components/BookingConsultation/BookingConsultation";
import InstantConsultation from "./Components/InstantConsultation/InstantConsultation";
import GiveReviews from "./Components/GiveReviews/GiveReviews";
import ProfileCard from "./Components/ProfileCard/ProfileCard";

function App() {
  return (
    <>
      <Navbar />
      {/* Rendered once at app level so notifications are visible on every page */}
      <Notification />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appointments" element={<BookingConsultation />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/reviews" element={<GiveReviews />} />
          <Route path="/profile" element={<ProfileCard />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
