const boardRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = async () => await boardRepo.getAll();

const getById = async id => await boardRepo.getById(id);

const create = async data => await boardRepo.create(data);

const editById = async (id, data) => await boardRepo.editById(id, data);

const removeById = async id => {
  await boardRepo.removeById(id);
  await taskService.removeByBoardId(id);
};

module.exports = { getAll, getById, create, editById, removeById };
