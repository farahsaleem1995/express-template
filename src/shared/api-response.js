/**
 * Api error object.
 *
 * @typedef {Object} ApiError
 * @property {String} message
 */

/**
 * Api validation error object.
 *
 * @typedef {Object} ApiValidationError
 * @property {String} message
 * @property {String} path
 */

/**
 * Api response object.
 *
 * @typedef {Object} ApiResponse
 * @property {Boolean} succeed
 * @property {Number} code
 * @property {Object} data
 * @property {ApiError} error
 * @property {Array<ApiValidationError>} validationErrors
 */

/**
 *
 * @param {{data: Object, code: Number}}
 * @returns {ApiResponse}
 */
function createSuccessResponse({ data, code }) {
	return {
		succeed: true,
		code,
		data,
	};
}

/**
 *
 * @param {{error: ApiError, code: Number}} error
 * @returns {ApiResponse}
 */
function createErrorResponse({ error, code }) {
	return {
		succeed: false,
		code,
		error,
	};
}

/**
 *
 * @param {{validationErrors: Array<ApiValidationError>, code: Number}}
 * @returns {ApiResponse}
 */
function createValidationErrorResponse({ validationErrors, code }) {
	return {
		succeed: false,
		code,
		validationErrors,
	};
}

module.exports = {
	createSuccessResponse,
	createErrorResponse,
	createValidationErrorResponse,
};
