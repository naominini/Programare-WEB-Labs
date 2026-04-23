const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const sessions = require('../db/sessions');

// GET /astro - pagina protejata principala
router.get('/', requireLogin, (req, res) => {
  if (!req.session.views) req.session.views = 0;
  req.session.views++;

  if (!req.cookies.theme) {
    res.cookie('theme', 'light', { maxAge: 900000 });
  }
  const theme = req.cookies.theme || 'light';

  res.render('astro/dashboard', {
    user: req.session.user,
    views: req.session.views,
    sessions: sessions.getAll(),
    theme
  });
});

// GET /astro/theme/:val
router.get('/theme/:val', requireLogin, (req, res) => {
  res.cookie('theme', req.params.val, { maxAge: 900000 });
  res.redirect('/astro');
});

// GET /astro/:id - detaliu consultatie
router.get('/:id', requireLogin, (req, res) => {
  const session = sessions.findById(req.params.id);

  if (!session) {
    return res.redirect('/astro');
  }

  res.render('astro/detail', {
    user: req.session.user,
    session
  });
});

module.exports = router;