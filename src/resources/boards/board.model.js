const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      default: 'new-board'
    },
    columns: {
      type: Array,
      default: [],
      required: false
    }
  },
  {
    versionKey: false,
    collection: 'boards'
  }
);

const toResponse = board => {
  const { _id, title, columns } = board;
  return { id: _id, title, columns };
};

module.exports = {
  Board: mongoose.model('Board', boardSchema),
  toResponse
};
