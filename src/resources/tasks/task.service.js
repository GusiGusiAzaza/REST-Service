const tasksRepo = require('./task.db.repository');

const getByBoardId = boardId => tasksRepo.getByBoardId(boardId);

const getByBoardIdAndId = async (boardId, TaskId) =>
  await tasksRepo.getByBoardIdAndId(boardId, TaskId);

const create = async (task, boardId) => await tasksRepo.create(task, boardId);

const editById = async (boardId, taskId, data) =>
  await tasksRepo.editById(boardId, taskId, data);

const removeById = async (boardId, taskId) =>
  await tasksRepo.removeById(boardId, taskId);

const editByUserId = async userId => await tasksRepo.editByUserId(userId);

const removeByBoardId = async boardId =>
  await tasksRepo.removeByBoardId(boardId);

module.exports = {
  getByBoardId,
  getByBoardIdAndId,
  create,
  editById,
  removeById,
  editByUserId,
  removeByBoardId
};
