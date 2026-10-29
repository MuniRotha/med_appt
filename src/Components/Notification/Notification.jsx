import React, { useEffect, useState } from "react";
import { getAppointments, isLoggedIn } from "../../data/storage";

// Shows the most recent booking for logged-in users. Mounted once in App.jsx.
function Notification() {
  const [latest, setLatest] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const update = () => {
      const list = getAppointments();
      setLatest(isLoggedIn() && list.length ? list[list.length - 1] : null);
      setDismissed(false);
    };
    update();
    window.addEventListener("appointments-change", update);
    window.addEventListener("auth-change", update);
    return () => {
      window.removeEventListener("appointments-change", update);
      window.removeEventListener("auth-change", update);
    };
  }, []);

  if (!latest || dismissed) return null;

  return (
    <aside className="notification" role="status" aria-live="polite">
      <div>
        <strong>Appointment confirmed</strong>
        <p>
          {latest.doctorName} ({latest.speciality})
          {latest.date ? ` on ${latest.date} at ${latest.time}` : " - instant consultation"}
        </p>
        <p className="notification-patient">Patient: {latest.patientName} | Phone: {latest.phone}</p>
      </div>
      <button className="notification-close" onClick={() => setDismissed(true)} aria-label="Dismiss notification">
        Close
      </button>
    </aside>
  );
}

export default Notification;
