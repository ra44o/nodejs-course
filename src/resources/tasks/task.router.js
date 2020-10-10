const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getByBoardId(req.params.boardId);
  res.status(200).send(tasks.map(Task.toResponse));
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.createTask({
    ...req.body,
    boardId: req.params.boardId
  });
  res.status(200).send(Task.toResponse(task));
});

router.route('/:taskId').get(async (req, res) => {
  console.log(req.params.boardId, req.params.taskId);
  const task = await tasksService.getByBoardIdAndTaskId(
    req.params.boardId,
    req.params.taskId
  );
  if (task) {
    res.status(200).send(Task.toResponse(task));
  } else {
    res.send(404).send(task);
  }
});

router.route('/:taskId').put(async (req, res) => {
  const task = await tasksService.updateTask(
    req.params.boardId,
    req.params.taskId,
    req.body
  );
  res.status(200).send(Task.toResponse(task));
});

router.route('/:taskId').delete(async (req, res) => {
  const task = await tasksService.deleteTask(
    req.params.boardId,
    req.params.taskId
  );
  res.status(200).send(task);
});

module.exports = router;
