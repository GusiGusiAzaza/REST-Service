const status = require('http-status');
const User = require('./user.model');
const { ResponseError } = require('../../components/error-handler');

const getAll = async () => await User.find();

const getById = async id => {
  const user = User.findById(id);
  if (user) return user;

  throw new ResponseError(status.NOT_FOUND);
};

const create = async data => {
  return User.create(data);
};

const editById = async (id, data) => {
  return User.updateOne({ _id: id }, data);
};

const removeById = async id => {
  await User.deleteOne({ _id: id });
};

module.exports = { getAll, getById, create, removeById, editById };
