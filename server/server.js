// Minimal auth API for StayHealthy. Users are stored in server/users.json.
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8181;
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-production";
const DB_FILE = path.join(__dirname, "users.json");

const readUsers = () => (fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE, "utf8")) : []);
const writeUsers = (u) => fs.writeFileSync(DB_FILE, JSON.stringify(u, null, 2));
const sign = (user) => jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: "2h" });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/auth/register", async (req, res) => {
  const { role, name, phone, email, password } = req.body || {};
  if (!role || !name || !phone || !email || !password)
    return res.status(400).json({ error: "role, name, phone, email and password are required." });

  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
    return res.status(409).json({ error: "An account with this email already exists." });

  const user = {
    id: Date.now().toString(36),
    role, name, phone, email,
    password: await bcrypt.hash(password, 10),
  };
  writeUsers([...users, user]);
  res.status(201).json({ authtoken: sign(user) });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "email and password are required." });

  const user = readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid email or password." });

  res.json({
    authtoken: sign(user),
    user: { name: user.name, phone: user.phone, role: user.role },
  });
});

app.listen(PORT, () => console.log(`StayHealthy API listening on http://localhost:${PORT}`));
