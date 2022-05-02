const { connect, disconnect, connection } = require('mongoose');
const { createLogger } = require('../utils/logger');

/**
 *
 * @param {String} uri Data base connection URL.
 */
function dbConnect(uri) {
	const logger = createLogger({
		name: 'system',
		maxFiles: 5,
	});

	connection.once('open', () => {
		logger.info(`Connected to mongodb successfully: ${uri}.`);
	});

	connection.on('error', () => {
		logger.info(`Failed to connect to mongodb: ${uri}.`);
	});

	return connect(uri);
}

function dbDisconnect() {
	const logger = createLogger({
		name: 'system',
		maxFiles: 5,
	});

	connection.once('close', () => {
		logger.info(`Disconnected from mongodb successfully.`);
	});

	connection.on('error', () => {
		logger.info(`Failed to disconnect from mongodb.`);
	});

	return disconnect();
}

module.exports = {
	dbConnect,
	dbDisconnect,
};
