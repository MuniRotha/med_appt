import React from "react";
import doctors from "../../data/doctors";
import FindDoctorSearch from "../FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "../DoctorCard/DoctorCard";

// Appointment booking page: search box plus every available doctor.
function BookingConsultation() {
  return (
    <section className="page">
      <h1>Book an appointment</h1>
      <p className="muted">Search by name or speciality, then pick a date and time.</p>

      <FindDoctorSearch />

      <p className="result-count">{doctors.length} doctors available</p>
      <div className="doctor-grid">
        {doctors.map((d) => <DoctorCard key={d.id} doctor={d} />)}
      </div>
    </section>
  );
}

export default BookingConsultation;
