import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import doctors from "../../data/doctors";

// Doctor search for the Appointment Booking page.
// Typing shows matching specialities; choosing one (or pressing Search)
// navigates to the search results route.
function FindDoctorSearch({ initialQuery = "" }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const specialities = [...new Set(doctors.map((d) => d.speciality))];
  const suggestions = specialities.filter((s) =>
    s.toLowerCase().includes(query.trim().toLowerCase())
  );

  const goToResults = (value) => {
    const term = value.trim();
    if (!term) return navigate("/appointments");
    setQuery(term);
    setShowSuggestions(false);
    navigate(`/search-results?search=${encodeURIComponent(term)}`);
  };

  return (
    <form
      className="search"
      onSubmit={(e) => { e.preventDefault(); goToResults(query); }}
      role="search"
    >
      <label htmlFor="doctor-search">Find a doctor by name or speciality</label>
      <div className="search-box">
        <input
          id="doctor-search"
          type="search"
          value={query}
          placeholder="e.g. Pediatrician"
          autoComplete="off"
          onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />
        <button type="submit" className="btn btn-solid">Search</button>
      </div>

      {showSuggestions && query && suggestions.length > 0 && (
        <ul className="suggestions" role="listbox">
          {suggestions.map((s) => (
            <li key={s} role="option" aria-selected="false" onMouseDown={() => goToResults(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default FindDoctorSearch;
