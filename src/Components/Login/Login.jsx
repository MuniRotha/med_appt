import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Calls the login API to authenticate the user.
  const login = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    if (!password) return setError("Enter your password.");

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);
        if (json.user) {
          sessionStorage.setItem("name", json.user.name);
          sessionStorage.setItem("phone", json.user.phone);
          sessionStorage.setItem("role", json.user.role);
        }
        window.dispatchEvent(new Event("auth-change"));
        navigate("/");
      } else {
        setError(json.error || "Login failed. Check your email and password.");
      }
    } catch {
      setError("Could not reach the server. Check your connection and retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-page">
      <form className="card form-card" onSubmit={login} noValidate>
        <h1>Welcome back</h1>
        <p className="muted">New to StayHealthy? <Link to="/signup">Create an account</Link></p>

        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com" autoComplete="email" />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password" autoComplete="current-password" />

        {error && <p className="error banner-error" role="alert">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="btn btn-solid" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
          <button type="button" className="btn btn-outline"
            onClick={() => { setEmail(""); setPassword(""); setError(""); }}>
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
