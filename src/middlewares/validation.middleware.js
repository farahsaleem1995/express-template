const express = require('express');

const { validationError } = require('../utils/api-response');
const { createErrorsArray } = require('../utils/validation.utils');

function useValidator(location, validator) {
	return async (req, res, next) => {
		try {
			var validatedObj = await validator(req[location]);
			req[location] = validatedObj;

			next();
		} catch (err) {
			if (err.isJoi) {
				const errors = createErrorsArray(err);

				return res.status(400).json(validationError(errors));
			}

			next(err);
		}
	};
}

module.exports = useValidator;
