import React, { useState } from "react";
import { Link } from "react-router-dom";

const read = () => ({
  name: sessionStorage.getItem("name") || "",
  email: sessionStorage.getItem("email") || "",
  phone: sessionStorage.getItem("phone") || "",
  role: sessionStorage.getItem("role") || "",
});

// Profile card with an edit form.
function ProfileCard() {
  const [profile, setProfile] = useState(read());
  const [draft, setDraft] = useState(profile);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  if (!sessionStorage.getItem("auth-token")) {
    return (
      <section className="form-page">
        <div className="card form-card">
          <h1>Your profile</h1>
          <p>Log in to see your profile.</p>
          <Link to="/login" className="btn btn-solid">Log in</Link>
        </div>
      </section>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    const err = {};
    if (!draft.name.trim()) err.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(draft.email)) err.email = "Enter a valid email address.";
    if (!/^\d{10}$/.test(draft.phone)) err.phone = "Phone number must be 10 digits.";
    setErrors(err);
    if (Object.keys(err).length) return;

    ["name", "email", "phone"].forEach((k) => sessionStorage.setItem(k, draft[k].trim()));
    setProfile(read());
    window.dispatchEvent(new Event("auth-change"));
    setEditing(false);
    setSaved(true);
  };

  return (
    <section className="form-page">
      <div className="card form-card">
        <h1>Your profile</h1>

        {!editing ? (
          <>
            <dl className="profile-list">
              <dt>Name</dt><dd>{profile.name}</dd>
              <dt>Email</dt><dd>{profile.email}</dd>
              <dt>Phone</dt><dd>{profile.phone}</dd>
              <dt>Role</dt><dd>{profile.role}</dd>
            </dl>
            {saved && <p className="success" role="status">Profile updated.</p>}
            <button className="btn btn-solid" onClick={() => { setDraft(profile); setEditing(true); setSaved(false); }}>
              Edit profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSave} noValidate>
            <label htmlFor="p-name">Name</label>
            <input id="p-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            {errors.name && <span className="error">{errors.name}</span>}

            <label htmlFor="p-email">Email</label>
            <input id="p-email" type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
            {errors.email && <span className="error">{errors.email}</span>}

            <label htmlFor="p-phone">Phone</label>
            <input id="p-phone" type="tel" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
            {errors.phone && <span className="error">{errors.phone}</span>}

            <div className="form-actions">
              <button type="submit" className="btn btn-solid">Save changes</button>
              <button type="button" className="btn btn-outline" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default ProfileCard;
