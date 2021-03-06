const status = require('http-status');
const User = require('./user.model');
const { ResponseError } = require('../../common/error-handler');

let users = [];

const getAll = async () => users;

const getById = async id => {
  const user = users.find(user => user.id === id);
  if (user) return user;

  throw new ResponseError(status.NOT_FOUND);
};

const create = async data => {
  const newUser = new User(data);
  users.push(newUser);

  return newUser;
};

const editById = async (id, data) => {
  const user = await getById(id);
  const newData = { user, ...data };
  users = users.map(user => (user.id === id ? newData : user));

  return newData;
};

const removeById = async id => {
  users = users.filter(user => user.id !== id);
};

module.exports = { getAll, getById, create, removeById, editById };
