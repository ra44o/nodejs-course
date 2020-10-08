const fs = require('fs');
const path = require('path');
const { start } = require('repl');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'users.db.json'), 'utf-8'));
};

const getById = async (id) => {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'users.db.json'), 'utf-8'))
    .filter(user => user.id === id);
}

const createUser = async (user) => {
  const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'users.db.json'), 'utf-8'));
  users.push(user);
  fs.writeFileSync(path.resolve(__dirname, 'users.db.json'), JSON.stringify(users), { encoding: 'utf-8' });

  return user;
}

const updateUser = async (userId, userBody) => {
  const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'users.db.json'), 'utf-8'))
    .map(user => {
      if (user.id === userId) {
        return {
          ...user,
          ...userBody,
        };
      }
      return user;
    });
  fs.writeFileSync(path.resolve(__dirname, 'users.db.json'), JSON.stringify(users), { encoding: 'utf-8' });
  
  return users.find(user => user.id === userId);
}

const deleteUser = async (userId) => {
  const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'users.db.json'), 'utf-8'))
    .filter(user => user.id !== userId);
  fs.writeFileSync(path.resolve(__dirname, 'users.db.json'), JSON.stringify(users), { encoding: 'utf-8' });

  return null;
}

module.exports = { 
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser,
};
