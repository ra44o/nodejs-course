const router = require('express').Router();
const boardsService = require('./board.service');
const tasksRouter = require('../tasks/task.router');

const { logger } = require('../../common/logger/logger');

router.use('/:boardId/tasks', tasksRouter);

const getAllBoards = async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).send(boards);
};

const getBoardById = async (req, res) => {
  const board = await boardsService.getById(req.params.boardId);
  if (board) {
    res.status(200).send(board);
  } else {
    res.status(404).send(board);
  }
};

const createBoard = async (req, res) => {
  const board = await boardsService.createBoard(req.body);
  res.status(200).send(board);
};

const updateBoard = async (req, res) => {
  const board = await boardsService.updateBoard(req.params.boardId, req.body);
  res.status(200).send(board);
};

const deleteBoard = async (req, res) => {
  const board = await boardsService.deleteBoard(req.params.boardId);
  res.status(200).send(board);
};

router.route('/').get(logger, getAllBoards);
router.route('/:boardId').get(logger, getBoardById);
router.route('/').post(logger, createBoard);
router.route('/:boardId').put(logger, updateBoard);
router.route('/:boardId').delete(logger, deleteBoard);

module.exports = router;
