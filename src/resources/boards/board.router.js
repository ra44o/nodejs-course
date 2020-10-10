const router = require('express').Router();
const boardsService = require('./board.service');
const tasksRouter = require('../tasks/task.router');

router.use('/:boardId/tasks', tasksRouter);

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).send(boards);
});

router.route('/:boardId').get(async (req, res) => {
  const board = await boardsService.getById(req.params.boardId);
  if (board) {
    res.status(200).send(board);
  } else {
    res.status(404).send(board);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.createBoard(req.body);
  res.status(200).send(board);
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardsService.updateBoard(req.params.boardId, req.body);
  res.status(200).send(board);
});

router.route('/:boardId').delete(async (req, res) => {
  const board = await boardsService.deleteBoard(req.params.boardId);
  res.status(200).send(board);
});

module.exports = router;
