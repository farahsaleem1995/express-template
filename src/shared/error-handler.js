const express = require('express');

const { createErrorResponse } = require('./api-response');
const { createLogger } = require('./logger');

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

		res.status(500).json(
			createErrorResponse({
				code: 500,
				error: {
					message: 'Something went wrong, please try again later',
				},
			})
		);
	}

	next();
}

module.exports = errorHandler;
