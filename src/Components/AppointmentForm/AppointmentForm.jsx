import React, { useState } from "react";

// Full booking form: Name, Phone Number, Date and Time.
function AppointmentForm({ doctorName, speciality, onSubmit }) {
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [phoneNumber, setPhoneNumber] = useState(sessionStorage.getItem("phone") || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!name.trim()) err.name = "Enter the patient name.";
    if (!/^\d{10}$/.test(phoneNumber)) err.phoneNumber = "Phone number must be 10 digits.";
    if (!date) err.date = "Choose a date.";
    else if (date < today) err.date = "Date cannot be in the past.";
    if (!time) err.time = "Choose a time.";
    setErrors(err);
    if (Object.keys(err).length) return;

    onSubmit({ patientName: name.trim(), phone: phoneNumber, date, time });
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit} noValidate>
      <h3>Book with {doctorName}</h3>
      <p className="muted">{speciality}</p>

      <label htmlFor={`name-${doctorName}`}>Name</label>
      <input id={`name-${doctorName}`} type="text" value={name} onChange={(e) => setName(e.target.value)} />
      {errors.name && <span className="error">{errors.name}</span>}

      <label htmlFor={`phone-${doctorName}`}>Phone Number</label>
      <input id={`phone-${doctorName}`} type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

      <label htmlFor={`date-${doctorName}`}>Date of appointment</label>
      <input id={`date-${doctorName}`} type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
      {errors.date && <span className="error">{errors.date}</span>}

      <label htmlFor={`time-${doctorName}`}>Time slot</label>
      <select id={`time-${doctorName}`} value={time} onChange={(e) => setTime(e.target.value)}>
        <option value="">Select a time</option>
        {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      {errors.time && <span className="error">{errors.time}</span>}

      <button type="submit" className="btn btn-solid">Book appointment</button>
    </form>
  );
}

export default AppointmentForm;
