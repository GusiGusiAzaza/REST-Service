const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = async () => await usersRepo.getAll();

const getById = async id => await usersRepo.getById(id);

const create = async data => await usersRepo.create(data);

const editById = async (id, data) => await usersRepo.editById(id, data);

const deleteOne = async id => {
  await tasksService.editByUserId(id);
  await usersRepo.removeById(id);
};

module.exports = { getAll, getById, create, editById, deleteOne };
