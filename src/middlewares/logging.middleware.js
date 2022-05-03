const morgan = require('morgan');

const { createLogger } = require('../utils/logger');

function useLogger() {
	const logger = createLogger({
		maxFiles: 5,
		name: 'app',
		datePattern: 'YYYYMMDDHH',
	});

	return morgan(
		':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
		{
			stream: {
				write: (message) => {
					logger.http(message.substring(0, message.lastIndexOf('\n')));
				},
			},
		}
	);
}

module.exports = useLogger;
