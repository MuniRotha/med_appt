import React from "react";
import doctors from "../../data/doctors";
import DoctorCard from "../DoctorCard/DoctorCard";

function InstantConsultation() {
  return (
    <section className="page">
      <h1>Instant consultation</h1>
      <p className="muted">Share your name and phone number and a doctor will call you back.</p>
      <div className="doctor-grid">
        {doctors.slice(0, 4).map((d) => <DoctorCard key={d.id} doctor={d} instant />)}
      </div>
    </section>
  );
}

export default InstantConsultation;
