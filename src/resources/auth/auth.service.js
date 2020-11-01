const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const userService = require('../users/user.service');
const { JWT_SECRET_KEY } = require('../../common/config');
const { compare } = require('../../components/crypt');
const { ResponseError } = require('../../components/error-handler');

const verify = (url, permittedPaths, auth) => {
  const isAccessiblePath = permittedPaths.some(path => path === url);

  if (!isAccessiblePath) {
    if (!auth) {
      throw new ResponseError(httpStatus.UNAUTHORIZED);
    }

    try {
      const token = auth.slice(7);
      jwt.verify(token, JWT_SECRET_KEY);
    } catch {
      throw new ResponseError(httpStatus.UNAUTHORIZED);
    }
  }
};

const getToken = async (login, password) => {
  const entity = await userService.getOne(login);
  const match = await compare(password, entity.password);

  if (match) {
    const token = jwt.sign(
      { name: entity._id, login: entity.login },
      JWT_SECRET_KEY,
      { expiresIn: '1m' }
    );
    return token;
  }

  throw new ResponseError(httpStatus.FORBIDDEN);
};

module.exports = { verify, getToken, compare };
