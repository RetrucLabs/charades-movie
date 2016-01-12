
var config  = require('../config/config');
var fs      = require('fs');
var winston = require('winston');

winston.emitErrs = true;

function createLogFileIfNotExists(){
  fs.access(config.logFilePath, fs.F_OK, (err) => {
    if(err){
      fs.writeFile(config.logFilePath, '', (err) => {
        if (err) console.log('WARNING: Could not create log file');
      });
    }
  });
}

createLogFileIfNotExists();

var logger;
if(process.env.NODE_ENV !== 'test') {
  logger = new winston.Logger({
    transports: [
      new winston.transports.File({
        level: 'info',
        filename: config.logFilePath,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
      }),
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
      })
    ],
    exitOnError: false
  });
}
else{
  logger = new winston.Logger({
    transports: [
      new winston.transports.File({
        level: 'info',
        filename: config.logFilePath,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: true
      })
    ],
    exitOnError: false
  });
}

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding){
    logger.info(message.slice(0, -1)); //Remove one line break from Morgan lib
  }
};
