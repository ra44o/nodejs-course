const db = require('../../common/db');

const getAll = async () => {
  return db.users;
};

const getById = async id => {
  return db.users.find(user => user.id === id);
};

const createUser = async user => {
  db.users.push(user);

  return user;
};

const updateUser = async (userId, userBody) => {
  db.users = db.users.map(user => {
    if (user.id === userId) {
      return {
        ...user,
        ...userBody
      };
    }
    return user;
  });

  return db.users.find(user => user.id === userId);
};

const deleteUser = async userId => {
  db.users = db.users.filter(user => user.id !== userId);
  db.tasks = db.tasks.map(t => {
    if (t.userId === userId) {
      return {
        ...t,
        userId: null
      };
    }
    return t;
  });

  return null;
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser
};
