const status = require('http-status');
const User = require('./user.model');
const { ResponseError } = require('../../components/error-handler');

let users = [];

const getAll = async () => users;

const getById = async id => {
  const user = users.find(u => u.id === id);
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
  users = users.map(u => (u.id === id ? newData : u));

  return newData;
};

const removeById = async id => {
  users = users.filter(u => u.id !== id);
};

module.exports = { getAll, getById, create, removeById, editById };
