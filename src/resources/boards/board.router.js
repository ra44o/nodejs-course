const router = require('express').Router();
const boardsService = require('./board.service');
const tasksRouter = require('../tasks/task.router');

router.use('/:boardId/tasks', tasksRouter);

const getAllBoards = async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();
    res.status(200).send(boards);
  } catch (error) {
    return next(error);
  }
};

const getBoardById = async (req, res, next) => {
  try {
    const board = await boardsService.getById(req.params.boardId);
    if (board) {
      res.status(200).send(board);
    } else {
      res.status(404).send(board);
    }
  } catch (error) {
    return next(error);
  }
};

const createBoard = async (req, res, next) => {
  try {
    const board = await boardsService.createBoard(req.body);
    res.status(200).send(board);
  } catch (error) {
    return next(error);
  }
};

const updateBoard = async (req, res, next) => {
  try {
    const board = await boardsService.updateBoard(req.params.boardId, req.body);
    res.status(200).send(board);
  } catch (error) {
    return next(error);
  }
};

const deleteBoard = async (req, res, next) => {
  try {
    const board = await boardsService.deleteBoard(req.params.boardId);
    res.status(200).send(board);
  } catch (error) {
    return next(error);
  }
};

router.route('/').get(getAllBoards);
router.route('/:boardId').get(getBoardById);
router.route('/').post(createBoard);
router.route('/:boardId').put(updateBoard);
router.route('/:boardId').delete(deleteBoard);

module.exports = router;
