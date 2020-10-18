const status = require('http-status');
const Board = require('./board.model');
const { ResponseError } = require('../../components/error-handler');

let boards = [];

const getAll = async () => boards;

const getById = async id => {
  const board = boards.find(board => board.id === id);
  if (board) return board;

  throw new ResponseError(status.NOT_FOUND);
};

const create = async data => {
  const newBoard = new Board(data);
  boards.push(newBoard);

  return newBoard;
};

const editById = async (id, data) => {
  const board = await getById(id);
  const newData = { board, ...data };
  boards = boards.map(board => (board.id === id ? newData : board));

  return newData;
};

const removeById = async id => {
  boards = boards.filter(board => board.id !== id);
};

module.exports = { getAll, getById, create, removeById, editById };
