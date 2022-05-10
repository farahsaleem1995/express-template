const morgan = require('morgan');

function logger({ appLogger }) {
	return morgan(
		':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
		{
			stream: {
				write: (message) => {
					appLogger.http(message.substring(0, message.lastIndexOf('\n')));
				},
			},
		}
	);
}

module.exports = logger;
