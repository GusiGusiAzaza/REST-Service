const { createLogger, format, transports } = require('winston');

const myFormat = format.combine(format.timestamp({
  format: 'YYYY-MM-DD HH:mm:ss.SSS'
}), format.prettyPrint());

const options = {
  file: {
    level: 'info',
    format: myFormat,
    filename: `${__dirname}/../logs/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
  },
  errorFile: {
    level: 'error',
    format: myFormat,
    filename: `${__dirname}/../logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 2,
  },
  console: {
    level: 'info',
    format: myFormat,
    handleExceptions: true,
    json: false
  }
};

const myLogger = new createLogger({
  transports: [
    new transports.File(options.file),
    new transports.File(options.errorFile),
    new transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});


const logger = (req, res) => {
  const { statusCode: status } = res;
  const { query, body, originalUrl: url, method, stack } = req;
  const message = { query, body, url, method, status };

  if (status < 400) {
    myLogger.info(message);
  } else {
    stack && (message.stack = stack);
    myLogger.error(message);
  }
};

module.exports = {
  logger
}
