const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const { toResponse } = require('./task.model');

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await tasksService.getByBoardId(req.params.boardId);
    res.status(200).send(tasks.map(toResponse));
  } catch (error) {
    return next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await tasksService.createTask({
      ...req.body,
      boardId: req.params.boardId
    });
    res.status(200).send(toResponse(task));
  } catch (error) {
    return next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await tasksService.getByBoardIdAndTaskId(
      req.params.boardId,
      req.params.taskId
    );
    if (task) {
      res.status(200).send(toResponse(task));
    } else {
      res.status(404).send(task);
    }
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await tasksService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    res.status(200).send(toResponse(task));
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await tasksService.deleteTask(
      req.params.boardId,
      req.params.taskId
    );
    res.status(200).send(task);
  } catch (error) {
    return next(error);
  }
};

router.route('/').get(getAllTasks);
router.route('/').post(createTask);
router.route('/:taskId').get(getTaskById);
router.route('/:taskId').put(updateTask);
router.route('/:taskId').delete(deleteTask);

module.exports = router;
