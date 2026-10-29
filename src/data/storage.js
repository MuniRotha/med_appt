// Small helpers for appointments, kept in localStorage.
const KEY = "appointments";

export const getAppointments = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

const save = (list) => {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("appointments-change"));
};

export const addAppointment = (appointment) =>
  save([...getAppointments().filter((a) => a.doctorId !== appointment.doctorId), appointment]);

export const removeAppointment = (doctorId) =>
  save(getAppointments().filter((a) => a.doctorId !== doctorId));

export const clearAppointments = () => save([]);

export const isLoggedIn = () => Boolean(sessionStorage.getItem("auth-token"));
