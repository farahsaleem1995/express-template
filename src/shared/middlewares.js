const express = require('express');
const Joi = require('joi');

const { createValidationErrorResponse } = require('./api-response');

/**
 *
 * @param {Joi.ObjectSchema<any>} schema
 */
function validate(schema) {
	/**
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 */
	return async (req, res, next) => {
		try {
			await schema.validateAsync(req.body, {
				abortEarly: false,
			});

			next();
		} catch (err) {
			if (err.isJoi) {
				/**
				 * @type {Joi.ValidationError}
				 */
				const validationError = err;

				return res.status(400).json(
					createValidationErrorResponse({
						code: 400,
						validationErrors: validationError.details.map((err) => ({
							message: err.message,
							path: err.path.at(0),
						})),
					})
				);
			}

			next(err);
		}
	};
}

module.exports = {
	validate,
};
