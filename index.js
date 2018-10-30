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
    const graylogLevel = levels[level] || levels.info;
    this.logger[graylogLevel](message);

    callback();
  }
}

module.exports = exports = GelfTransport
