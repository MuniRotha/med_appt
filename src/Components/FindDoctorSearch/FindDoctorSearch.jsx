import React, { useEffect, useState } from "react";

// Search box for the Appointment Booking page.
// Filters doctors by name or speciality and reports the matches to the parent.
function FindDoctorSearch({ doctors, onResults }) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const specialities = [...new Set(doctors.map((d) => d.speciality))];
  const suggestions = specialities.filter((s) =>
    s.toLowerCase().includes(query.trim().toLowerCase())
  );

  useEffect(() => {
    const q = query.trim().toLowerCase();
    const matches = q
      ? doctors.filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.speciality.toLowerCase().includes(q)
        )
      : doctors;
    onResults(matches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, doctors]);

  const pick = (speciality) => {
    setQuery(speciality);
    setShowSuggestions(false);
  };

  return (
    <div className="search">
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
        {query && (
          <button type="button" className="btn btn-outline" onClick={() => setQuery("")}>Clear</button>
        )}
      </div>

      {showSuggestions && query && suggestions.length > 0 && (
        <ul className="suggestions" role="listbox">
          {suggestions.map((s) => (
            <li key={s} role="option" aria-selected="false" onMouseDown={() => pick(s)}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FindDoctorSearch;
