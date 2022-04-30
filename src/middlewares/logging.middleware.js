const morgan = require('morgan');
const winston = require('winston');

const { createLogger } = require('../utils');

const logger = createLogger({
	level: 'http',
	maxFiles: 5,
	name: 'requests',
	datePattern: 'YYYYMMDDHH',
	format: winston.format.printf(({ message }) => message.substring(0, message.lastIndexOf('\n'))),
});

module.exports = {
	logger: morgan('combined', {
		stream: {
			write: (message) => logger.http(message),
		},
	}),
};
