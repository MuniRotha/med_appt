import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import AppointmentFormIC from "../AppointmentFormIC/AppointmentFormIC";
import { addAppointment, getAppointments, removeAppointment, isLoggedIn } from "../../data/storage";

// One doctor, with book and cancel actions.
// `instant` switches the booking form to the Name + Phone version.
function DoctorCard({ doctor, instant = false }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const sync = () =>
      setAppointment(getAppointments().find((a) => a.doctorId === doctor.id) || null);
    sync();
    window.addEventListener("appointments-change", sync);
    return () => window.removeEventListener("appointments-change", sync);
  }, [doctor.id]);

  const handleBook = (details) => {
    addAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      speciality: doctor.speciality,
      ...details,
    });
    setShowForm(false);
  };

  // Cancel appointment: remove this doctor's booking and notify the app.
  const handleCancel = () => {
    removeAppointment(doctor.id);
    setAppointment(null);
  };

  const openForm = () => {
    if (!isLoggedIn()) return navigate("/login");
    setShowForm(true);
  };

  return (
    <article className="card doctor-card">
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <p>{doctor.speciality}</p>
        <p className="muted">{doctor.experience} years of experience | Rating {doctor.rating}/5</p>
      </div>

      {appointment ? (
        <div className="booked">
          <p>
            <strong>Booked</strong>
            {appointment.date ? `: ${appointment.date} at ${appointment.time}` : ": instant consultation"}
          </p>
          <p className="muted">Patient: {appointment.patientName} | {appointment.phone}</p>
          <button className="btn btn-danger" onClick={handleCancel}>Cancel Appointment</button>
        </div>
      ) : showForm ? (
        <>
          {instant ? (
            <AppointmentFormIC doctorName={doctor.name} onSubmit={handleBook} />
          ) : (
            <AppointmentForm doctorName={doctor.name} speciality={doctor.speciality} onSubmit={handleBook} />
          )}
          <button className="btn btn-outline" onClick={() => setShowForm(false)}>Close form</button>
        </>
      ) : (
        <button className="btn btn-solid" onClick={openForm}>
          {instant ? "Consult now" : "Book Appointment"}
        </button>
      )}
    </article>
  );
}

export default DoctorCard;
