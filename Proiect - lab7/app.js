require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

// View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware built-in
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

// Middleware propriu (logger)
const logger = require('./middleware/logger');
app.use(logger);

// Rute
const authRoutes = require('./routes/auth');
const astroRoutes = require('./routes/astro');

app.use('/', authRoutes);
app.use('/astro', astroRoutes);

// Pornire server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server pornit pe http://localhost:${PORT}`));