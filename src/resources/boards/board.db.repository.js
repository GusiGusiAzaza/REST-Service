const status = require('http-status');
const Board = require('./board.model');
const { ResponseError } = require('../../components/error-handler');

const getAll = async () => await Board.find({});

const getById = async id => {
  const board = await Board.findById(id);
  if (board) return board;

  throw new ResponseError(status.NOT_FOUND);
};

const create = async data => {
  return Board.create(data);
};

const editById = async (id, data) => {
  return Board.updateOne({ _id: id }, data);
};

const removeById = async id => {
  await Board.deleteOne({ _id: id });
};

module.exports = { getAll, getById, create, removeById, editById };
