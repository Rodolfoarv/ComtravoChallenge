// Using winston for logging 

const winston = require('winston')

const logFormat = winston.format.printf(function (info) {
  return `${new Date().toISOString()}-${info.level}: ${info.message}`
})

// Define the transports that Winston is going to use

const consoleTransport = new winston.transports.Console({
  name: 'console.log',
  format: winston.format.combine(winston.format.colorize(), logFormat),
  handleExceptions: true,
  silent: process.env.SILENT_LOGS === 'true'
})
const myWinstonOptions = {
  transports: [consoleTransport],
  exitOnError: false
}
const logger = new winston.createLogger(myWinstonOptions)

const configureRequestLogger = function (app) {
  function logRequest (req, res, next) {
    if (!req.url.startsWith('/comtravoAPI/')) {
      logger.info(`${req.method}> ${req.url}`)
    }

    next()
  }
  app.use(logRequest)
}

const configureErrorLogger = function (app) {
  function logError (err, req, res, next) {
    logger.error(err.message)
    next(err)
  }
  app.use(logError)
}

module.exports = {
  logger,
  configureRequestLogger,
  configureErrorLogger
}
