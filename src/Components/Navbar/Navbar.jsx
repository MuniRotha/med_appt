import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearAppointments } from "../../data/storage";

function Navbar() {
  const navigate = useNavigate();
  const [name, setName] = useState(sessionStorage.getItem("name"));
  const [menuOpen, setMenuOpen] = useState(false);

  // Keep the navbar in sync when login, logout or profile edits happen elsewhere.
  useEffect(() => {
    const sync = () => setName(sessionStorage.getItem("name"));
    window.addEventListener("auth-change", sync);
    return () => window.removeEventListener("auth-change", sync);
  }, []);

  // Logout: clear the session and any stored bookings, then return home.
  const handleLogout = () => {
    sessionStorage.clear();
    clearAppointments();
    setName(null);
    setMenuOpen(false);
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  const firstName = name ? name.split(" ")[0] : "";

  return (
    <header className="navbar">
      <Link to="/" className="brand" aria-label="StayHealthy home">
        <span className="brand-mark" aria-hidden="true">+</span>
        StayHealthy
      </Link>

      <button
        className="nav-toggle"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        Menu
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/appointments" onClick={() => setMenuOpen(false)}>Appointments</Link>
        <Link to="/instant-consultation" onClick={() => setMenuOpen(false)}>Instant Consultation</Link>
        <Link to="/reviews" onClick={() => setMenuOpen(false)}>Reviews</Link>

        {name ? (
          <>
            <Link to="/profile" className="nav-user" onClick={() => setMenuOpen(false)}>
              Hi, {firstName}
            </Link>
            <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="btn btn-solid" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            <Link to="/login" className="btn btn-outline" onClick={() => setMenuOpen(false)}>Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
