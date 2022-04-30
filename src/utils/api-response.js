/**
 * @description Send success response.
 *
 * @param {Object|Array} data
 * @param {Number} statusCode
 * @param {Object} customProperties
 *
 * @returns {Object}
 */
function createSuccessResponse(data, statusCode, customProperties = null) {
	return {
		success: true,
		code: statusCode,
		data,
		...customProperties,
	};
}

/**
 * @description Send error response.
 *
 * @param {String} message
 * @param {Number} statusCode
 * @param {Object} customProperties
 *
 * @returns {Object}
 */
function createErrorResponse(message, statusCode, customProperties = null) {
	return {
		success: false,
		code: statusCode,
		message,
		...customProperties,
	};
}

/**
 * @description Send validation error response.
 *
 * @param {Object|Array} errors
 * @param {Number} statusCode
 * @param {Object} customProperties
 *
 * @returns {Object}
 */
function createValidationErrorResponse(errors, customProperties = null) {
	return {
		success: false,
		code: 400,
		message: 'Validation error.',
		errors,
		...customProperties,
	};
}

module.exports = {
	createSuccessResponse,
	createErrorResponse,
	createValidationErrorResponse,
};
