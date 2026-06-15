const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// GET /
router.get('/', (req, res) => {
  res.render('home', { user: req.session.user || null, theme: res.locals.theme });
});

// GET /register
router.get('/register', (req, res) => {
  res.render('register', { error: null, theme: res.locals.theme });
});

// POST /register
router.post('/register', async (req, res) => {
  const { email, password, nume } = req.body;

  try {
    const user = new User({ username: nume, email, password });
    await user.save();

    req.session.user = { id: user._id, email: user.email, nume: user.username, role: user.role };
    res.redirect('/astro');
  } catch (err) {
    if (err.code === 11000) {
      const camp = Object.keys(err.keyValue)[0];
      return res.render('register', { error: `${camp} deja folosit!`, theme: res.locals.theme });
    }
    res.render('register', { error: 'Eroare la înregistrare!', theme: res.locals.theme });
  }
});

// GET /login
router.get('/login', (req, res) => {
  res.render('login', { error: null, theme: res.locals.theme });
});

// POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'Email sau parolă greșită!', theme: res.locals.theme });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('login', { error: 'Email sau parolă greșită!', theme: res.locals.theme });
    }

    req.session.user = { id: user._id, email: user.email, nume: user.username, role: user.role };
    res.redirect('/astro');
  } catch (err) {
    res.render('login', { error: 'Eroare la autentificare!', theme: res.locals.theme });
  }
});

// GET /logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;