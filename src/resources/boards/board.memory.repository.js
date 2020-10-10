const db = require('../../common/db');

const getAll = async () => {
  return db.boards;
};

const getById = async id => {
  return db.boards.filter(board => board.id === id)[0];
};

const createBoard = async board => {
  db.boards.push(board);
  return board;
};

const updateBoard = async (boardId, boardBody) => {
  db.boards = db.boards.map(b => {
    if (b.id === boardId) {
      const output = {};

      if (boardBody.title) {
        output.title = boardBody.title;
      }
      if (boardBody.columns && boardBody.columns.length) {
        output.columns = boardBody.columns;
      }

      return {
        ...b,
        ...output
      };
    }
    return b;
  });

  return db.boards.find(b => b.id === boardId);
};

const deleteBoard = async id => {
  db.boards = db.boards.filter(b => b.id !== id);

  return null;
};

module.exports = {
  getAll,
  getById,
  createBoard,
  updateBoard,
  deleteBoard
};
