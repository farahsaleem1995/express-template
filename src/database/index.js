/**
 *
 * @param {{mongoose: import('mongoose')}} param0
 * @returns
 */
function db({ dbLogger, mongoose }) {
	const { connect, disconnect, connection } = mongoose;

	function dbConnect(uri) {
		connection.once('open', () => {
			dbLogger.info(`connected to mongodb successfully: ${uri}.`);
		});

		connection.on('error', () => {
			dbLogger.info(`failed to connect to mongodb: ${uri}.`);
		});

		return connect(uri);
	}

	function dbDisconnect() {
		connection.once('close', () => {
			dbLogger.info(`disconnected from mongodb successfully.`);
		});

		connection.on('error', () => {
			dbLogger.info(`failed to disconnect from mongodb.`);
		});

		return disconnect();
	}

	return {
		connect: dbConnect,
		disconnect: dbDisconnect,
	};
}

module.exports = db;
