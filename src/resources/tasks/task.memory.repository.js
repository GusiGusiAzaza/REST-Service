const { NOT_FOUND } = require('http-status');
const Task = require('./task.model');
const { ResponseError } = require('../../common/error-handler');

let tasks = [];

const getByBoardId = async boardId =>
  tasks.filter(task => task.boardId === boardId);

const getByBoardIdAndId = async (boardId, id) => {
  const task = tasks.find(task => task.id === id && task.boardId === boardId);
  if (task) return task;

  throw new ResponseError(NOT_FOUND);
};

const create = async (data, boardId) => {
  const newData = new Task({ ...data, boardId });
  tasks.push(newData);

  return newData;
};

const editById = async (boardId, taskId, data) => {
  const task = await getByBoardIdAndId(boardId, taskId);
  const newData = { task, ...data };
  tasks = tasks.map(task =>
    task.id === taskId && task.boardId === boardId ? newData : task
  );

  return newData;
};

const removeById = async (boardId, id) => {
  await getByBoardIdAndId(boardId, id, true);
  tasks = tasks.filter(task => task.id !== id);
};

const editByUserId = async userId => {
  tasks = tasks.map(task =>
    task.userId === userId ? { ...task, userId: null } : task
  );
};

const removeByBoardId = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
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
