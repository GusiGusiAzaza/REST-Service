const fs = require('fs');
const { createLogger, format, transports } = require('winston');

const myFormat = format.combine(format.timestamp({
  format: 'YYYY-MM-DD HH:mm:ss.SSS'
}), format.prettyPrint());

const errMessage = text => `
Error: ${text} 
Check log below or "logs/error.log" for more details
`;

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
  ],
  exitOnError: false
});


const logger = (req, res) => {
  const status = res.statusCode;
  const { query, body, url, method, stack } = req;
  const message = { query, body, url, method, status } ;

  if (status < 400) {
    myLogger.info(message);
  } else {
    stack && (message.stack = stack);
    myLogger.error(message);
  }
};

const logUncaughtException = (message, text) => {
  process.stderr.write(errMessage(text));
  myLogger.error(message);
  myLogger.on('finish', () => process.exit(1));
};

const logUnhandledRejection = (message, text) => {
  const msg = JSON.stringify(message, null, 4).replace(/\r?\\n/g, "\r\n");
  process.stderr.write(errMessage(text));
  process.stderr.write(msg);
  fs.writeFileSync(options.errorFile.filename, msg,{ flag: 'a' });
  process.exit(1);
};

module.exports = {
  logger,
  logUncaughtException,
  logUnhandledRejection
}
