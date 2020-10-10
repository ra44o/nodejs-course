const db = require('../../common/db');

const getByBoardId = async boardId => {
  return db.tasks.filter(task => task.boardId === boardId);
};

const getByBoardIdAndTaskId = async (boardId, taskId) => {
  return db.tasks.find(task => task.boardId === boardId && task.id === taskId);
};

const createTask = async task => {
  db.tasks.push(task);
  console.log(task);
  return task;
};

const updateTask = async (boardId, taskId, task) => {
  db.tasks = db.tasks.map(t => {
    if (t.boardId === boardId && t.id === taskId) {
      // const output = {};

      // if (task.title) {
      //   output.title = task.title;
      // }
      // if (task.order) {
      //   output.order = task.order;
      // }
      // if (task.description) {
      //   output.description = task.description;
      // }
      // if (task.userId || task.userId === null) {
      //   output.userId = task.userId;
      // }
      // if (task.boardId || task.boardId === null) {
      //   output.boardId = task.boardId;
      // }
      // if (task.columnId || task.columnId === null) {
      //   output.columnId = task.columnId;
      // }

      return {
        ...t,
        ...task
      };
    }

    return t;
  });

  return db.tasks.find(t => t.id === taskId);
};

const deleteTask = async (boardId, taskId) => {
  db.tasks = db.tasks.filter(t => t.id !== taskId && t.boardId === boardId);
  return null;
};

module.exports = {
  getByBoardId,
  getByBoardIdAndTaskId,
  createTask,
  updateTask,
  deleteTask
};
