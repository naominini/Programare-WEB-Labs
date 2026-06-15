const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const sessions = require('../db/sessions');

// GET /astro - pagina protejata principala
router.get('/', requireLogin, (req, res) => {
  if (!req.session.views) req.session.views = 0;
  req.session.views++;


  res.render('astro/dashboard', {
    user: req.session.user,
    views: req.session.views,
    sessions: sessions.getAll(),
    theme: res.locals.theme
  });
});

// GET /astro/theme/:val
router.get('/theme/:val', requireLogin, (req, res) => {
  res.cookie('theme', req.params.val, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 zile
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