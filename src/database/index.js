const { connect, connection } = require('mongoose');
const { createLogger } = require('../utils/logger');

/**
 *
 * @param {String} uri Data base connection URL.
 */
function createConnection(uri) {
	const logger = createLogger({
		name: 'system',
		maxFiles: 5,
	});

	connection.once('open', () => {
		logger.info(`Connected to mongodb successfully: ${uri}`);
	});

	connection.on('error', () => {
		logger.info(`Failed to connect to mongodb: ${uri}`);
	});

	return connect(uri);
}

module.exports = createConnection;
