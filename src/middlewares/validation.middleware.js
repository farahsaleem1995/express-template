const { validationError } = require('../utils/api-response');
const { createErrorsArray } = require('../utils/validation.utils');

function validator() {
	return function (location, schema) {
		return async (req, res, next) => {
			try {
				var validatedObj = await schema.validateAsync(req[location], {
					abortEarly: false,
					convert: true,
					stripUnknown: true,
				});
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
	};
}

module.exports = validator;
