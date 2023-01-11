import {
    createLogger,
    format,
    transports
  } from 'winston';
  
  
// A logger file that prettifies the logs in console and it also writes to files (very helpful for debugging production issues!)
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'books-api' },
  transports: [
    new transports.File({ filename: './logs/error.log', level: 'error' })
    // new transports.File({ filename: './logs/combined.log' }) // Whatever is logged in the console will be written to this file. In this demonstration, it is unnecessary
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
      format.printf(({ timestamp, level, message, service }) => {
        return `[${timestamp}] [${service}] ${level}: ${message}`;
      })
    )
  }));
}

  export default logger;
  