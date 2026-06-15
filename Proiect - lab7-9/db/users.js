const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../users.json');

const getAll = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const save = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

module.exports = {
  getAll,
  findByEmail: (email) => getAll().find(u => u.email === email),
  add: (user) => {
    const users = getAll();
    users.push(user);
    save(users);
  }
};  