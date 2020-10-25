const { NOT_FOUND } = require('http-status');
const Task = require('./task.model');
const { ResponseError } = require('../../components/error-handler');

const getByBoardId = async boardId => await Task.find({ boardId });

const getByBoardIdAndId = async (boardId, id) => {
  const task = await Task.findOne({ _id: id, boardId });
  if (task) return task;

  throw new ResponseError(NOT_FOUND);
};

const create = async (data, boardId) => {
  return Task.create({ ...data, boardId });
};

const editById = async (boardId, taskId, data) => {
  return Task.updateOne({ _id: taskId, boardId }, data);
};

const removeById = async (boardId, id) => {
  await Task.deleteOne({ _id: id, boardId });
};

const editByUserId = async userId => {
  await Task.updateMany({ userId }, { userId: null });
};

const removeByBoardId = async boardId => {
  await Task.deleteMany({ boardId });
};

module.exports = {
  getByBoardId,
  getByBoardIdAndId,
  create,
  editById,
  removeById,
  editByUserId,
  removeByBoardId
};
