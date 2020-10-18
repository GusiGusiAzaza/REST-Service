const httpStatus = require('http-status');

class ResponseError extends Error {
  constructor(status, ...rest) {
    super(rest);
    this.status = status;
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof ResponseError) {
    res.status(err.status).send(httpStatus[err.status]);
  } else if (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send(httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
  }
  next();
};

module.exports = { ResponseError, errorHandler };
