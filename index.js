const Transport = require('winston-transport');
const logger = require('gelf-pro');

const levels = {
  emerg: 'emergency',
  alert: 'alert',
  crit: 'critical',
  error: 'error',
  warn: 'warn',
  notice: 'notice',
  info: 'info',
  debug: 'debug'
}

class GelfTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.logger = logger;
    this.logger.setConfig(opts.gelfPro);
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const {level, message} = info;

    const extra = {}
    Object.keys(info).forEach((key) => {
      if (key !== 'level' && key !== 'message' && key !== 'error'){
        extra[key] = info[key];
      }
    });

    const graylogLevel = levels[level] || levels.info;
    this.logger[graylogLevel](message, extra);

    callback();
  }
}

module.exports = exports = GelfTransport
