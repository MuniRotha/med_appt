import React, { useState } from "react";

// Review form. After a successful submit the form is disabled and the saved review is shown.
function GiveReviews() {
  const [form, setForm] = useState({
    name: sessionStorage.getItem("name") || "",
    review: "",
    rating: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitted) return;

    const err = {};
    if (!form.name.trim()) err.name = "Enter your name.";
    if (form.review.trim().length < 10) err.review = "Write at least 10 characters.";
    if (!form.rating) err.rating = "Choose a rating.";
    setErrors(err);
    if (Object.keys(err).length) return;

    try {
      const saved = JSON.parse(localStorage.getItem("reviews")) || [];
      localStorage.setItem("reviews", JSON.stringify([...saved, { ...form, date: new Date().toISOString() }]));
    } catch { /* storage unavailable: still show the confirmation */ }
    setSubmitted(true);
  };

  return (
    <section className="form-page">
      <form className="card form-card" onSubmit={handleSubmit} noValidate>
        <h1>Give a review</h1>
        <p className="muted">Tell us how your consultation went.</p>

        <label htmlFor="review-name">Name</label>
        <input id="review-name" name="name" type="text" value={form.name}
          onChange={handleChange} disabled={submitted} />
        {errors.name && <span className="error">{errors.name}</span>}

        <label htmlFor="review-text">Review</label>
        <textarea id="review-text" name="review" rows="4" value={form.review}
          onChange={handleChange} disabled={submitted} />
        {errors.review && <span className="error">{errors.review}</span>}

        <label htmlFor="review-rating">Rating</label>
        <select id="review-rating" name="rating" value={form.rating}
          onChange={handleChange} disabled={submitted}>
          <option value="">Select a rating</option>
          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} out of 5</option>)}
        </select>
        {errors.rating && <span className="error">{errors.rating}</span>}

        <button type="submit" className="btn btn-solid" disabled={submitted}>
          {submitted ? "Review submitted" : "Submit review"}
        </button>

        {submitted && (
          <p className="success" role="status">
            Thank you, {form.name}. Your {form.rating}-star review has been saved.
          </p>
        )}
      </form>
    </section>
  );
}

export default GiveReviews;
