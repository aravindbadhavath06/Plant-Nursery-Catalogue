
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dataFolder = path.join(__dirname, 'data');
const usersFile = path.join(dataFolder, 'users.json');
const plantsFile = path.join(dataFolder, 'plants.json');

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

app.get('/', (req, res) => {
  res.json({ message: 'Plant Nursery Catalogue API is running 🌿' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'success', message: 'Backend connected successfully' });
});

app.get('/api/plants', (req, res) => {
  res.json(readJSON(plantsFile));
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({
      message: 'Name, email and password are required.'
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Enter a valid email address.' });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password must contain at least 6 characters.'
    });
  }

  const users = readJSON(usersFile);
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some(user => user.email === normalizedEmail)) {
    return res.status(409).json({ message: 'Email is already registered.' });
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto.scryptSync(password, salt, 64).toString('hex');

  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    salt,
    passwordHash
  };

  users.push(user);
  writeJSON(usersFile, users);

  res.status(201).json({
    message: 'Registration successful.',
    user: { id: user.id, name: user.name, email: user.email }
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    return res.status(400).json({
      message: 'Email and password are required.'
    });
  }

  const users = readJSON(usersFile);
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(item => item.email === normalizedEmail);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const suppliedHash = crypto.scryptSync(password, user.salt, 64);
  const storedHash = Buffer.from(user.passwordHash, 'hex');

  if (
    suppliedHash.length !== storedHash.length ||
    !crypto.timingSafeEqual(suppliedHash, storedHash)
  ) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  res.json({
    message: 'Login successful.',
    user: { id: user.id, name: user.name, email: user.email }
  });
});

app.listen(PORT, () => {
  console.log(`Plant Nursery API running at http://localhost:${PORT}`);
});
