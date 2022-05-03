function success(data, statusCode, customProperties = null) {
	return {
		success: true,
		code: statusCode,
		data,
		...customProperties,
	};
}

function error(message, statusCode, customProperties = null) {
	return {
		success: false,
		code: statusCode,
		message,
		...customProperties,
	};
}

function validationError(errors, customProperties = null) {
	return {
		success: false,
		code: 400,
		message: 'Validation error.',
		errors,
		...customProperties,
	};
}

module.exports = {
	success,
	error,
	validationError,
};
