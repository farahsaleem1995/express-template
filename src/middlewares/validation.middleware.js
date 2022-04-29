const express = require('express');
const Joi = require('joi');

const { validationError } = require('../utils/api-response');

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
				const joiError = err;
				const errors =
					joiError.details.length == 1
						? {
								message: joiError.details[0].message,
								path: joiError.details[0].path[0],
						  }
						: joiError.details.map((err) => ({
								message: err.message,
								path: err.path[0],
						  }));

				return res.status(400).json(validationError(errors));
			}

			next(err);
		}
	};
}

module.exports = {
	validate,
};
