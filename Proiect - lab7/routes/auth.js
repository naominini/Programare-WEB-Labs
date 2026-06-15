const express = require('express');
const router = express.Router();
const users = require('../db/users');

// GET /
router.get('/', (req, res) => {
  res.render('home', { user: req.session.user || null, theme: res.locals.theme });
});

// GET /register
router.get('/register', (req, res) => {
  res.render('register', { error: null, theme: res.locals.theme });
});

// POST /register
router.post('/register', (req, res) => {  
  const { email, password, nume } = req.body;

  if (users.findByEmail(email)) {
   return res.render('register', { error: 'Email deja folosit!', theme: res.locals.theme });
  }

  users.add({ email, password, nume });
  req.session.user = { email, nume };
  res.redirect('/astro');
});

// GET /login
router.get('/login', (req, res) => {
  res.render('login', { error: null, theme: res.locals.theme });
});

// POST /login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.findByEmail(email);

  if (!user || user.password !== password) {
    return res.render('login', { error: 'Email sau parolă greșită!', theme: res.locals.theme });
  }

  req.session.user = { email: user.email, nume: user.nume };
  res.redirect('/astro');
});

// GET /logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;