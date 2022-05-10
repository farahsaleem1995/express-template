const { error } = require('../utils/api-response');

function errorHandler({ errorLogger }) {
	return function (err, req, res, next) {
		if (err) {
			const url = `${req.method}: ${req.url}`;
			errorLogger.error({
				context: url,
				message: err.message,
				stack: err.stack,
			});

			if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
				return res.status(400).json(error(err.message));
			}

			return res.status(500).json(error('Something went wrong, please try agin later.', 500));
		}

		next();
	};
}

module.exports = errorHandler;
