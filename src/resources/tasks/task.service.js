const Task = require('./task.model');
const tasksRepo = require('./task.memory.repository');

const getByBoardId = id => tasksRepo.getByBoardId(id);

const getByBoardIdAndTaskId = (boardId, taskId) =>
  tasksRepo.getByBoardIdAndTaskId(boardId, taskId);

const createTask = task => tasksRepo.createTask(new Task(task));

const updateTask = (boardId, taskId, task) =>
  tasksRepo.updateTask(boardId, taskId, task);

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

module.exports = {
  getByBoardId,
  getByBoardIdAndTaskId,
  createTask,
  updateTask,
  deleteTask
};
