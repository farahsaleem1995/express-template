const express = require('express');

const { createErrorResponse, createLogger } = require('../utils');

const errorLogger = createLogger({
	level: 'error',
	name: 'errors',
	datePattern: 'YYYYMMDD',
	maxFiles: 5,
});

/**
 * @param {Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function errorHandler(err, req, res, next) {
	if (err) {
		const url = `${req.method}: ${req.url}`;
		errorLogger.error({
			context: url,
			message: err.message,
			stack: err.stack,
		});

		if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
			return res.status(400).json(createErrorResponse(err.message));
		}

		res.status(500).json(createErrorResponse('Something went wrong, please try agin later.', 500));
	}

	next();
}

module.exports = { handler: errorHandler };
