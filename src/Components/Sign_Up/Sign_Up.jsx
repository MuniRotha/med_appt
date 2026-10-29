import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

function Sign_Up() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ role: "", name: "", phone: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.role) e.role = "Choose a role.";
    if (!/^[A-Za-z][A-Za-z\s.'-]+$/.test(form.name.trim())) e.name = "Enter your full name (letters only).";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Phone number must be 10 digits.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.password.length < 6) e.password = "Password needs at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Calls the registration API to create a new user.
  const register = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await response.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", form.name);
        sessionStorage.setItem("phone", form.phone);
        sessionStorage.setItem("email", form.email);
        sessionStorage.setItem("role", form.role);
        window.dispatchEvent(new Event("auth-change"));
        navigate("/");
      } else {
        setServerError(json.error || "Registration failed. Please try again.");
      }
    } catch {
      setServerError("Could not reach the server. Check your connection and retry.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm({ role: "", name: "", phone: "", email: "", password: "" });
    setErrors({});
    setServerError("");
  };

  return (
    <section className="form-page">
      <form className="card form-card" onSubmit={register} noValidate>
        <h1>Create your account</h1>
        <p className="muted">Already a member? <Link to="/login">Log in</Link></p>

        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={form.role} onChange={handleChange}>
          <option value="">Select a role</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        {errors.role && <span className="error">{errors.role}</span>}

        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleChange}
          placeholder="Full name" autoComplete="name" />
        {errors.name && <span className="error">{errors.name}</span>}

        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
          placeholder="10-digit phone number" autoComplete="tel" />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
          placeholder="you@example.com" autoComplete="email" />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={handleChange}
          placeholder="At least 6 characters" autoComplete="new-password" />
        {errors.password && <span className="error">{errors.password}</span>}

        {serverError && <p className="error banner-error" role="alert">{serverError}</p>}

        <div className="form-actions">
          <button type="submit" className="btn btn-solid" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
          <button type="button" className="btn btn-outline" onClick={reset}>Reset</button>
        </div>
      </form>
    </section>
  );
}

export default Sign_Up;
