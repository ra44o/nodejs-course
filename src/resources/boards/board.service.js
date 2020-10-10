const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const createBoard = board => boardsRepo.createBoard(new Board(board));

const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);

const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = {
  getAll,
  getById,
  createBoard,
  updateBoard,
  deleteBoard
};
