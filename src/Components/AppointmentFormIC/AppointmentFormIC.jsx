import React, { useState } from "react";

// Instant consultation form: Name and Phone Number only.
function AppointmentFormIC({ doctorName, onSubmit }) {
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [phoneNumber, setPhoneNumber] = useState(sessionStorage.getItem("phone") || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!name.trim()) err.name = "Enter the patient name.";
    if (!/^\d{10}$/.test(phoneNumber)) err.phoneNumber = "Phone number must be 10 digits.";
    setErrors(err);
    if (Object.keys(err).length) return;

    onSubmit({ patientName: name.trim(), phone: phoneNumber });
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit} noValidate>
      <h3>See {doctorName} now</h3>

      <label htmlFor={`ic-name-${doctorName}`}>Name</label>
      <input id={`ic-name-${doctorName}`} type="text" value={name} onChange={(e) => setName(e.target.value)} />
      {errors.name && <span className="error">{errors.name}</span>}

      <label htmlFor={`ic-phone-${doctorName}`}>Phone Number</label>
      <input id={`ic-phone-${doctorName}`} type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

      <button type="submit" className="btn btn-solid">Start consultation</button>
    </form>
  );
}

export default AppointmentFormIC;
