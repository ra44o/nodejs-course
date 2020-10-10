const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).send(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
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

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.updateBoard(req.params.id, req.body);
  res.status(200).send(board);
});

router.route('/:id').delete(async (req, res) => {
  const board = await boardsService.deleteBoard(req.params.id);
  res.status(200).send(board);
});

module.exports = router;
