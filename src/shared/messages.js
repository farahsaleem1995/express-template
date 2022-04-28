/**
 *
 * @param {String} field
 * @param {Number} min
 * @param {Number} max
 * @returns {String}
 */
function length(field, min, max) {
	return `Field "${field}" length must be between (${min}) and (${max}).`;
}

/**
 *
 * @param {String} field
 * @returns {String}
 */
function exists(field) {
	return `Field "${field}" is required.`;
}

/**
 *
 * @param {String} field
 * @returns {String}
 */
function string(field) {
	return `Field "${field}" must be a string.`;
}

/**
 *
 * @param {String} field
 * @returns {String}
 */
function number(field) {
	return `Field "${field}" must be a number.`;
}

/**
 *
 * @param {String} model
 * @param {String} key
 * @returns {String}
 */
function notFound(model, key = null) {
	return key ? `${model} with id "${key}" not found.` : `${model}  not found.`;
}

module.exports = {
	length,
	exists,
	string,
	number,
	notFound,
};
