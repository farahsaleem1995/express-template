const { connect, disconnect, connection } = require('mongoose');
const { createLogger } = require('../utils/logger');

function dbConnect(uri) {
	const logger = createLogger({
		name: 'database',
		maxFiles: 5,
	});

	connection.once('open', () => {
		logger.info(`connected to mongodb successfully: ${uri}.`);
	});

	connection.on('error', () => {
		logger.info(`failed to connect to mongodb: ${uri}.`);
	});

	return connect(uri);
}

function dbDisconnect() {
	const logger = createLogger({
		name: 'system',
		maxFiles: 5,
	});

	connection.once('close', () => {
		logger.info(`disconnected from mongodb successfully.`);
	});

	connection.on('error', () => {
		logger.info(`failed to disconnect from mongodb.`);
	});

	return disconnect();
}

module.exports = {
	dbConnect,
	dbDisconnect,
};
