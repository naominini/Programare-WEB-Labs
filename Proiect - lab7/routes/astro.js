const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const Session = require('../models/Session');
const Programare = require('../models/Programare');
const requireAdmin = require('../middleware/requireAdmin');

// GET /astro - listare + cautare + sortare
router.get('/', requireLogin, async (req, res) => {
  if (!req.session.views) req.session.views = 0;
  req.session.views++;

  const { search, sort } = req.query;
  let query = {};
  if (search) query.tip = { $regex: search, $options: 'i' };

  const sessions = await Session.find(query)
  .populate('createdBy', 'username email')
  .sort(sort ? { [sort]: 1 } : { dataAdaugata: -1 });

  res.render('astro/dashboard', {
    user: req.session.user,
    views: req.session.views,
    sessions,
    search: search || '',
    sort: sort || '',
    theme: req.session.theme || 'light'
  });
});

// GET /astro/add - formular adaugare
router.get('/add', requireAdmin, (req, res) => {
  res.render('astro/add', { 
    user: req.session.user, 
    error: null,
    theme: req.session.theme || 'light'
  });
});

// POST /astro/add - salveaza in MongoDB
router.post('/add', requireAdmin, async (req, res) => {
  try {
    const { tip, durata, pret, descriere, categorie, include } = req.body;
    const includeArray = include ? include.split(',').map(s => s.trim()).filter(Boolean) : [];
    await Session.create({ tip, durata, pret, descriere, categorie, include: includeArray, createdBy: req.session.user.id });
    res.redirect('/astro');
  } catch (err) {
    res.render('astro/add', { 
      user: req.session.user, 
      error: err.message, 
      theme: req.session.theme || 'light' 
    });
  }
});

// GET /astro/mine - programarile mele
router.get('/mine', requireLogin, async (req, res) => {
  const isAdmin = req.session.user.role === 'admin';
  
  const programari = await Programare.find(
    isAdmin ? {} : { userEmail: req.session.user.email }
  )
    .populate('sessionId')
    .sort({ data: 1 });

  res.render('astro/mine', { 
    user: req.session.user, 
    programari,
    isAdmin,
    theme: req.session.theme || 'light'
  });
});

// GET /astro/:id/book - formular programare
router.get('/:id/book', requireLogin, async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) return res.render('astro/404', { user: req.session.user, theme: req.session.theme || 'light' });
  res.render('astro/book', { 
    user: req.session.user, 
    session, 
    error: null,
    theme: req.session.theme || 'light'
  });
});

// POST /astro/:id/book - salveaza programarea
router.post('/:id/book', requireLogin, async (req, res) => {
  try {
    const { data, ora } = req.body;
    await Programare.create({
      sessionId: req.params.id,
      data,
      ora,
      userEmail: req.session.user.email
    });
    res.redirect('/astro/mine');
  } catch (err) {
    const session = await Session.findById(req.params.id);
    res.render('astro/book', { 
      user: req.session.user, 
      session, 
      error: err.message,
      theme: req.session.theme || 'light'
    });
  }
});

// POST /astro/programari/:id/delete - sterge programarea
router.post('/programari/:id/delete', requireLogin, async (req, res) => {
  await Programare.findOneAndDelete({ _id: req.params.id, userEmail: req.session.user.email });
  res.redirect('/astro/mine');
});

// GET /astro/:id/edit - formular editare
router.get('/:id/edit', requireAdmin, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.redirect('/astro');
    res.render('astro/edit', { 
      user: req.session.user, 
      session, 
      error: null,
      theme: req.session.theme || 'light'
    });
  } catch {
    res.redirect('/astro');
  }
});

// POST /astro/:id/edit - actualizeaza
router.post('/:id/edit', requireAdmin, async (req, res) => {
  try {
    const { tip, durata, pret, descriere, categorie, include } = req.body;
    const includeArray = include ? include.split(',').map(s => s.trim()).filter(Boolean) : [];
    await Session.findByIdAndUpdate(
      req.params.id, 
      { tip, durata, pret, descriere, categorie, include: includeArray }, 
      { runValidators: true, new: true }
    );
    res.redirect('/astro');
  } catch (err) {
    const session = await Session.findById(req.params.id);
    res.render('astro/edit', { 
      user: req.session.user, 
      session, 
      error: err.message,
      theme: req.session.theme || 'light'
    });
  }
});

// POST /astro/:id/delete - sterge
router.post('/:id/delete', requireAdmin, async (req, res) => {
  await Session.findByIdAndDelete(req.params.id);
  res.redirect('/astro');
});

// GET /astro/:id - detalii
router.get('/:id', requireLogin, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate('createdBy', 'username email');
    if (!session) return res.render('astro/404', { user: req.session.user, theme: req.session.theme || 'light' });
    res.render('astro/detail', { 
      user: req.session.user, 
      session,
      theme: req.session.theme || 'light'
    });
  } catch {
    res.render('astro/404', { user: req.session.user, theme: req.session.theme || 'light' });
  }
});

module.exports = router;