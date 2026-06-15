const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectat la MongoDB Atlas');
  } catch (err) {
    console.error('Eroare conexiune MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connect;