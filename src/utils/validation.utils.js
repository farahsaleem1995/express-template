/**
 *
 * @param {import("joi").ValidationError} err
 */
function createErrorsArray(err) {
	return err.details.length == 1
		? {
				message: err.details[0].message,
				path: err.details[0].path[0],
		  }
		: err.details.map((err) => ({
				message: err.message,
				path: err.path[0],
		  }));
}

module.exports = {
	createErrorsArray,
};
