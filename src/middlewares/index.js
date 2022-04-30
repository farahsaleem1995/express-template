const { handler } = require('./error-handling.middleware');
const { logger } = require('./logging.middleware');
const { validator } = require('./validation.middleware');

module.exports = {
	handler,
	logger,
	validator,
};
