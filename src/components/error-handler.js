const httpStatus = require('http-status');
const { logUncaughtException, logUnhandledRejection } = require('./logger');


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

process.on('uncaughtException', error => {
  logUncaughtException(
    {
      type: 'uncaughtException',
      msg: error.message,
      stack: error
    },
    error.message
  );
});


process.on('unhandledRejection', error => {
  logUnhandledRejection(
    {
      message: {
        type: 'unhandledRejection',
        msg: error.message,
        stack: JSON.parse(JSON.stringify(error.stack, Object.getOwnPropertyNames(error.stack)))
      },
      level: 'error',
      timestamp: new Date().toISOString()
    },
    error.message
  );
});

module.exports = { ResponseError, errorHandler };
