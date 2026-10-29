import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import reports from "../../data/reports";

// Review form shown inside the popup.
function ReviewForm({ report, onSubmit, close }) {
  const [form, setForm] = useState({
    name: sessionStorage.getItem("name") || "",
    review: "",
    rating: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Enter your name.";
    if (form.review.trim().length < 10) err.review = "Write at least 10 characters.";
    if (!form.rating) err.rating = "Choose a rating from 1 to 5.";
    setErrors(err);
    if (Object.keys(err).length) return;

    onSubmit(report.serialNumber, form);
    close();
  };

  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate>
      <h3>Review for {report.doctorName}</h3>

      <label htmlFor={`rv-name-${report.serialNumber}`}>Name</label>
      <input id={`rv-name-${report.serialNumber}`} name="name" type="text"
        value={form.name} onChange={handleChange} />
      {errors.name && <span className="error">{errors.name}</span>}

      <label htmlFor={`rv-text-${report.serialNumber}`}>Review</label>
      <textarea id={`rv-text-${report.serialNumber}`} name="review" rows="4"
        value={form.review} onChange={handleChange} />
      {errors.review && <span className="error">{errors.review}</span>}

      <label htmlFor={`rv-rating-${report.serialNumber}`}>Rating</label>
      <select id={`rv-rating-${report.serialNumber}`} name="rating"
        value={form.rating} onChange={handleChange}>
        <option value="">Select 1 to 5</option>
        {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      {errors.rating && <span className="error">{errors.rating}</span>}

      <button type="submit" className="btn btn-solid">Submit</button>
    </form>
  );
}

// Lists past consultations. Each row opens a review popup; once a review exists
// for that report, the control is disabled and reads "Review Given".
function GiveReviews() {
  const [reviewData, setReviewData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("reviewData")) || {};
    } catch {
      return {};
    }
  });

  const saveReview = (serialNumber, review) => {
    const next = { ...reviewData, [serialNumber]: review };
    setReviewData(next);
    try {
      localStorage.setItem("reviewData", JSON.stringify(next));
    } catch { /* storage unavailable: the review still shows for this session */ }
  };

  return (
    <section className="page">
      <h1>Reviews</h1>
      <p className="muted">Tell us how each consultation went.</p>

      <div className="table-wrap">
        <table className="reviews-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>Provide Feedback</th>
              <th>Review Given</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.serialNumber}>
                <td>{report.serialNumber}</td>
                <td>{report.doctorName}</td>
                <td>{report.doctorSpeciality}</td>
                <td>
                  <Popup
                    modal
                    trigger={
                      <button
                        className="btn btn-solid"
                        disabled={!!reviewData[report.serialNumber]}
                      >
                        {reviewData[report.serialNumber] ? "Review Given" : "Click Here"}
                      </button>
                    }
                  >
                    {(close) => (
                      <ReviewForm report={report} onSubmit={saveReview} close={close} />
                    )}
                  </Popup>
                </td>
                <td>
                  {reviewData[report.serialNumber]
                    ? `${reviewData[report.serialNumber].rating} out of 5: ${reviewData[report.serialNumber].review}`
                    : "Not yet"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default GiveReviews;
