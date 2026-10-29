import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import doctors from "../../data/doctors";
import FindDoctorSearch from "../FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "../DoctorCard/DoctorCard";

// Search results route: /search-results?search=<name or speciality>
function SearchResults() {
  const [params] = useSearchParams();
  const term = (params.get("search") || "").trim();
  const q = term.toLowerCase();

  const results = doctors.filter(
    (d) => d.name.toLowerCase().includes(q) || d.speciality.toLowerCase().includes(q)
  );

  return (
    <section className="page">
      <h1>Search results</h1>
      <FindDoctorSearch key={term} initialQuery={term} />

      <p className="result-count">
        {results.length} doctor{results.length === 1 ? "" : "s"} found for "{term}"
      </p>
      <div className="doctor-grid">
        {results.map((d) => <DoctorCard key={d.id} doctor={d} />)}
      </div>
      {results.length === 0 && (
        <p className="empty">
          No doctors match that search. Try Pediatrician or Dentist, or{" "}
          <Link to="/appointments">see all doctors</Link>.
        </p>
      )}
    </section>
  );
}

export default SearchResults;
