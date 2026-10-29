# StayHealthy

StayHealthy is a non-profit healthcare platform from the **Go Digital** initiative. It helps patients in remote and underserved areas connect with doctors online, anytime and from anywhere.

This repository contains the React front-end, a small Express API for registration and login, and the project deliverables.

## Features

- Sign up and log in (patient or doctor roles) with form validation
- Logout from the navigation bar
- Find a doctor by name or speciality, then book or cancel an appointment
- Instant consultation with name and phone number only
- Review form that locks after submission
- Profile card with an edit form
- App-wide notification for confirmed bookings
- Responsive layout and SEO meta tags

## Project structure

```
public/index.html                 SEO meta tags
src/App.jsx                       Routes and the app-wide Notification
src/Components/
  Navbar/Navbar.jsx               Navigation and logout
  Sign_Up/Sign_Up.jsx             Registration form and API call
  Login/Login.jsx                 Login form and API call
  FindDoctorSearch/               Doctor search
  BookingConsultation/            Appointment booking page
  DoctorCard/DoctorCard.jsx       Book and cancel appointment
  AppointmentForm/                Name, phone, date, time
  AppointmentFormIC/              Name and phone only
  GiveReviews/GiveReviews.jsx     Review form
  ProfileCard/ProfileCard.jsx     Profile and edit form
  Notification/Notification.jsx   Booking notification
server/server.js                  Register and login API
docs/                             build, register, login, patient_report.pdf
screenshots/                      Design and launch screenshots
```

## Setup

Requirements: Node.js 18 or later and npm.

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/StayHealthy.git
   cd StayHealthy
   ```
2. Install front-end dependencies
   ```bash
   npm install
   ```
3. Install and start the API (port 8181)
   ```bash
   cd server
   npm install
   npm start
   ```
4. In a second terminal, start the front-end from the project root
   ```bash
   npm start
   ```
   The app opens at http://localhost:3000.

If your API runs elsewhere, copy `.env.example` to `.env` and set `REACT_APP_API_URL`.

## Production build

```bash
npm run build
```

The optimized files are written to the `build/` folder, ready to deploy to any static host (Netlify, Vercel, GitHub Pages and similar). The API must be hosted separately and `REACT_APP_API_URL` set at build time.

## Test the API with cURL

```bash
curl -X POST http://localhost:8181/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"role":"patient","name":"Test User","phone":"1234567890","email":"test@example.com","password":"Test@1234"}'

curl -X POST http://localhost:8181/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@1234"}'
```

Sample output is saved in `docs/register` and `docs/login`.

## Tech stack

React 18, React Router 6, HTML, CSS, Express, Figma (UI design).
