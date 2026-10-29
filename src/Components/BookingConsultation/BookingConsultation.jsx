import React, { useState } from "react";
import doctors from "../../data/doctors";
import FindDoctorSearch from "../FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "../DoctorCard/DoctorCard";

// Appointment booking page: search plus a list of doctor cards.
function BookingConsultation() {
  const [results, setResults] = useState(doctors);

  return (
    <section className="page">
      <h1>Book an appointment</h1>
      <p className="muted">Search by name or speciality, then pick a date and time.</p>

      <FindDoctorSearch doctors={doctors} onResults={setResults} />

      <p className="result-count">{results.length} doctor{results.length === 1 ? "" : "s"} found</p>
      <div className="doctor-grid">
        {results.map((d) => <DoctorCard key={d.id} doctor={d} />)}
      </div>
      {results.length === 0 && (
        <p className="empty">No doctors match that search. Try a speciality such as Pediatrician or Dentist.</p>
      )}
    </section>
  );
}

export default BookingConsultation;
