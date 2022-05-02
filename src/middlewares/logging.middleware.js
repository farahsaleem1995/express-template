const morgan = require('morgan');
const winston = require('winston');

const { createLogger } = require('../utils/logger');

function useLogger() {
	const logger = createLogger({
		maxFiles: 5,
		name: 'requests',
		datePattern: 'YYYYMMDDHH',
		format: winston.format.combine(
			winston.format.colorize({ all: true }),
			winston.format.printf(({ message }) => message.substring(0, message.lastIndexOf('\n')))
		),
	});

	return morgan('combined', {
		stream: {
			write: (message) => {
				logger.http(message);
			},
		},
	});
}

module.exports = useLogger;
