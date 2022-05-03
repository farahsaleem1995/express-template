const { error } = require('../utils/api-response');
const { createLogger } = require('../utils/logger');

const logger = createLogger({
	name: 'error',
	datePattern: 'YYYYMMDD',
	maxFiles: 5,
});

function useErrorHandler(err, req, res, next) {
	if (err) {
		const url = `${req.method}: ${req.url}`;
		logger.error({
			context: url,
			message: err.message,
			stack: err.stack,
		});

		if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
			return res.status(400).json(error(err.message));
		}

		res.status(500).json(error('Something went wrong, please try agin later.', 500));
	}

	next();
}

module.exports = useErrorHandler;
