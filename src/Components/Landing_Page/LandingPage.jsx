import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>StayHealthy</h1>
          <p className="tagline">Your health, anytime, anywhere. Talk to a doctor online, even when the nearest clinic is hours away.</p>
          <div className="hero-actions">
            <Link to="/appointments" className="btn btn-solid btn-lg">Book an appointment</Link>
            <Link to="/instant-consultation" className="btn btn-outline btn-lg">See a doctor now</Link>
          </div>
        </div>
      </section>

      <section className="info-row">
        <div>
          <h2>Built for remote communities</h2>
          <p>StayHealthy is a non-profit platform that brings medical services to areas with limited healthcare infrastructure.</p>
        </div>
        <div>
          <h2>Simple on any device</h2>
          <p>Large buttons, clear forms and a layout that works on a basic phone as well as a laptop.</p>
        </div>
        <div>
          <h2>Book or cancel in seconds</h2>
          <p>Pick a doctor, choose a time, and cancel from the same card if plans change.</p>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
