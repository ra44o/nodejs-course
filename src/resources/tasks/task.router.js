const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.model');

const { logger } = require('../../common/logger/logger');

const getAllTasks = async (req, res) => {
  const tasks = await tasksService.getByBoardId(req.params.boardId);
  res.status(200).send(tasks.map(Task.toResponse));
};

const createTask = async (req, res) => {
  const task = await tasksService.createTask({
    ...req.body,
    boardId: req.params.boardId
  });
  res.status(200).send(Task.toResponse(task));
};

const getTaskById = async (req, res) => {
  const task = await tasksService.getByBoardIdAndTaskId(
    req.params.boardId,
    req.params.taskId
  );
  if (task) {
    res.status(200).send(Task.toResponse(task));
  } else {
    res.send(404).send(task);
  }
};

const updateTask = async (req, res) => {
  const task = await tasksService.updateTask(
    req.params.boardId,
    req.params.taskId,
    req.body
  );
  res.status(200).send(Task.toResponse(task));
};

const deleteTask = async (req, res) => {
  const task = await tasksService.deleteTask(
    req.params.boardId,
    req.params.taskId
  );
  res.status(200).send(task);
};

router.route('/').get(logger, getAllTasks);
router.route('/').post(logger, createTask);
router.route('/:taskId').get(logger, getTaskById);
router.route('/:taskId').put(logger, updateTask);
router.route('/:taskId').delete(logger, deleteTask);

module.exports = router;
