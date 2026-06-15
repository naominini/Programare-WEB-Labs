require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Session = require('./models/Session');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Conectat la MongoDB');

  // Sterge datele existente
  await User.deleteMany({});
  await Session.deleteMany({});
  console.log('Date sterse');

  // Creeaza useri
  const admin = await User.create({
    username: 'admin',
    email: 'naonatalia25@gmail.com',
    password: 'Test123Naomi.',
    role: 'admin'
  });

  const user = await User.create({
    username: 'nao',
    email: 'fnaomi2003@gmail.com',
    password: 'Test123Naomi.',
    role: 'user'
  });

  // Creeaza sesiuni
  await Session.create([
    {
      tip: 'Natal Chart Reading',
      durata: '60 min',
      pret: 150,
      categorie: 'natal',
      descriere: 'O analiză completă a hărții natale — personalitate, puncte forte și drumul vieții.',
      include: ['Analiza Soarelui, Lunii și Ascendentului', 'Carieră și ambiții', 'Relații și compatibilitate'],
      createdBy: admin._id
    },
    {
      tip: 'Transit Reading',
      durata: '45 min',
      pret: 100,
      categorie: 'tranzit',
      descriere: 'Aflați ce înseamnă mișcările planetare actuale pentru viața voastră.',
      include: ['Tranzite majore actuale', 'Oportunități și provocări', 'Timing pentru decizii importante'],
      createdBy: admin._id
    },
    {
      tip: 'Relationship Synastry',
      durata: '90 min',
      pret: 200,
      categorie: 'compatibilitate',
      descriere: 'Compatibilitatea dintre două hărți natale — ideal pentru cupluri sau parteneri.',
      include: ['Analiza compatibilității', 'Puncte de armonie și tensiune', 'Cum să navigați diferențele'],
      createdBy: admin._id
    },
    {
      tip: 'Consultație Generală',
      durata: '30 min',
      pret: 75,
      categorie: 'general',
      descriere: 'O introducere în astrologie și ce pot face stelele pentru tine.',
      include: ['Introducere în harta natală', 'Întrebări și răspunsuri'],
      createdBy: admin._id
    },
    {
      tip: 'Solar Return Reading',
      durata: '60 min',
      pret: 120,
      categorie: 'tranzit',
      descriere: 'Analiza anului tău astral — ce te așteaptă în următoarele 12 luni.',
      include: ['Tema anului solar', 'Oportunități majore', 'Provocări de depășit'],
      createdBy: admin._id
    }
  ]);

  console.log('Seed complet!');
  console.log('Admin: naonatalia25@gmail.com / Test123Naomi.');
  console.log('User: fnaomi2003@gmail.com / Test123Naomi.');
  mongoose.disconnect();
}).catch(err => {
  console.error('Eroare:', err);
  mongoose.disconnect();
});